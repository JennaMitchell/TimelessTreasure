import classes from "./recently-viewed-product.module.scss";
import ProductPopup from "../../../components/popups/product/product-popup";
import { useAppDispatch } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
interface Props {
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  quantity: number;
  productId: string;
}
const RecentlyViewedProduct = ({
  imageUrl,
  title,
  price,
  description,
  quantity,
  productId,
}: Props) => {
  const dispatch = useAppDispatch();

  const itemContainerClickHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(true));
    dispatch(mainStoreSliceActions.setProductPopupActive(true));
  };

  return (
    <>
      <ProductPopup
        imageUrl={imageUrl}
        title={title}
        description={description}
        quantity={quantity}
        price={price}
        productId={productId}
      />
      <div
        className={classes.recentlyViewedItemContainer}
        onClick={itemContainerClickHandler}
      >
        <img
          className={classes.recentlyViewedProductPhoto}
          src={imageUrl}
          alt="vase"
        />
        <div className={classes.priceTitleContainer}>
          <h6 className={classes.productTitles}>{title}</h6>
          <p className={classes.productPrice}>{price}</p>
        </div>
      </div>
    </>
  );
};
export default RecentlyViewedProduct;
