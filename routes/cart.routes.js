const router = require("express").Router();
const {
  addtocart,
  getCurrentUserCarts,
  getCurrentUserCartProducts,
} = require("../controllers/cart.controller.js");
const { webTokenMiddleware } = require("../middleWare/webMiddleware.js");

// web
router.post("/add_to_cart", webTokenMiddleware, addtocart);
router.get(
  "/get_current_user_carts/:id",
  webTokenMiddleware,
  getCurrentUserCarts
);
router.get(
  "/get_current_user_cart_products/:id",
  webTokenMiddleware,
  getCurrentUserCartProducts
);

module.exports = router;
