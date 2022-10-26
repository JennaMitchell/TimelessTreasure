import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import classes from "./item-for-sale-container.module.scss";
import keyIdGenerator from "../../../utilities/key-id-generator/key-id-generator";
interface Props {
  productImage: string;
  productTitle: string;
  productPrice: string;
  productQty: string;
  index: number;
}
const ItemForSaleContainer = ({
  productImage,
  productTitle,
  productPrice,
  productQty,
  index,
}: Props) => {
  const keyId = keyIdGenerator();

  return (
    <div className={classes.productDetailsContainer} key={`${keyId}`}>
      <img className={classes.productImage} alt="product" src={productImage} />
      <p className={classes.productTitle}>{productTitle}</p>
      <p className={classes.productPrice}>{productPrice}</p>
      <p className={classes.quantity}>Qty. {productQty}</p>
      <button className={`${classes.actionButton} ${classes.closingIcon}`}>
        <XMarkIcon className={classes.actionIcon} />
      </button>
      <button className={`${classes.actionButton} ${classes.updateIcon}`}>
        <PlusIcon className={classes.actionIcon} />
      </button>
    </div>
  );
};
export default ItemForSaleContainer;
