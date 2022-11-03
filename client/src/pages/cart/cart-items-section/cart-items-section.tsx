import classes from "./cart-items-section.module.scss";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CartDataInterface, cartStoreActions } from "../../../store/cart";
import React from "react";

const CartItemSection = () => {
  const cartData = useAppSelector((state) => state.cartStore.cartData);
  const dispatch = useAppDispatch();
  const renderReadyCartData = cartData.map(
    (cartDataObject: CartDataInterface, cartIndex: number) => {
      const renderReadyQuantityDropDown = [];

      for (
        let quantityAvail = 1;
        quantityAvail < cartDataObject.quantityAvailable;
        quantityAvail++
      ) {
        renderReadyQuantityDropDown.push(quantityAvail);
      }

      const renderReadyQuantitySelections = renderReadyQuantityDropDown.map(
        (quantity: number) => {
          return (
            <option
              className={classes.numberOfItemsNumber}
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
