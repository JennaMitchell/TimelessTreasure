import classes from "./order-placed.module.scss";
import logo from ".././../images/logo/logo.png";

const OrderPlacedPage = () => {
  return (
    <div className={classes.topContainer}>
      <h6 className={classes.title}>Order Placed!</h6>

      <p className={classes.orderPlacedText}> Thank you for your order!</p>
      <img className={classes.logoContainer} src={logo} />
    </div>
  );
};
export default OrderPlacedPage;
