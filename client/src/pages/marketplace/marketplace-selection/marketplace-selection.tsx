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
import keyIdGenerator from "../../../utilities/key-id-generator/key-id-generator";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const MarketplaceSelection = () => {
  const socket = openSocket("http://localhost:5000");

  const retrievedData = useAppSelector(
    (state) => state.marketStore.retrievedData
  );
  const activePageNumber = useAppSelector(
    (state) => state.marketStore.activePageNumber
  );

  const [popupImageUrl, setPopupImageUrl] = useState<string>("");
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupDescription, setPopupDescription] = useState<string>("");
  const [popupPrice, setPopupPrice] = useState<string>("");
  const [popupQuantity, setPopupQuantity] = useState(0);
  const [popupProductId, setPopupProductId] = useState("");
  const dispatch = useAppDispatch();
  const numberOfItemsPerPage = useAppSelector(
    (state) => state.marketStore.numberOfItemsPerPage
  );
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
      const key = keyIdGenerator();

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
      if (
        index >= numberOfItemsPerPage * activePageNumber ||
        index < (activePageNumber - 1) * numberOfItemsPerPage
      ) {
        return;
      } else {
        return (
          <div
            className={classes.itemContainer}
            key={`${itemData.title} ${index} ${key}`}
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
      }
    });
  }

  const renderReadyItemPageButtons: any[] = [];

  const numberOfPages = Math.ceil(retrievedData.length / numberOfItemsPerPage);

  const pageButtonHandler = (e: React.MouseEvent) => {
    const clickedElement = e.target as HTMLButtonElement;
    const splitId = clickedElement.id.split("-");
    const pageNumber = splitId[0];
    dispatch(marketplaceStoreActions.setActivePageNumber(+pageNumber));
  };

  for (
    let pageButtonIndex = 0;
    pageButtonIndex < numberOfPages;
    pageButtonIndex++
  ) {
    renderReadyItemPageButtons.push(
      <button
        className={`${classes.pageButton} ${
          activePageNumber === pageButtonIndex + 1 && classes.activePageButton
        }`}
        onClick={pageButtonHandler}
        key={`marketplace-page-button-${pageButtonIndex + 1}`}
        id={`${pageButtonIndex + 1}-marketplace-page-button`}
      >
        {pageButtonIndex + 1}
      </button>
    );
  }
  const containerKey = keyIdGenerator();

  const pageButtonLeftIconHandler = () => {
    if (activePageNumber === 0) {
      dispatch(marketplaceStoreActions.setActivePageNumber(0));
    } else {
      dispatch(
        marketplaceStoreActions.setActivePageNumber(activePageNumber - 1)
      );
    }
  };
  const pageButtonRightIconHandler = () => {
    if (activePageNumber === numberOfPages) {
      dispatch(marketplaceStoreActions.setActivePageNumber(numberOfPages));
    } else {
      dispatch(
        marketplaceStoreActions.setActivePageNumber(activePageNumber + 1)
      );
    }
  };
  const middlePageButton = [];

  if (numberOfPages >= 4) {
    if (activePageNumber < numberOfPages && activePageNumber > 1) {
      middlePageButton[0] = renderReadyItemPageButtons[activePageNumber - 1];
    }
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

      <div className={classes.marketplaceSelection} key={containerKey}>
        {renderReadyProductData.length === 0 && (
          <p className={classes.noProductFoundText}>No products found!</p>
        )}
        {renderReadyProductData}

        {numberOfPages < 4 && (
          <div className={classes.pageButtonContainer}>
            {renderReadyItemPageButtons}
          </div>
        )}
        {numberOfPages >= 4 && (
          <div className={classes.pageButtonContainer}>
            <ChevronLeftIcon
              className={classes.pageButtonIcon}
              onClick={pageButtonLeftIconHandler}
            />
            {renderReadyItemPageButtons[0]}
            <p className={classes.buttonSeperatorText}>...</p>

            {activePageNumber === 1 && renderReadyItemPageButtons[1]}
            {middlePageButton[0]}
            {activePageNumber === numberOfPages &&
              renderReadyItemPageButtons[numberOfPages - 2]}
            <p className={classes.buttonSeperatorText}>...</p>
            {renderReadyItemPageButtons[numberOfPages - 1]}
            <ChevronRightIcon
              className={classes.pageButtonIcon}
              onClick={pageButtonRightIconHandler}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default MarketplaceSelection;
