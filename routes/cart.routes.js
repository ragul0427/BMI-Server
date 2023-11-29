const router = require("express").Router();
const {
  addtocart,
  getCurrentUserCarts,
  getCurrentUserCartProducts,
  removeFromCart,
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
router.delete("/remove_from_cart/:id", webTokenMiddleware, removeFromCart);

module.exports = router;
