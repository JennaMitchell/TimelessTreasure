const express = require("express");
const { body } = require("express-validator");

const orderController = require("../controllers/orders");
const sellerController = require("../controllers/seller");
const router = express.Router();
const isAuth = require("../middlewear/is-auth");

router.put("/new-order-seller-data", orderController.addOrderDataToSeller);
router.get(
  "/seller-pending-orders/:sellerId",
  isAuth,
  sellerController.getAllPendingOrderSellerData
);
router.patch("/ship-product", isAuth, sellerController.shipItem);
module.exports = router;
