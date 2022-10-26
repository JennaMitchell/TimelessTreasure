const { validationResult } = require("express-validator");

const ProductSchema = require("../models/product-schema");

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
    const foundProduct = ProductSchema.findOne({ productId: productId });
    const title = req.body.title;
    const price = req.body.price;
    const priceType = req.body.priceType;
    const tags = req.body.tags;
    const image = req.image;
    const userId = req.body.userId;

    if (image) {
      foundProduct.imageUrl = image.path;
    }
    foundProduct.title = title;
    foundProduct.price = price;
    foundProduct.priceType = priceType;
    foundProduct.tags = tags;

    const result = await foundProduct.save();
    res.status(201).json({
      message: "Product Updated!",
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
