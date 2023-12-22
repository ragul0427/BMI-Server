const video = require("../modals/videoModal");
const { uploadToCloud,deleteFileInCloud,deleteFileInLocal } = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");
const fs = require("fs");
const {get}=require("lodash")
const helpers = require("../utils/helpers");
const { v4: uuidv4 } = require("uuid");

const createVideo = async (req, res) => {
  try {
    const {name}=req.body
    const videoCount = await video.countDocuments({ name }); 
    let maxVideoLimit =name.toLowerCase().includes("bromag") ? 2 : 3;
  
    if (videoCount >= maxVideoLimit) {
      return res.status(400).send(`Your ${name} video limit reached. Cannot create more videos.`);
    }
   
    const videoFile = req.file;
    console.log(videoFile,"file")
    // if (videoFile) {
    //   const path = `Videos/${uuidv4()}/${videoFile.filename}`;
    //   await helpers.uploadFile(videoFile, path);
    //   if (path) {
    //     await helpers.deleteS3File(path);
    //   }
    //   const vdo=helpers.getS3FileUrl(path)
    //   helpers.deleteFile(videoFile);
    //   await video.create({
    //     name: req.body.name,
    //     video: vdo,
    //   });
    //   return res.status(200).send({message:"Video created successfully"});
     
    // }
   
  } catch (err) {
    console.log(err)
    return res.status(500).send("Something went wrong while creating video");
  }
};
const getVideo = async (req, res) => {
  try {
    const result = await video.find({});
    return res.status(200).send({ data: result });
  } catch (e) {
    return res.status(500).send("Something went wrong while fetching video");
  }
};
const updateVideo = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(req.file)
    if (get(req, "file", false)) {
      console.log("true", id, req.body);
      const result = uploadToCloud(req,"videos");
      s3.upload(result, async (err, data) => {
        const file = req.file;
        if (err) {
          return res.status(500).send(err);
        }
        deleteFileInLocal(file);
        console.log(data.Location);
        await video.findByIdAndUpdate(id, {
          name: req.body.name,
          video: data.Location,
          video_key: data.key,
        });
        deleteFileInCloud(get(req.body, "video_key"));
        return res.status(200).send({ Message: "data updated successfully" });
      });
    } else {
      console.log("false");
      await video.findByIdAndUpdate(id, {
        name: req.body.name,
        video: req.body.video_key,
      });
      return res.status(200).send({ Message: "created successfully" });
    }
  } catch (e) {
    return res.status(500).send("Something went wrong while updating video");
  }
};
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    await video.findByIdAndDelete(id);
    deleteFileInCloud(get(req, "body.video"));
    return res.status(200).send("Category deleted");
  } catch (e) {
    return res.status(500).send("Something went wrong while deleting video");
  }
};

module.exports = { createVideo, deleteVideo, getVideo, updateVideo };
