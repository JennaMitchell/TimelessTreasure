import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import classes from "./marketplace-selection.module.scss";
import { getFilteredProduct } from "../../../utilities/product-api-hooks/marketplace-product-hooks";
import { mainStoreSliceActions } from "../../../store/store";
import ProductPopup from "../../../components/popups/product/product-popup";
import { useState } from "react";
import {
  imageUrlCreator,
  priceStringCreator,
} from "../../../utilities/generic-hooks/generic-hooks";
const MarketplaceSelection = () => {
  const activeTags = useAppSelector((state) => state.marketStore.activeTags);
  const [retrievedData, setRetrievedData] = useState<any[]>([]);
  const [popupImageUrl, setPopupImageUrl] = useState<string>("");
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupDescription, setPopupDescription] = useState<string>("");
  const [popupPrice, setPopupPrice] = useState<string>("");
  const [popupQuantity, setPopupQuantity] = useState(0);
  const [popupProductId, setPopupProductId] = useState("");
  const dispatch = useAppDispatch();
  let renderReadyProductData: any[] = [];

  if (retrievedData.length !== 0) {
    renderReadyProductData = retrievedData.map((itemData, index) => {
      const productImageUrl = imageUrlCreator(itemData.imageUrl);
      const tempPrice = priceStringCreator(itemData.price, itemData.priceType);

      const itemContainerClickHandler = () => {
        dispatch(mainStoreSliceActions.setLockViewPort(true));
        dispatch(mainStoreSliceActions.setProductPopupActive(true));
        setPopupImageUrl(productImageUrl);
        setPopupTitle(itemData.title);
        setPopupDescription(itemData.description);
        setPopupQuantity(itemData.quantity);
        setPopupProductId(itemData.productId);
        setPopupPrice(tempPrice);
      };
      return (
        <div
          className={classes.itemContainer}
          key={`${itemData.title} ${index}`}
          onClick={itemContainerClickHandler}
        >
          <img
            src={productImageUrl}
            alt={itemData.title}
            className={classes.itemImage}
          />
          <h6 className={classes.itemTitle}>{itemData.title}</h6>
          <p className={classes.itemPrice}>{tempPrice}</p>
        </div>
      );
    });
  }

  const getDataHandler = () => {
    getFilteredProduct(dispatch, activeTags)
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

            if (`${typeof jsonData.foundProduct}` === "undefined") {
              setRetrievedData([]);
            } else {
              setRetrievedData(jsonData.foundProduct);
            }
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
        }
      });
  };

  return (
    <>
      <ProductPopup
        imageUrl={popupImageUrl}
        title={popupTitle}
        description={popupDescription}
        quantity={popupQuantity}
        price={popupPrice}
        productId={popupProductId}
      />
      <div className={classes.tempButton} onClick={getDataHandler}>
        Get Data
      </div>
      <div className={classes.markplaceSelection}>
        {renderReadyProductData.length === 0 && (
          <p className={classes.noProductFoundText}>No products found!</p>
        )}
        {renderReadyProductData}
      </div>
    </>
  );
};
export default MarketplaceSelection;
