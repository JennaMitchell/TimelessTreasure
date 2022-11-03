import classes from "./buyer-orders.module.scss";

import PendingSellerOrderContainer from "./pending-buyer-order-container/pending-buyer-order-container";
import FulfilledSellerOrders from "./fulfilled-buyer-orders/fulfilled-buyer-orders";
import decor from "../../images/homepage/decor/decor.png";
import { tempSellerOrders } from "./temp-seller-orders";

import { useAppDispatch } from "../../store/hooks";
import { mainStoreSliceActions } from "../../store/store";
import keyIdGenerator from "../../utilities/key-id-generator/key-id-generator";

import { getSellersItemsForSaleCall } from "../../utilities/product-api-hooks/seller-product-hooks";
import { useAppSelector } from "../../store/hooks";
import { userStoreSliceActions } from "../../store/user-store";
import { closeApiMessageDropDown } from "../../utilities/generic-hooks/generic-hooks";
const BuyerOrdersPage = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userStore.userId);
  const userToken = useAppSelector((state) => state.userStore.userToken);

  const pendingOrders = [];
  const fulfilledOrders = [];
  const newPostHandler = () => {
    dispatch(mainStoreSliceActions.setNewPostPopupActive(true));
    dispatch(mainStoreSliceActions.setLockViewPort(true));
    closeApiMessageDropDown(dispatch);
  };

  const tempHandler = () => {
    getSellersItemsForSaleCall(dispatch, userId, userToken)
      .then((response) => {
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
            }
          } else {
            dispatch(
              mainStoreSliceActions.setAPICallMessage("Data Retrieved!")
            );
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));

            dispatch(userStoreSliceActions.setSellerData(jsonData));
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
        }
      });
  };

  for (let i = 0; i < tempSellerOrders.length; i++) {
    if (tempSellerOrders[i].status === "Fulfilled") {
      fulfilledOrders.push(tempSellerOrders[i]);
    } else {
      pendingOrders.push(tempSellerOrders[i]);
    }
  }

  const renderReadyPendingOrders = pendingOrders.map((data) => {
    const keyId = keyIdGenerator();
    return (
      <PendingSellerOrderContainer
        order={data.order}
        orderNumber={data.orderNumber}
        orderTimePlaced={data.orderTimePlaced}
        status={data.status}
        key={keyId}
      />
    );
  });
  const renderReadyFullfilledOrders = fulfilledOrders.map((data) => {
    const keyId = keyIdGenerator();
    return (
      <FulfilledSellerOrders
        order={data.order}
        orderNumber={data.orderNumber}
        orderTimePlaced={data.orderTimePlaced}
        status={data.status}
        key={keyId}
      />
    );
  });

  return (
    <div className={classes.topContainer}>
      <div className={classes.tempButton} onClick={tempHandler}>
        Temp
      </div>
      <button className={classes.newProductButton} onClick={newPostHandler}>
        New Post
      </button>
      <h6 className={classes.sectionTitle}>Pending Orders</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      <div className={classes.ordersContainer}>{renderReadyPendingOrders}</div>
      <h6 className={classes.sectionTitle}>Fulfilled Orders</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      <div className={classes.ordersContainer}>
        {renderReadyFullfilledOrders}
      </div>
    </div>
  );
};
export default BuyerOrdersPage;
