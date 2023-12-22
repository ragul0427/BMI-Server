const { get } = require("lodash");
const category = require("../modals/categoryModal");
const subCategory = require("../modals/subCategoryModal");
const fs = require("fs");
const Product = require("../modals/productModal");
const {
    uploadToCloud,
    deleteFileInCloud,
    deleteFileInLocal,
} = require("../helper/uploadToS3");
const s3 = require("../helper/s3config");

const createCategory = async (req, res) => {
    try {
        let maximumCategory = 10;
        const { name } = req.body;
        const categoryCount = await category.countDocuments({});
        const existingCategory = await category.aggregate([
            {
                $match: {
                    name: { $eq: name },
                },
            },
        ]);

        if (existingCategory.length > 0) {
            return res
                .status(400)
                .send(`Cuisine with the name '${name}' already exists .`);
        }

        if (categoryCount >= maximumCategory) {
            return res
                .status(400)
                .send(
                    `Your Cuisines limit reached. Cannot create more banners.`
                );
        }

        const result = uploadToCloud(req);
        s3.upload(result, async (err, data) => {
            const file = req.file;
            if (err) {
                return res.status(500).send(err);
            }
            deleteFileInLocal(file);
            await category.create({
                name: req.body.name,
                status: req.body.status,
                image: data.Location,
                category_image_key: data.key,
            });
            return res.status(200).send({ url: data.Location });
        });
    } catch (err) {
        return res
            .status(500)
            .send("Something went wrong while creating category");
    }
};

const getCategory = async (req, res) => {
    try {
        const result = await category.find({});
        return res.status(200).send({ data: result });
    } catch (e) {
        return res
            .status(500)
            .send("Something went wrong while fetching category");
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
        if (get(req, "file", false)) {
            console.log("true", id, req.body);
            const result = uploadToCloud(req);
            s3.upload(result, async (err, data) => {
                const file = req.file;
                if (err) {
                    return res.status(500).send(err);
                }
                deleteFileInLocal(file);
                console.log(data.Location);
                await category.findByIdAndUpdate(id, {
                    name: get(req.body, "name", ""),
                    status: get(req.body, "status", ""),
                    image: data.Location,
                    category_image_key: data.key,
                });
                deleteFileInCloud(get(req.body, "image_key"));
                return res
                    .status(200)
                    .send({ Message: "data updated successfully" });
            });
        } else {
            console.log("false");
            await category.findByIdAndUpdate(id, {
                name: get(req, "body.name", ""),
                status: get(req, "body.status", ""),
                image: get(req, "body.image", ""),
                category_image_key: get(req, "body.image_key"),
            });
            return res.status(200).send({ Message: "created successfully" });
        }
    } catch (e) {
        return res
            .status(500)
            .send("Something went wrong while updating category");
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(get(req.body, "image"), "image");
        await category.findByIdAndDelete(id);
        deleteFileInCloud(get(req.body, "image"));
        return res.status(200).send("Category deleted");
    } catch (e) {
        return res
            .status(500)
            .send("Something went wrong while deleting category");
    }
};

// web
const getAllCusines = async (req, res) => {
    try {
        let { search } = JSON.parse(req.params.id);
        let where = { status: true };

        if (search) {
            where.name = { $regex: search, $options: "i" };
        }
        console.log(JSON.parse(req.params.id), where);
        const result = await category.find(where);
        return res.status(200).send({ data: result });
    } catch (e) {
        return res
            .status(500)
            .send("Something went wrong while deleting category");
    }
};

const getAllCusinessFilter = async (req, res) => {
    try {
        const result = await category.find({ status: true });
        let target_id;
        if (req.params.id === "empty") {
            target_id = get(result, "[0]._id", "");
        } else {
            target_id = req.params.id;
        }
        const subcategory = await subCategory.find({
            categoryId: target_id,
            status: true,
        });
        let resultData = { categoryData: result, subCategoryData: subcategory };
        return res.status(200).send({ data: resultData });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .send("Something went wrong while deleting category");
    }
};

const getFilteredProducts = async (req, res) => {
    try {
        let { cat, subCat } = JSON.parse(req.params.id);
        let where = {};

        if (cat !== "" && subCat !== "") {
            where.categoryId = cat;
            where.subCategoryId = subCat;
            where.status = true;
        } else if (cat !== "") {
            where.categoryId = cat;
            where.status = true;
        }
        console.log(where);
        const productData = await Product.find(where);
        return res.status(200).send({ data: productData });
    } catch (e) {
        return res
            .status(500)
            .send("Something went wrong while deleting category");
    }
};

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getAllCusines,
    getAllCusinessFilter,
    getFilteredProducts,
};
