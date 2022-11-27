import classes from "./cart-items-section.module.scss";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CartDataInterface, cartStoreActions } from "../../../store/cart";
import React from "react";
import openSocket from "socket.io-client";
import { useEffect, useState } from "react";
import { mainStoreSliceActions } from "../../../store/store";
import { databaseURL } from "../../../utilities/constants/constants";

const CartItemSection = () => {
  const cartData = useAppSelector((state) => state.cartStore.cartData);
  const dispatch = useAppDispatch();
  const [initialRender, setIntialRender] = useState(false);

  useEffect(() => {
    if (!initialRender) {
      const socket = openSocket(`${databaseURL}`);
      const copyOfCartData = JSON.parse(JSON.stringify(cartData));

      socket.on("update-cart", (data) => {
        if (data.action === "update-cart") {
          const boughtProducts = data.orderedData;
          // quantity

          let itemRemoved = false;
          let arrayOfIndexsToDelete = [];

          if (cartData.length !== 0) {
            for (
              let indexOfCopiedRetrievedData = 0;
              indexOfCopiedRetrievedData < cartData.length;
              indexOfCopiedRetrievedData++
            ) {
              for (
                let indexOfBoughtProduct = 0;
                indexOfBoughtProduct < boughtProducts.length;
                indexOfBoughtProduct++
              ) {
                if (
                  cartData[indexOfCopiedRetrievedData].productId ===
                  boughtProducts[indexOfBoughtProduct].productId
                ) {
                  // if there is a match need to check quantity and see if we need to delete or update the quantity to match what's available
                  const userSelectedQuantity =
                    +cartData[indexOfCopiedRetrievedData].quantity;
                  const purchasedQuantity =
                    +boughtProducts[indexOfBoughtProduct].quantity;
                  const quantityAvailable =
                    cartData[indexOfCopiedRetrievedData].quantityAvailable;
                  const remainingQuantity =
                    quantityAvailable - purchasedQuantity;

                  if (remainingQuantity <= 0) {
                    // delete product from cart
                    // then dispatch message to user telling them a product from cart was sold
                    arrayOfIndexsToDelete.push(indexOfCopiedRetrievedData);
                    itemRemoved = true;
                  } else if (
                    remainingQuantity > 0 &&
                    userSelectedQuantity >= remainingQuantity
                  ) {
                    copyOfCartData[
                      indexOfCopiedRetrievedData
                    ].quantity = `${remainingQuantity}`;
                    copyOfCartData[
                      indexOfCopiedRetrievedData
                    ].quantityAvailable = `${remainingQuantity}`;
                  } else {
                    copyOfCartData[
                      indexOfCopiedRetrievedData
                    ].quantityAvailable = remainingQuantity;
                  }
                }
              }
            }

            dispatch(cartStoreActions.setCartData(copyOfCartData));
            if (itemRemoved) {
              for (
                let indexOfDeletionArray = 0;
                indexOfDeletionArray < arrayOfIndexsToDelete.length;
                indexOfDeletionArray++
              ) {
                copyOfCartData.splice(
                  1,
                  arrayOfIndexsToDelete[indexOfDeletionArray] -
                    indexOfDeletionArray
                );
              }
              dispatch(
                mainStoreSliceActions.setAPICallMessage(
                  "Product in your cart was sold, please check your cart!"
                )
              );
              dispatch(mainStoreSliceActions.setAPICallMessageType("Error"));
            }
            // dispatch(marketplaceStoreActions.setRetrievedData(copyOfRetrievedData));
          }
        }
      });
      setIntialRender(true);
    }
  }, [dispatch, cartData, initialRender]);

  const renderReadyCartData = cartData.map(
    (cartDataObject: CartDataInterface, cartIndex: number) => {
      const renderReadyQuantityDropDown = [];

      for (
        let quantityAvail = 0;
        quantityAvail < cartDataObject.quantityAvailable;
        quantityAvail++
      ) {
        renderReadyQuantityDropDown.push(quantityAvail + 1);
      }

      const renderReadyQuantitySelections = renderReadyQuantityDropDown.map(
        (quantity: number) => {
          return (
            <option
              className={classes.numberOfItemsOption}
              key={`${quantity}-${cartDataObject.title}`}
            >
              {quantity}
            </option>
          );
        }
      );

      const removeDataHandler = () => {
        const copyOfCartData = JSON.parse(JSON.stringify(cartData));

        copyOfCartData.splice(cartIndex, 1);

        dispatch(cartStoreActions.setCartData(copyOfCartData));
      };

      const changeQuantityHandler = (e: React.ChangeEvent) => {
        const targetElement = e.target as HTMLSelectElement;
        const dropDownValue = targetElement.value;
        const copyOfCartData = JSON.parse(JSON.stringify(cartData));
        copyOfCartData[cartIndex].quantity = dropDownValue;
        dispatch(cartStoreActions.setCartData(copyOfCartData));
      };

      return (
        <div
          className={classes.productContainer}
          key={`${cartDataObject.title}-cart-item`}
        >
          <div className={classes.productDescriptionContainer}>
            <img
              className={classes.productImage}
              src={cartDataObject.imageUrl}
              alt="antique vase"
            />
            <h6 className={classes.productTitle}>{cartDataObject.title}</h6>
            <p className={classes.productPrice}>{cartDataObject.price}</p>
          </div>

          <div className={classes.productMangementContainer}>
            <select
              className={classes.numberOfItemsDropDown}
              defaultValue={cartDataObject.quantity}
              onChange={changeQuantityHandler}
            >
              {renderReadyQuantitySelections}
            </select>
            <TrashIcon
              className={classes.trashIcon}
              onClick={removeDataHandler}
            />
          </div>
        </div>
      );
    }
  );

  return <div className={classes.itemsTopContainer}>{renderReadyCartData}</div>;
};
export default CartItemSection;
