import classes from "./user-settings-page.module.scss";
import decorImage from "../../images/homepage/decor/decor.png";
import UserOrderContainer from "./user-order-container/user-order-container";
import { tempUserOrders } from "./temp-user-order";
import UserOptions from "./user-options/user-options";

const UserSettingsPage = () => {
  const renderReadyUserOrders = tempUserOrders.map((data) => {
    if (data.order !== undefined) {
      const orderDetailsX = data.order.slice(0);
      return (
        <UserOrderContainer
          orderNumber={data.orderNumber}
          orderTimePlaced={data.orderTimePlaced}
          order={orderDetailsX}
        />
      );
    }
  });

  return (
    <>
      <div className={classes.banner}>User Info</div>
      <div className={classes.userInfoTopContainer}>
        <div className={classes.userInfoContentContainer}>
          <h6 className={classes.sectionTitle}>User Settings</h6>
          <img
            className={classes.sectionImage}
            alt="section-img"
            src={decorImage}
          />
          <UserOptions />
          <h6 className={classes.sectionTitle}>Order History</h6>
          <img
            className={classes.sectionImage}
            alt="section-img"
            src={decorImage}
          />
          <div className={classes.orderGridContainer}>
            {renderReadyUserOrders}
          </div>
        </div>
      </div>
    </>
  );
};
export default UserSettingsPage;
