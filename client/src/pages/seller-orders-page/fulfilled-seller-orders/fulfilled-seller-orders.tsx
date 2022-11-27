import classes from "./fulfilled-seller-orders.module.scss";

import { CheckIcon } from "@heroicons/react/24/outline";
import { pictureSelectionTestData } from "../../../utilities/constants/picture-selection-data";
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
const FulfilledSellerOrders = ({
  itemsPlaced,
  orderNumber,
  status,
  date,
}: Props) => {
  let totalNumberOfItems = 0;
  let totalBeforeTax = 0;

  const renderReadyOrderDetails = itemsPlaced.map(
    (itemData: any, index: number) => {
      totalNumberOfItems = totalNumberOfItems + +itemData.quantity;
      const priceWithoutCurrencySymbol = itemData.productInfo.price;
      totalBeforeTax =
        totalBeforeTax + +priceWithoutCurrencySymbol * +itemData.quantity;
      const finalImageUrl =
        pictureSelectionTestData[itemData.productInfo.imageKey].photo;
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
                  priceInputCleaner(itemData.productInfo.price),
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
        <div className={classes.fulfilledSection}>
          <CheckIcon className={classes.orderStatusIcon} />
          <p className={classes.orderStatusText}>{status}</p>
        </div>
      </div>
    </div>
  );
};
export default FulfilledSellerOrders;
