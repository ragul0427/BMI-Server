const express = require("express");
const router = express.Router();
const { getUser, getAllUsers } = require("../controllers/userController");
const authenticateUserToken = require("../middleWare/clientUserAuthenticate");

router
  .get("/getalluser", getAllUsers)
  .post("/createuser", getUser)
  .get("/validateUserToken", authenticateUserToken, (req, res) => {
    res.status(200).send(req.user);
  });

module.exports = router;
