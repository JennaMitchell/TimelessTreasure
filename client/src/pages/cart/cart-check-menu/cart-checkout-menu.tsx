import classes from "./cart-checkout-menu.module.scss";
import { LockClosedIcon } from "@heroicons/react/24/outline";
const CartCheckoutMenu = () => {
  return (
    <div className={classes.checkoutMenu}>
      <h6 className={classes.checkoutTitle}>Checkout</h6>
      <div className={classes.priceContainer}>
        <h6 className={classes.priceText}>Subtotal</h6>
        <p className={classes.total}> $65.99</p>
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
        <p className={classes.total}> $76.99</p>
      </div>
      <button className={classes.checkoutButton}>
        <LockClosedIcon className={classes.checkoutIcon} />
        <p className={classes.checkoutText}>Checkout</p>
      </button>
    </div>
  );
};
export default CartCheckoutMenu;
