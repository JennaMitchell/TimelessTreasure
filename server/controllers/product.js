const { validationResult } = require("express-validator");

const ProductSchema = require("../models/product-schema");
const UserSchema = require("../models/user-schema");
exports.createNewProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }
  const title = req.body.title;
  const price = req.body.price;
  const priceType = req.body.priceType;
  const temptags = req.body.tags;
  const jsonedTags = JSON.parse(temptags);
  const tags = Object.values(jsonedTags);
  const userId = req.body.userId;
  const productId = req.body.productId;
  const image = req.file;
  const imageUrl = image.path;
  const status = req.body.status;
  const quantity = req.body.quantity;

  if (!image) {
    return res.status(401).json({
      message: `No image Added!`,
      error: [{ error: "No image added" }],
    });
  }

  try {
    const newProduct = new ProductSchema({
      title: title,
      price: price,
      priceType: priceType,
      tags: tags,
      imageUrl: imageUrl,
      userId: userId,
      productId: productId,
      status: status,
      quantity: quantity,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product Added!",
      userId: userId,
      status: 201,
    });
  } catch (err) {
    return res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Error" }],
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }

  try {
    const productId = req.body.productId;
    const foundProduct = await ProductSchema.findOne({ productId: productId });
    const title = req.body.title;
    const price = req.body.price;
    const priceType = req.body.priceType;
    const image = req.file;
    const userId = req.body.userId;

    if (userId !== foundProduct.userId) {
      return res.status(401).json({
        message: `Not Authorized!`,
        error: [{ error: `Not Authorized!` }],
      });
    }

    if (image !== undefined) {
      foundProduct.imageUrl = image.path;
      await ProductSchema.updateOne(
        { productId: productId },
        {
          $set: {
            title: title,
            price: price,
            priceType: priceType,
            imageUrl: image.path,
          },
        }
      );
    } else {
      await ProductSchema.updateOne(
        { productId: productId },
        { $set: { title: title, price: price, priceType: priceType } }
      );
    }

    res.status(201).json({
      message: "Product Updated!",
      status: 201,
    });
  } catch (err) {
    return res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Error" }],
    });
  }
};

exports.deletePost = async (req, res, next) => {
  const sentProductId = req.body.productId;
  const sentUserId = req.body.userId;

  try {
    const foundProduct = await ProductSchema.findOne({
      productId: sentProductId,
    });
    if (!foundProduct) {
      res.status(401).json({
        message: `Product Not Found!`,
        error: [{ error: "Product Not Found!" }],
      });
      return;
    }

    if (foundProduct.userId !== sentUserId) {
      return res.status(401).json({
        message: `Not Authorized!`,
        error: [{ error: `Not Authorized!` }],
      });
    }

    const result = await ProductSchema.deleteOne({ productId: sentProductId });
    return res.status(201).json({
      message: "Product Deleted!",
      userId: result._id,
      status: 201,
    });
  } catch (err) {
    return res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Error" }],
    });
  }
};
