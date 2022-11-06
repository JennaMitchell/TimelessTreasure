import classes from "./seller-orders.module.scss";

import PendingSellerOrderContainer from "./pending-seller-order-container/pending-seller-order-container";
import FulfilledSellerOrders from "./fulfilled-seller-orders/fulfilled-seller-orders";
import decor from "../../images/homepage/decor/decor.png";
import { tempSellerOrders } from "./temp-seller-orders";
import ItemForSaleContainer from "./item-for-sale-container/item-for-sale-container";
import { useAppDispatch } from "../../store/hooks";
import { mainStoreSliceActions } from "../../store/store";
import keyIdGenerator from "../../utilities/key-id-generator/key-id-generator";
import BuyerOrderContainer from "../buyer-order-page/buyer-order-container/buyer-order-container";
import {
  getBuyersPendingItemsCall,
  getBuyersFulfilledItemsCall,
} from "../../utilities/product-api-hooks/buyer-product-hooks";
import {
  getSellersItemsForSaleCall,
  getSellersPendingItemsCall,
  getSellersFulfilledItemsCall,
} from "../../utilities/product-api-hooks/seller-product-hooks";
import { useAppSelector } from "../../store/hooks";
import { userStoreSliceActions } from "../../store/user-store";

import { closeApiMessageDropDown } from "../../utilities/generic-hooks/generic-hooks";
import { sellerStoreActions } from "../../store/seller";
const SellerOrdersPage = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userStore.userId);
  const userToken = useAppSelector((state) => state.userStore.userToken);
  const sellerData: any = useAppSelector(
    (state) => state.sellerStore.sellerData
  );
  const sellerPendingOrderData = useAppSelector(
    (state) => state.sellerStore.sellerPendingOrderData
  );
  const sellerFulfilledOrderData = useAppSelector(
    (state) => state.sellerStore.sellerFulfilledOrderData
  );
  const buyerFulfilledOrders = useAppSelector(
    (state) => state.userStore.buyerFulfilledOrders
  );
  const buyerPendingOrders = useAppSelector(
    (state) => state.userStore.buyerPendingOrders
  );

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
              Promise.reject();
            }
          } else {
            dispatch(sellerStoreActions.setSellerData(jsonData));
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          Promise.reject();
        }
      })
      .then(() => {
        return getSellersPendingItemsCall(dispatch, userId, userToken);
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
              sellerStoreActions.setSellerPendingOrderData(
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
        return getSellersFulfilledItemsCall(dispatch, userId, userToken);
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
              sellerStoreActions.setSellerFulfilledOrderData(
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
        return getBuyersPendingItemsCall(dispatch, userId, userToken);
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

  const renderReadySellerDataItemsForSale = [];

  if (sellerData.length !== 0) {
    for (
      let dataIndex = 0;
      dataIndex < sellerData.foundProducts.length;
      dataIndex++
    ) {
      const keyId = keyIdGenerator();

      if (sellerData.foundProducts[dataIndex].status === "For Sale") {
        renderReadySellerDataItemsForSale.push(
          <ItemForSaleContainer
            productImage={sellerData.foundProducts[dataIndex].imageUrl}
            productPrice={sellerData.foundProducts[dataIndex].price}
            productQty={sellerData.foundProducts[dataIndex].quantity}
            productTitle={sellerData.foundProducts[dataIndex].title}
            productPriceType={sellerData.foundProducts[dataIndex].priceType}
            productId={sellerData.foundProducts[dataIndex].productId}
            productTags={sellerData.foundProducts[dataIndex].productTags}
            productDescription={sellerData.foundProducts[dataIndex].description}
            index={dataIndex}
            key={keyId}
          />
        );
      }
    }
  }

  const renderReadyPendingOrders = sellerPendingOrderData.map((data) => {
    const keyId = keyIdGenerator();
    console.log(data);

    return (
      <PendingSellerOrderContainer
        itemsPlaced={data.itemsPlacedData}
        orderNumber={data.orderId}
        status={data.status}
        date={data.date}
        key={keyId}
      />
    );
  });
  const renderReadyFullfilledOrders = sellerFulfilledOrderData.map((data) => {
    const keyId = keyIdGenerator();
    return (
      <FulfilledSellerOrders
        itemsPlaced={data.itemsPlacedData}
        orderNumber={data.orderId}
        status={data.status}
        date={data.date}
        key={keyId}
      />
    );
  });

  const renderReadyBuyerPendingOrders = buyerPendingOrders.map((data) => {
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
  const renderReadyBuyerFullfilledOrders = buyerFulfilledOrders.map((data) => {
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
      <div className={classes.tempButton} onClick={tempHandler}>
        Temp
      </div>
      <button className={classes.newProductButton} onClick={newPostHandler}>
        New Post
      </button>
      <h6 className={classes.sectionTitle}>Items For Sale</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      {/* <div className={classes.ordersContainer}>{renderReadyItemsForSale} </div> */}
      <div className={classes.ordersContainer}>
        {renderReadySellerDataItemsForSale}
        {renderReadySellerDataItemsForSale.length === 0 && (
          <h6 className={classes.noDataFoundText}>No Orders For Sale</h6>
        )}
      </div>
      <h6 className={classes.sectionTitle}>Pending Orders</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      <div className={classes.ordersContainer}>
        {sellerPendingOrderData.length === 0 && (
          <h6 className={classes.noDataFoundText}>No Pending Orders</h6>
        )}
        {sellerPendingOrderData.length !== 0 && renderReadyPendingOrders}
      </div>
      <h6 className={classes.sectionTitle}>Fulfilled Orders</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      <div className={classes.ordersContainer}>
        {sellerFulfilledOrderData.length === 0 && (
          <h6 className={classes.noDataFoundText}>No Orders Fulfilled</h6>
        )}
        {sellerFulfilledOrderData.length !== 0 && renderReadyFullfilledOrders}
      </div>

      <h6 className={classes.sectionTitle}>Pending Buy Orders</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      <div className={classes.ordersContainer}>
        {buyerPendingOrders.length === 0 && (
          <h6 className={classes.noDataFoundText}>No Orders Fulfilled</h6>
        )}
        {buyerPendingOrders.length !== 0 && renderReadyBuyerPendingOrders}
      </div>
      <h6 className={classes.sectionTitle}>Fulfilled Buy Orders</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      <div className={classes.ordersContainer}>
        {buyerFulfilledOrders.length === 0 && (
          <h6 className={classes.noDataFoundText}>No Orders Fulfilled</h6>
        )}
        {buyerFulfilledOrders.length !== 0 && renderReadyBuyerFullfilledOrders}
      </div>
    </div>
  );
};
export default SellerOrdersPage;
