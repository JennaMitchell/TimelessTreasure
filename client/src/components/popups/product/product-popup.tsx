import classes from "./product-popup.module.scss";
import decor from "../../../images/homepage/decor/decor.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";

interface Props {
  imageUrl: string;
  title: string;
  quantity: number;
  price: string;
  description: string;
}
const ProductPopup = ({
  imageUrl,
  title,
  quantity,
  price,
  description,
}: Props) => {
  const renderReadyQuantityOptions: any[] = [];

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
        {productQuantityIndex}
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
                  <select className={classes.quantityDropDown}>
                    {renderReadyQuantityOptions}
                  </select>
                </div>
              </div>
              <button className={classes.buyButton}>Buy</button>
            </div>
            <img className={classes.productImage} src={imageUrl} alt={title} />
          </div>
        </dialog>
      )}
    </>
  );
};
export default ProductPopup;
