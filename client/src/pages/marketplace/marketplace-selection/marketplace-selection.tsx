import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import classes from "./marketplace-selection.module.scss";
import { mainStoreSliceActions } from "../../../store/store";
import ProductPopup from "../../../components/popups/product/product-popup";
import { useState } from "react";
import {
  imageUrlCreator,
  priceStringCreator,
} from "../../../utilities/generic-hooks/generic-hooks";
import { marketplaceStoreActions } from "../../../store/marketplace";
import { recentlyViewedHook } from "../../../utilities/recently-viewed-hook/recently-viewed-hook";
import openSocket from "socket.io-client";

const MarketplaceSelection = () => {
  const socket = openSocket("http://localhost:5000");

  const retrievedData = useAppSelector(
    (state) => state.marketStore.retrievedData
  );

  const [popupImageUrl, setPopupImageUrl] = useState<string>("");
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupDescription, setPopupDescription] = useState<string>("");
  const [popupPrice, setPopupPrice] = useState<string>("");
  const [popupQuantity, setPopupQuantity] = useState(0);
  const [popupProductId, setPopupProductId] = useState("");
  const dispatch = useAppDispatch();
  const numberOfItemsPerPage = 9;
  let renderReadyProductData: any[] = [];
  const recentlyViewedProduct = useAppSelector(
    (state) => state.marketStore.recentlyViewedProduct
  );
  socket.on("new-product", (data) => {
    if (data.action === "create-new-product") {
      console.log("Product Created");
      // once data is recieved need to check if the users selected tags match with what is
      // the user is looking at
      const copyOfRetrievedData = JSON.parse(JSON.stringify(retrievedData));
      copyOfRetrievedData.push(data.productCreated);
      dispatch(marketplaceStoreActions.setRetrievedData(copyOfRetrievedData));
    }
  });
  socket.on("update-product", (data) => {
    if (data.action === "update-product") {
      console.log("Product Created");
      const copyOfRetrievedData = JSON.parse(JSON.stringify(retrievedData));
      copyOfRetrievedData.push(data.productCreated);
      dispatch(marketplaceStoreActions.setRetrievedData(copyOfRetrievedData));
    }
  });

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
        recentlyViewedHook(dispatch, recentlyViewedProduct, {
          imageUrl: productImageUrl,
          title: itemData.title,
          description: itemData.description,
          quantity: itemData.quantity,
          price: tempPrice,
          productId: itemData.productId,
        });
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

  const renderReadyItemPageButtons: any[] = [];

  const numberOfPages = Math.ceil(retrievedData.length / numberOfItemsPerPage);

  for (
    let pageButtonIndex = 0;
    pageButtonIndex < numberOfPages;
    pageButtonIndex++
  ) {
    renderReadyItemPageButtons.push(
      <button className={classes.pageButton}>{pageButtonIndex}</button>
    );
  }

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

      <div className={classes.marketplaceSelection}>
        {renderReadyProductData.length === 0 && (
          <p className={classes.noProductFoundText}>No products found!</p>
        )}
        {renderReadyProductData}

        <div className={classes.pageButtonContainer}>
          {renderReadyItemPageButtons}
        </div>
      </div>
    </>
  );
};
export default MarketplaceSelection;
