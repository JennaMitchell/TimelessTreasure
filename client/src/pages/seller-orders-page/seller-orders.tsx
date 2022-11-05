import classes from "./seller-orders.module.scss";

import PendingSellerOrderContainer from "./pending-seller-order-container/pending-seller-order-container";
import FulfilledSellerOrders from "./fulfilled-seller-orders/fulfilled-seller-orders";
import decor from "../../images/homepage/decor/decor.png";
import { tempSellerOrders } from "./temp-seller-orders";
import ItemForSaleContainer from "./item-for-sale-container/item-for-sale-container";
import { useAppDispatch } from "../../store/hooks";
import { mainStoreSliceActions } from "../../store/store";
import keyIdGenerator from "../../utilities/key-id-generator/key-id-generator";

import {
  getSellersItemsForSaleCall,
  getSellersPendingItemsCall,
} from "../../utilities/product-api-hooks/seller-product-hooks";
import { useAppSelector } from "../../store/hooks";

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
              Promise.reject();
            }
          } else {
            console.log(54);
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
        console.log(66);
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
            console.log(jsonData);
            dispatch(
              sellerStoreActions.setSellerPendingOrderData(
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

  for (let i = 0; i < tempSellerOrders.length; i++) {
    if (tempSellerOrders[i].status === "Fulfilled") {
      fulfilledOrders.push(tempSellerOrders[i]);
    } else {
      pendingOrders.push(tempSellerOrders[i]);
    }
  }

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
      <h6 className={classes.sectionTitle}>Items For Sale</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      {/* <div className={classes.ordersContainer}>{renderReadyItemsForSale} </div> */}
      <div className={classes.ordersContainer}>
        {renderReadySellerDataItemsForSale}
        {renderReadySellerDataItemsForSale.length === 0 && (
          <h6 className={classes.noDataFoundText}>No Data Found</h6>
        )}
      </div>
      <h6 className={classes.sectionTitle}>Pending Orders</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      <div className={classes.ordersContainer}>
        {sellerPendingOrderData.length === 0 && (
          <h6 className={classes.noDataFoundText}>No Data Found</h6>
        )}
        {sellerPendingOrderData.length !== 0 && renderReadyPendingOrders}
      </div>
      <h6 className={classes.sectionTitle}>Fulfilled Orders</h6>
      <img src={decor} alt="text-decor" className={classes.textDecor} />
      <div className={classes.ordersContainer}>
        {renderReadyFullfilledOrders}
      </div>
    </div>
  );
};
export default SellerOrdersPage;