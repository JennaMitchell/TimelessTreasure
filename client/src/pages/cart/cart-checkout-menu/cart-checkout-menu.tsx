import classes from "./cart-checkout-menu.module.scss";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { priceStringCreator } from "../../../utilities/generic-hooks/generic-hooks";
import { useNavigate } from "react-router-dom";

import keyIdGenerator from "../../../utilities/key-id-generator/key-id-generator";
import { updateSellersWithOrder } from "../../../utilities/order-api-hooks/order-api-hooks";
import { mainStoreSliceActions } from "../../../store/store";
import { useId } from "react";
import { cartStoreActions } from "../../../store/cart";
const CartCheckoutMenu = () => {
  const cartData = useAppSelector((state) => state.cartStore.cartData);
  let calculatedSubTotal = 0;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orderQuantityArray: number[] = [];
  let userId = useAppSelector((state) => state.userStore.userId);

  for (
    let indexOfCartData = 0;
    indexOfCartData < cartData.length;
    indexOfCartData++
  ) {
    let priceType = "USD";
    orderQuantityArray.push(cartData[indexOfCartData].quantity);

    let cartDataPrice: string | string[] = cartData[indexOfCartData].price;

    cartDataPrice = cartDataPrice.split("");
    if (cartDataPrice.includes("$")) {
      const indexOfPriceType = cartDataPrice.indexOf("$");
      cartDataPrice.splice(indexOfPriceType, 1);
    }
    if (cartDataPrice.includes("€")) {
      const indexOfPriceType = cartDataPrice.indexOf("€");
      cartDataPrice.splice(indexOfPriceType, 1);
      priceType = "EUR";
    }
    cartDataPrice = cartDataPrice.join("");
    console.log(cartData[indexOfCartData]);
    const totalOfItem = +cartDataPrice * cartData[indexOfCartData].quantity;
    calculatedSubTotal = calculatedSubTotal + totalOfItem;
  }
  const finalCalculatedSubTotal = calculatedSubTotal.toFixed(2);

  const finalTotal = +finalCalculatedSubTotal + 8.95 + 8.95;
  const stringFinalTotal = finalTotal.toFixed(2);

  const checkoutButtonHandler = () => {
    if (cartData.length !== 0) {
      // Check to see if quantity they are buying is the same as available
      const productStatusArray: string[] = [];

      // creating array of item Id to look up to link to the coorsponding seller
      const arrayOfProductIds = [];
      for (
        let indexOfCartData = 0;
        indexOfCartData < cartData.length;
        indexOfCartData++
      ) {
        if (
          cartData[indexOfCartData].quantity ===
          cartData[indexOfCartData].quantityAvailable
        ) {
          productStatusArray.push("Delete Post");
        } else {
          productStatusArray.push("Update Post");
        }
        arrayOfProductIds.push(cartData[indexOfCartData].productId);
      }
      const orderId = keyIdGenerator();

      // Making request to the sellers coorsponding with the product Ids

      if (userId.length === 0) {
        userId = keyIdGenerator();
      }

      const orderData = {
        status: "Ship",
        orderId: orderId,
        itemIdsPlaced: arrayOfProductIds,
        orderQuantityArray: orderQuantityArray,
        userId: userId,
      };

      updateSellersWithOrder(dispatch, orderData)
        .then((response) => {
          return response?.json();
        })
        .then((jsonData) => {
          if (jsonData !== undefined) {
            if ("error" in jsonData) {
              if (jsonData.error.length !== 0) {
                dispatch(
                  mainStoreSliceActions.setAPICallMessage(jsonData.message)
                );
                dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
              }
            } else {
              dispatch(
                mainStoreSliceActions.setAPICallMessage("Data Retrieved!")
              );
              dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
              dispatch(cartStoreActions.setCartData([]));
              navigate("/order-placed");
            }
          } else {
            dispatch(
              mainStoreSliceActions.setAPICallMessage("Undefined Returned")
            );
            dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          }
        });
    }
  };

  return (
    <div className={classes.checkoutMenu}>
      <h6 className={classes.checkoutTitle}>Checkout</h6>
      <div className={classes.priceContainer}>
        <h6 className={classes.priceText}>Subtotal</h6>
        <p className={classes.total}>
          {`${priceStringCreator(finalCalculatedSubTotal, "USD")}`}
        </p>
      </div>
      <div className={classes.priceContainer}>
        <h6 className={classes.priceText}>Est. Standard Delivery:</h6>
        <p className={classes.total}> $8.95</p>
      </div>

      <div className={classes.priceContainer}>
        <h6 className={classes.priceText}>Est. Tax:</h6>
        <p className={classes.total}> $8.95</p>
      </div>
      <div className={classes.priceContainer}>
        <h6 className={classes.finalTotal}>Total:</h6>
        <p className={classes.total}>
          {`${priceStringCreator(stringFinalTotal, "USD")}`}
        </p>
      </div>
      <button
        className={classes.checkoutButton}
        onClick={checkoutButtonHandler}
      >
        <LockClosedIcon className={classes.checkoutIcon} />
        <p className={classes.checkoutText}>Checkout</p>
      </button>
    </div>
  );
};
export default CartCheckoutMenu;
