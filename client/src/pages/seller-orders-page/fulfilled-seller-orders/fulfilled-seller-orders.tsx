import classes from "./fulfilled-seller-orders.module.scss";

import {
  UserCircleIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
export interface OrderDetails {
  productImage: string;
  productTitle: string;
  productPrice: string;
  productQty: string;
}

interface Props {
  orderNumber: string;
  orderTimePlaced: string;
  order: OrderDetails[];
  status: string;
}
const FulfilledSellerOrders = ({
  orderNumber,
  orderTimePlaced,
  order,
  status,
}: Props) => {
  let totalNumberOfItems = 0;
  let totalBeforeTax = 0;

  const renderReadyOrderDetails = order.map((order, index) => {
    totalNumberOfItems = totalNumberOfItems + +order.productQty;
    const priceWithoutCurrencySymbol = order.productPrice.slice(1);
    totalBeforeTax =
      totalBeforeTax + +priceWithoutCurrencySymbol * +order.productQty;

    return (
      <div
        className={classes.itemOrdered}
        key={`${orderNumber}-${order.productPrice}-${index}-${orderTimePlaced}`}
      >
        <img
          className={classes.productImage}
          alt="product"
          src={order.productImage}
        />
        <div className={classes.productDescriptionBlock}>
          <p className={classes.productTitle}>{order.productTitle}</p>
          <div className={classes.priceContainer}>
            <p className={classes.productPrice}>{order.productPrice}</p>
            <p className={classes.quantity}>Qty. {order.productQty}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      className={classes.orderContainer}
      key={`${orderNumber}-${orderTimePlaced}-top-container`}
    >
      <div className={classes.moreInfoContainer}>
        <PlusIcon className={classes.moreInfoIcon} />
      </div>
      <div className={classes.orderTitleContainer}>
        <div className={classes.orderInfoBlock}>
          <h6 className={classes.orderNumber}>#{orderNumber}</h6>
          <p className={classes.orderDate}>{orderTimePlaced}</p>
        </div>
        <UserCircleIcon className={classes.userImage} />
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
          <CheckIcon className={classes.orderStatusIcon} />
          <p className={classes.orderStatusText}>{status}</p>
        </div>
      </div>
    </div>
  );
};
export default FulfilledSellerOrders;
