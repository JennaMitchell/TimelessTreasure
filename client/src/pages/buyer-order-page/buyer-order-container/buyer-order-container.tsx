import classes from "./buyer-order-container.module.scss";

import {
  imageUrlCreator,
  priceInputCleaner,
} from "../../../utilities/generic-hooks/generic-hooks";
import { CheckIcon } from "@heroicons/react/24/outline";
import { priceStringCreator } from "../../../utilities/generic-hooks/generic-hooks";
interface ItemsPlaced {
  productInfo: {};
  quantity: number;
}
interface Props {
  itemsPlaced: ItemsPlaced[];
  orderNumber: string;
  status: string;
  date: string;
  quantityArray: number[];
}
const BuyerOrderContainer = ({
  itemsPlaced,
  orderNumber,
  status,
  date,
  quantityArray,
}: Props) => {
  let totalNumberOfItems = 0;
  let totalBeforeTax = 0;

  const renderReadyOrderDetails = itemsPlaced.map(
    (itemData: any, index: number) => {
      totalNumberOfItems = totalNumberOfItems + +quantityArray[index];
      const priceWithoutCurrencySymbol = itemData.price;
      totalBeforeTax =
        totalBeforeTax + +priceWithoutCurrencySymbol * +quantityArray[index];
      const finalImageUrl = imageUrlCreator(itemData.imageUrl);
      return (
        <div
          className={classes.itemOrdered}
          key={`${orderNumber}-${itemData.price}-${index}-${itemData.date}`}
        >
          <img
            className={classes.productImage}
            alt="product"
            src={finalImageUrl}
          />
          <div className={classes.productDescriptionBlock}>
            <p className={classes.productTitle}>{itemData.title}</p>
            <div className={classes.priceContainer}>
              <p className={classes.productPrice}>
                {priceStringCreator(
                  priceInputCleaner(`${itemData.price}`),
                  "USD"
                )}
              </p>
              <p className={classes.quantity}>Qty. {quantityArray[index]}</p>
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
        <div className={classes.orderStatusContainer}>
          <CheckIcon className={classes.statusIcon} />
          {status === "Ship" && (
            <p className={classes.orderStatusText}>{"Packing"}</p>
          )}
          {status === "Fulfilled" && (
            <p className={classes.orderStatusText}>{"Fulfilled"}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default BuyerOrderContainer;
