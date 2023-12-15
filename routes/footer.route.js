const express = require("express");
const router = express.Router();
const { createFooter, getFooter } = require("../controllers/footer.controller");


router
  .post("/create_footer", createFooter).get("/get_footer",getFooter)


module.exports = router;