//MAke sure to add a if empty clause
import classes from "./cart.module.scss";
import CartCheckoutMenu from "./cart-check-menu/cart-checkout-menu";
import CartItemSection from "./cart-items-section/cart-items-section";
const Cart = () => {
  return (
    <>
      <div className={classes.titleBanner}>
        <h6 className={classes.mainTitle}>Cart</h6>
      </div>
      <div className={classes.cartTopContainer}>
        <CartItemSection />
        <CartCheckoutMenu />
      </div>
    </>
  );
};
export default Cart;
