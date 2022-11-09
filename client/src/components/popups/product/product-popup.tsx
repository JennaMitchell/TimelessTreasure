import classes from "./product-popup.module.scss";
import decor from "../../../images/homepage/decor/decor.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import { cartStoreActions } from "../../../store/cart";
import React, { useState } from "react";

interface Props {
  imageUrl: string;
  title: string;
  quantity: number;
  price: string;
  description: string;
  productId: string;
}
const ProductPopup = ({
  imageUrl,
  title,
  quantity,
  price,
  description,
  productId,
}: Props) => {
  const renderReadyQuantityOptions: any[] = [];
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  console.log(price);

  const quantitySelectionHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLOptionElement;

    setSelectedQuantity(+targetElement.value);
  };

  const productPopupActive = useAppSelector(
    (state) => state.mainStore.productPopupActive
  );
  const dispatch = useAppDispatch();

  const dialogBackdropClickHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.id === "product-backdrop") {
      closingHandler();
    }
  };
  const closingHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(false));
    dispatch(mainStoreSliceActions.setProductPopupActive(false));
  };
  const cartData = useAppSelector((state) => state.cartStore.cartData);

  const buyButtonHandler = () => {
    const copyOfCartData = JSON.parse(JSON.stringify(cartData));

    const productIdsInCartData = [];
    for (let copyIndex = 0; copyIndex < copyOfCartData.length; copyIndex++) {
      productIdsInCartData.push(copyOfCartData[copyIndex].productId);
    }

    // check if product is already in cart data
    if (productIdsInCartData.length !== 0) {
      if (productIdsInCartData.includes(productId)) {
        const indexOfProductIdInUse = productIdsInCartData.indexOf(productId);

        // check to see if quantity available is bigger than what is currently available
        const newQuantity =
          copyOfCartData[indexOfProductIdInUse].quantity + selectedQuantity;
        if (newQuantity >= quantity) {
          copyOfCartData[indexOfProductIdInUse].quantity = quantity;
        } else {
          copyOfCartData[indexOfProductIdInUse].quantity =
            copyOfCartData[indexOfProductIdInUse].quantity + selectedQuantity;
        }
        dispatch(cartStoreActions.setCartData(copyOfCartData));
        closingHandler();

        return;
      }
    }

    const selectedCartData = {
      imageUrl: imageUrl,
      title: title,
      quantity: selectedQuantity,
      price: price,
      description: description,
      productId: productId,
      quantityAvailable: quantity,
    };
    copyOfCartData.push(selectedCartData);
    dispatch(cartStoreActions.setCartData(copyOfCartData));
    closingHandler();
  };

  for (
    let productQuantityIndex = 0;
    productQuantityIndex < quantity;
    productQuantityIndex++
  ) {
    renderReadyQuantityOptions.push(
      <option
        className={classes.quantityOption}
        key={`${productQuantityIndex}-product-available-quantity`}
      >
        {productQuantityIndex + 1}
      </option>
    );
  }

  return (
    <>
      {productPopupActive && (
        <dialog
          className={classes.popupBackground}
          id="product-backdrop"
          onClick={dialogBackdropClickHandler}
        >
          <div className={classes.popupMainContainer}>
            <div className={classes.infoContainer}>
              <h6 className={classes.productTitle}>{title}</h6>
              <img src={decor} alt="textDecor" className={classes.decorImage} />
              <p className={classes.descriptionText}>{description}</p>
              <div className={classes.optionsContainer}>
                <p className={classes.priceText}>{price}</p>
                <div className={classes.quantityContainer}>
                  <p className={classes.quantityText}>Qty.</p>
                  <select
                    className={classes.quantityDropDown}
                    onChange={quantitySelectionHandler}
                  >
                    {renderReadyQuantityOptions}
                  </select>
                </div>
              </div>
              <button className={classes.buyButton} onClick={buyButtonHandler}>
                Buy
              </button>
            </div>
            <img className={classes.productImage} src={imageUrl} alt={title} />
          </div>
        </dialog>
      )}
    </>
  );
};
export default ProductPopup;
