const express = require("express");
const router = express.Router();
const {
 createTableBooking,getTableBooking,updateTableBooking
} = require("../controllers/tableBookingController");

router
  .post("/createbooking", createTableBooking)
  .get("/getbooking", getTableBooking)
  .put("/updatebooking/:id", updateTableBooking)
  

module.exports = router;
