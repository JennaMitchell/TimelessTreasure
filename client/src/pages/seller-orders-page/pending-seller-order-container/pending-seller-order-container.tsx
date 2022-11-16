import classes from "./pending-seller-order-container.module.scss";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { imageUrlCreator } from "../../../utilities/generic-hooks/generic-hooks";
import { shipProductCall } from "../../../utilities/product-api-hooks/seller-product-hooks";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import {
  priceStringCreator,
  priceInputCleaner,
} from "../../../utilities/generic-hooks/generic-hooks";
interface ItemsPlaced {
  productInfo: {};
  quantity: number;
}
interface Props {
  itemsPlaced: ItemsPlaced[];
  orderNumber: string;
  status: string;
  date: string;
}
const PendingSellerOrderContainer = ({
  itemsPlaced,
  orderNumber,
  status,
  date,
}: Props) => {
  let totalNumberOfItems = 0;
  let totalBeforeTax = 0;
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userStore.userId);
  const userToken = useAppSelector((state) => state.userStore.userToken);

  const shipButtonHandler = () => {
    const apiOrderData = {
      sellerId: userId,
      orderNumber: orderNumber,
    };
    shipProductCall(dispatch, apiOrderData, userToken)
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
            dispatch(mainStoreSliceActions.setAPICallMessage("Item Shipped"));
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
        }
      });
  };

  const renderReadyOrderDetails = itemsPlaced.map(
    (itemData: any, index: number) => {
      totalNumberOfItems = totalNumberOfItems + +itemData.quantity;
      const priceWithoutCurrencySymbol = itemData.productInfo.price;
      totalBeforeTax =
        totalBeforeTax + +priceWithoutCurrencySymbol * +itemData.quantity;
      const finalImageUrl = imageUrlCreator(itemData.productInfo.imageUrl);
      return (
        <div
          className={classes.itemOrdered}
          key={`${orderNumber}-${itemData.productInfo.price}-${index}-${itemData.productInfo.date}`}
        >
          <img
            className={classes.productImage}
            alt="product"
            src={finalImageUrl}
          />
          <div className={classes.productDescriptionBlock}>
            <p className={classes.productTitle}>{itemData.productInfo.title}</p>
            <div className={classes.priceContainer}>
              <p className={classes.productPrice}>
                {priceStringCreator(
                  priceInputCleaner(`${itemData.productInfo.price}`),
                  "USD"
                )}
              </p>
              <p className={classes.quantity}>Qty. {itemData.quantity}</p>
            </div>
          </div>
        </div>
      );
    }
  );

  return (
    <div
      className={classes.orderContainer}
      key={`${orderNumber}-${status}-top-container`}
    >
      <div className={classes.orderTitleContainer}>
        <div className={classes.orderInfoBlock}>
          <h6 className={classes.orderNumber}>#{orderNumber}</h6>
          <p className={classes.orderDate}>{date}</p>
        </div>
      </div>
      <div className={classes.itemsOrderedContainer}>
        {renderReadyOrderDetails}
      </div>
      <div className={classes.moreOptionsContainer}>
        <div className={classes.totalContainer}>
          <p className={classes.totalNumberOfItems}>
            x{totalNumberOfItems} Items
          </p>
          <p className={classes.orderTotal}>${totalBeforeTax.toFixed(2)}</p>
        </div>
        <button className={classes.shipButton} onClick={shipButtonHandler}>
          <PaperAirplaneIcon className={classes.orderStatusIcon} />
          <p className={classes.orderStatusText}>{status}</p>
        </button>
      </div>
    </div>
  );
};
export default PendingSellerOrderContainer;
