const express = require("express");
const router = express.Router();
const {
  createTableBooking,
  getTableBooking,
  updateTableBooking,
  bookMyTable,
  getAllBookedTables
} = require("../controllers/tableBookingController");
const { webTokenMiddleware } = require("../middleWare/webMiddleware");

router
  .post("/createbooking", createTableBooking)
  .get("/getbooking", getTableBooking)
  .put("/updatebooking/:id", updateTableBooking);

// web
router.post("/book_my_table", webTokenMiddleware, bookMyTable);
router.get("/get_all_booked_tables", webTokenMiddleware, getAllBookedTables);

module.exports = router;
