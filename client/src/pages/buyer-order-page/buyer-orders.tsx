import classes from "./buyer-orders.module.scss";

import BuyerOrderContainer from "./buyer-order-container/buyer-order-container";

import decor from "../../images/homepage/decor/decor.png";
import { tempSellerOrders } from "./temp-seller-orders";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { mainStoreSliceActions } from "../../store/store";
import keyIdGenerator from "../../utilities/key-id-generator/key-id-generator";

import {
  getBuyersPendingItemsCall,
  getBuyersFulfilledItemsCall,
} from "../../utilities/product-api-hooks/buyer-product-hooks";
import { userStoreSliceActions } from "../../store/user-store";
const BuyerOrdersPage = () => {
  const dispatch = useAppDispatch();
  const pendingOrders = [];
  const fulfilledOrders = [];
  const userId = useAppSelector((state) => state.userStore.userId);
  const userToken = useAppSelector((state) => state.userStore.userToken);

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

  const tempHandler = () => {
    getBuyersPendingItemsCall(dispatch, userId, userToken)
      .then((response: Response | void) => {
        return response?.json();
      })
      .then((jsonData) => {
        if (jsonData !== undefined) {
          if ("error" in jsonData) {
            if (jsonData.error.length !== 0) {
              dispatch(
                mainStoreSliceActions.setAPICallMessage(jsonData.message)
              );
              dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
              return Promise.reject();
            }
          } else {
            dispatch(
              userStoreSliceActions.setBuyerPendingOrders(
                jsonData.foundProducts
              )
            );
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          return Promise.reject();
        }
      })
      .then(() => {
        return getBuyersFulfilledItemsCall(dispatch, userId, userToken);
      })
      .then((response: Response | void) => {
        return response?.json();
      })
      .then((jsonData) => {
        if (jsonData !== undefined) {
          if ("error" in jsonData) {
            if (jsonData.error.length !== 0) {
              dispatch(
                mainStoreSliceActions.setAPICallMessage(jsonData.message)
              );
              dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
              return Promise.reject();
            }
          } else {
            dispatch(
              userStoreSliceActions.setBuyerFulfilledOrders(
                jsonData.foundProducts
              )
            );
            dispatch(mainStoreSliceActions.setAPICallMessage("Data Retrieved"));
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          return Promise.reject();
        }
      });
  };

  return (
    <div className={classes.topContainer}>
      <div className={classes.tempButton} onClick={tempHandler}>
        Temp
      </div>
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
