import classes from "./buyer-orders.module.scss";
import BuyerOrderContainer from "./buyer-order-container/buyer-order-container";
import decor from "../../images/homepage/decor/decor.png";
import { tempSellerOrders } from "./temp-seller-orders";
import { useAppSelector } from "../../store/hooks";
import keyIdGenerator from "../../utilities/key-id-generator/key-id-generator";

const BuyerOrdersPage = () => {
  const pendingOrders = [];
  const fulfilledOrders = [];

  const buyerFulfilledOrders = useAppSelector(
    (state) => state.userStore.buyerFulfilledOrders
  );
  const buyerPendingOrders = useAppSelector(
    (state) => state.userStore.buyerPendingOrders
  );

  for (let i = 0; i < tempSellerOrders.length; i++) {
    if (tempSellerOrders[i].status === "Fulfilled") {
      fulfilledOrders.push(tempSellerOrders[i]);
    } else {
      pendingOrders.push(tempSellerOrders[i]);
    }
  }

  const renderReadyPendingOrders = buyerPendingOrders.map((data) => {
    const keyId = keyIdGenerator();
    return (
      <BuyerOrderContainer
        itemsPlaced={data.itemsPlacedData}
        orderNumber={data.orderId}
        status={data.overallStatus}
        quantityArray={data.quantityArray}
        date={data.date}
        key={keyId}
      />
    );
  });
  const renderReadyFullfilledOrders = buyerFulfilledOrders.map((data) => {
    const keyId = keyIdGenerator();
    return (
      <BuyerOrderContainer
        itemsPlaced={data.itemsPlacedData}
        orderNumber={data.orderId}
        status={data.overallStatus}
        quantityArray={data.quantityArray}
        date={data.date}
        key={keyId}
      />
    );
  });

  return (
    <div className={classes.topContainer}>
      <h6 className={classes.sectionTitle}>Pending Orders</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      <div className={classes.ordersContainer}>
        {buyerPendingOrders.length === 0 && (
          <p className={classes.noDataText}> No Pending Orders</p>
        )}
        {buyerPendingOrders.length !== 0 && renderReadyPendingOrders}
      </div>
      <h6 className={classes.sectionTitle}>Fulfilled Orders</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      <div className={classes.ordersContainer}>
        {buyerFulfilledOrders.length === 0 && (
          <p className={classes.noDataText}> No Fulfilled Orders</p>
        )}
        {buyerFulfilledOrders.length !== 0 && renderReadyFullfilledOrders}
      </div>
    </div>
  );
};
export default BuyerOrdersPage;
