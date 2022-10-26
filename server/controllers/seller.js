// const { validationResult } = require("express-validator");

const ProductSchema = require("../models/product-schema");

exports.getAllSellerData = async (req, res, next) => {
  const sellerId = req.params.sellerId;
  try {
    const foundProducts = await ProductSchema.find({ userId: sellerId });
    console.log(foundProducts);
    return res.status(201).json({
      message: "Product Found!",
      foundProducts: foundProducts,
      userId: sellerId,
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Error" }],
    });
  }
};
