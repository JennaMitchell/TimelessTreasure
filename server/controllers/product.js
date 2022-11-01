const { validationResult } = require("express-validator");
const {
  productTypeSubSelectionCategories,
  acceptedFilterTypes,
  combinedTypeArraysSortedByType,
} = require("../utilities/product-types");
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
  const temptags = req.body.productTags;

  const jsonedTags = JSON.parse(temptags);

  const productTags = Object.values(jsonedTags);
  const userId = req.body.userId;
  const productId = req.body.productId;
  const image = req.file;
  const imageUrl = image.path;
  const status = req.body.status;
  const quantity = req.body.quantity;
  const productType = req.body.productType;
  const date = req.body.date;

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
      imageUrl: imageUrl,
      userId: userId,
      productId: productId,
      status: status,
      quantity: quantity,
      productType: productType,
      date: date,
      productTags: productTags,
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
    console.log(err);
    return res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Error" }],
    });
  }
};

exports.getFilteredData = async (req, res, next) => {
  const filterString = req.params.filter;
  console.log(filterString);
  try {
    if (!filterString) {
      res.status(401).json({
        message: `No filter String Sent!`,
        error: [{ error: "No filter String Sent!" }],
      });
      return;
    }

    const filterArray = filterString.split("-");

    // checking to see if entered filter array has valid types
    for (
      let filterTypeIndex = 0;
      filterTypeIndex < filterArray.length;
      filterTypeIndex++
    ) {
      if (!acceptedFilterTypes.includes(filterArray[filterTypeIndex])) {
        res.status(401).json({
          message: `Invalid Filter!`,
          error: [{ error: "Invalid Filter!" }],
        });
        return;
      }
    }
    // check to find the product type to search for
    let foundProductType = "";

    for (
      let foundProductIndex = 0;
      foundProductIndex < filterArray.length;
      foundProductIndex++
    ) {
      if (
        productTypeSubSelectionCategories.includes(
          filterArray[foundProductIndex]
        )
      ) {
        if (foundProductType.length === 0) {
          foundProductType = filterArray[foundProductIndex];
          console.log(filterArray[foundProductIndex]);
        } else {
          res.status(401).json({
            message: `Conflicting Product Types!`,
            error: [{ error: `Conflicting Product Types!` }],
          });
          return;
        }
      }
    }

    const arraysOfProductTypes = [];
    if (foundProductType.length === 0) {
      for (
        let indexOfFoundType = 0;
        indexOfFoundType < filterArray.length;
        indexOfFoundType++
      ) {
        const filterToCheck = filterArray[indexOfFoundType];
        for (
          let indexOfSubType = 0;
          indexOfSubType < combinedTypeArraysSortedByType;
          indexOfSubType++
        ) {
          if (
            combinedTypeArraysSortedByType[indexOfSubType].includes(
              filterToCheck
            )
          ) {
            arraysOfProductTypes.push(
              productTypeSubSelectionCategories[indexOfSubType]
            );
          }
        }
      }
    } else {
      const indexOfFoundType = filterArray.indexOf(foundProductType);
      filterArray.splice(indexOfFoundType, 1);

      for (
        let indexOfFoundType = 0;
        indexOfFoundType < filterArray.length;
        indexOfFoundType++
      ) {
        const filterToCheck = filterArray[indexOfFoundType];

        for (
          let indexOfSubType = 0;
          indexOfSubType < combinedTypeArraysSortedByType.length;
          indexOfSubType++
        ) {
          if (
            combinedTypeArraysSortedByType[indexOfSubType].includes(
              filterToCheck
            )
          ) {
            arraysOfProductTypes.push(
              productTypeSubSelectionCategories[indexOfSubType]
            );
          }
        }
      }
    }

    // productTypeSubSelection;
    // unique check
    let productTypeToRetrieve = "";

    for (
      let indexOfUniqueEntry = 0;
      indexOfUniqueEntry < arraysOfProductTypes.length;
      indexOfUniqueEntry++
    ) {
      if (productTypeToRetrieve.length === 0) {
        productTypeToRetrieve = arraysOfProductTypes[indexOfUniqueEntry];
      } else {
        return res.status(401).json({
          message: `Conflicting Active Tags!`,
          error: [{ error: `Conflicting Active Tags!` }],
        });
      }
    }

    // getting the data

    const foundProducts = await ProductSchema.find({
      productType: productTypeToRetrieve,
    });

    // filtering the data
    const filteredData = [];
    for (let b = 0; b < filterArray.length + 1; b++) {
      filteredData.push([]);
    }

    filteredData[0] = foundProducts.slice();
    for (let filterIndex = 0; filterIndex < filterArray.length; filterIndex++) {
      const dataToBeFiltered = filteredData[filterIndex];
      for (
        let foundProductsIndex = 0;
        foundProductsIndex < dataToBeFiltered.length;
        foundProductsIndex++
      ) {
        const entry = dataToBeFiltered[foundProductsIndex];
        const entryTags = entry.productTags;
        if (entryTags.includes(filterArray[filterIndex])) {
          dataToBeFiltered[filterIndex + 1].push(entry);
        }
      }
    }

    return res.status(201).json({
      message: "Data Retrieved!",
      foundProducts: filteredData[filterArray.length],
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
