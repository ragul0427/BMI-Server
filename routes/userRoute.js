const express = require("express");
const router = express.Router();
const { getUser, getAllUsers, careteSignUp, getOneUserdata, makeUserToken,checkTokenStatus,makeLogoutUser,updateMyPic,updateProfile } = require("../controllers/userController");
const authenticateUserToken = require("../middleWare/clientUserAuthenticate");
const { webTokenMiddleware } = require("../middleWare/webMiddleware");

router
  .get("/getalluser", getAllUsers)
  .post("/createuser", getUser)
  .get("/validateUserToken", authenticateUserToken, (req, res) => {
    res.status(200).send(req.user);
});

  // web routes
router.post("/signup",careteSignUp);
router.get("/get_one_user/:number",getOneUserdata);
router.post("/make_user_auth",makeUserToken);
router.get("/check_header_status",webTokenMiddleware,checkTokenStatus);
router.post("/make_logout_user",webTokenMiddleware,makeLogoutUser);
router.put("/update_my_pic",webTokenMiddleware,updateMyPic);
router.put("/update_my_profile",webTokenMiddleware,updateProfile);

module.exports = router;
