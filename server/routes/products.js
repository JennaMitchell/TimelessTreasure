const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const ProductSchema = require("../models/product-schema");
const isAuth = require("../middlewear/is-auth");
const productController = require("../controllers/product");
const sellerController = require("../controllers/seller");
// const loggedInAuth = require("../middlewear/loggedin-auth");

router.get(
  "/seller-items-for-sale/:sellerId",
  isAuth,
  sellerController.getAllSellerData
);

router.delete("/delete", isAuth, productController.deletePost);
router.patch(
  "/update",
  isAuth,
  [
    body("title").trim().not().isEmpty(),
    body("price").trim().not().isEmpty(),
    body("productId")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return ProductSchema.findOne({ productId: value }).then(
          (foundProduct) => {
            if (!foundProduct) {
              return Promise.reject("Id no longer in use!");
            }
          }
        );
      }),
    body("quantity").trim().not().isEmpty(),
  ],
  productController.updateProduct
);
router.post(
  "/new",
  isAuth,
  [
    body("title").trim().not().isEmpty(),
    body("price").trim().not().isEmpty(),
    body("priceType").trim().not().isEmpty(),
    body("userId").trim().not().isEmpty(),
    body("quantity").trim().not().isEmpty(),
    body("productId")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return ProductSchema.findOne({ productId: value }).then(
          (foundProduct) => {
            if (foundProduct) {
              return Promise.reject("Id in use please send again!");
            }
          }
        );
      }),
    body("productType")
      .trim()
      .not()
      .isEmpty()
      .custom((value) => {
        const acceptedProductTypes = [
          "Ceramics",
          "Clocks",
          "Tablewear",
          "Paintings",
          "Electronics",
        ];
        if (!acceptedProductTypes.includes(value)) {
          return Promise.reject("Invalid product type!");
        }
        return true;
      }),
    body("tags").custom((value, { req }) => {
      const productType = req.body.productType;
      const productTypeSubSelection = {
        Ceramics: {
          Types: [
            "Earthware",
            "Stoneware",
            "Porcelian",
            "Bone China",
            "Fire Bricks",
          ],
        },
        Clocks: {
          Type: ["Wall", "Pendulum", "Mantel", "Alarm", "Cuckoo"],
          Size: ["Small", "Medium", "Large", "Oversized"],
          Style: ["Digital", "Analog"],
        },
        Tablewear: {
          Type: ["Serveware", "Dinnerware", "Silverware", "Drinkware"],
          Sets: ["4 Sets", "6 Sets", "8 Sets"],
          Material: [
            "Bone China",
            "Silver",
            "Earthenware",
            "Porcelain",
            "Melamine",
            "Stoneware",
          ],
        },
        Paintings: {
          Type: [
            "Realism",
            "Photorealism",
            "Abstract",
            "Surrealism",
            "Pop Art",
            "Oil",
          ],
        },
        Electronics: {
          Type: ["Cameras", "Games", "Media Players", "DvDs", "CDs"],
        },
      };
      const acceptedProductObject = productTypeSubSelection[productType];
      const acceptedProductTypesArray = Object.values(acceptedProductObject);
      const acceptedProductTypes = [];

      for (
        let typeArrayIndex = 0;
        typeArrayIndex < acceptedProductTypesArray.length;
        typeArrayIndex++
      ) {
        for (
          let entry = 0;
          entry < acceptedProductTypesArray[typeArrayIndex].length;
          entry++
        ) {
          acceptedProductTypes.push(
            acceptedProductTypesArray[typeArrayIndex][entry]
          );
        }
      }

      const selectedTypes = Object.values(JSON.parse(value));

      for (
        let indexOfReqTags = 0;
        indexOfReqTags < selectedTypes.length;
        indexOfReqTags++
      ) {
        if (!acceptedProductTypes.includes(selectedTypes[indexOfReqTags])) {
          return Promise.reject("Invalid product type!");
        }
      }
      return true;
    }),
  ],
  productController.createNewProduct
);
module.exports = router;
