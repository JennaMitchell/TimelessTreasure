import classes from "./cart-items-section.module.scss";
import cartTempData from "./cart-temp-data";
import { TrashIcon } from "@heroicons/react/24/solid";
const CartItemSection = () => {
  return (
    <div className={classes.itemsTopContainer}>
      <div className={classes.productContainer}>
        <div className={classes.productDescriptionContainer}>
          <img
            className={classes.productImage}
            src={cartTempData[0].image}
            alt="antique vase"
          />
          <h6 className={classes.productTitle}>{cartTempData[0].title}</h6>
          <p className={classes.productPrice}>{cartTempData[0].price}</p>
        </div>

        <div className={classes.productMangementContainer}>
          <select className={classes.numberOfItemsDropDown}>
            <option className={classes.numberOfItemsNumber}>1</option>
            <option className={classes.numberOfItemsNumber}>2</option>
            <option className={classes.numberOfItemsNumber}>3</option>
          </select>
          <TrashIcon className={classes.trashIcon} />
        </div>
      </div>
    </div>
  );
};
export default CartItemSection;
