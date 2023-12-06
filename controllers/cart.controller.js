const _ = require("lodash");
const Cart = require("../modals/cart.models.js");
const Product = require("../modals/productModal.js");

const addtocart = async (req, res) => {
  try {
    let formData = {
      userRef: _.get(req, "body.userDetails._id", ""),
      productRef: _.get(req, "body.productRef", ""),
      orderRef: _.get(req, "body.orderRef", ""),
      bookingRef: _.get(req, "body.bookingRef", ""),
    };

    await Cart.create(formData);
    return res
      .status(200)
      .send({ message: " Food successfully added to the cart" });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const getCurrentUserCarts = async (req, res) => {
  try {
    let where = {
      userRef: _.get(req, "body.userDetails._id", ""),
      orderRef: _.get(req, "params.id", ""),
    };

    const result = await Cart.find(where, { userRef: 0, orderRef: 0 });
    return res.status(200).send({ data: result });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const getCurrentUserCartProducts = async (req, res) => {
  try {
    const { order_ref, bookingref } = JSON.parse(req.params.id);

    let where = {
      userRef: _.get(req, "body.userDetails._id", ""),
      orderRef: order_ref,
    };

    if (bookingref) {
      where.bookingRef = bookingref;
    }

    const collect_current_user_carts = await Cart.find(where, {
      userRef: 0,
      orderRef: 0,
    });

    if (_.isEmpty(collect_current_user_carts)) {
      return res.status(200).send({ data: [] });
    } else {
      let prodct_ids = collect_current_user_carts.map((res) => {
        return res.productRef;
      });
      const getSelectiveProducts = await Product.find({
        _id: {
          $in: prodct_ids,
        },
      });

      return res.status(200).send({ data: getSelectiveProducts });
    }
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { orderRef, ptoductRef, bookingRef } = JSON.parse(req.params.id);
    let where = {
      userRef: _.get(req, "body.userDetails._id", ""),
      productRef: ptoductRef,
      orderRef: orderRef,
    };

    if (bookingRef) {
      where.bookingRef = bookingRef;
    }

    await Cart.deleteOne(where);
    return res.status(200).send({ message: "Success" });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports = {
  addtocart,
  getCurrentUserCarts,
  getCurrentUserCartProducts,
  removeFromCart,
};
