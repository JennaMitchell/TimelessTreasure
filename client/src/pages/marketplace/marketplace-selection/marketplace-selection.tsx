import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import classes from "./marketplace-selection.module.scss";
import { mainStoreSliceActions } from "../../../store/store";
import ProductPopup from "../../../components/popups/product/product-popup";
import { useState } from "react";
import {
  imageUrlCreator,
  priceStringCreator,
  convertPrice,
  priceInputCleaner,
} from "../../../utilities/generic-hooks/generic-hooks";
import { marketplaceStoreActions } from "../../../store/marketplace";
import { recentlyViewedHook } from "../../../utilities/recently-viewed-hook/recently-viewed-hook";
import openSocket from "socket.io-client";
import { randomKeyGenerator } from "../../../utilities/generic-hooks/generic-hooks";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
const MarketplaceSelection = () => {
  const acceptedCategories = [
    "Ceramics",
    "Clocks",
    "Tablewear",
    "Paintings",
    "Electronics",
  ];

  const [twoColumnsActive, setTwoColumnsActive] = useState(false);

  const retrievedData = useAppSelector(
    (state) => state.marketStore.retrievedData
  );
  const activePageNumber = useAppSelector(
    (state) => state.marketStore.activePageNumber
  );
  const activeTags = useAppSelector((state) => state.marketStore.activeTags);
  const selectedPriceType = useAppSelector(
    (state) => state.mainStore.selectedPriceType
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

  const twoColumnsEnabledHandler = () => {
    const twoColumnMatch = window.matchMedia(`(max-width:1050px)`);
    if (twoColumnMatch.matches) {
      setTwoColumnsActive(true);
      dispatch(marketplaceStoreActions.setNumberOfItemsPerPage(6));
    }
    if (!twoColumnsActive && !twoColumnMatch.matches) {
      setTwoColumnsActive(false);
      dispatch(marketplaceStoreActions.setNumberOfItemsPerPage(9));
    }
  };

  useEffect(() => {
    const twoColumnMatch = window.matchMedia("(max-width:1050px)").matches;

    if (twoColumnMatch) {
      setTwoColumnsActive(true);
      dispatch(marketplaceStoreActions.setNumberOfItemsPerPage(6));
    }
  }, []);
  window.addEventListener("resize", twoColumnsEnabledHandler);
  useEffect(() => {
    const socket = openSocket("http://localhost:5000");
    socket.on("new-product", (data) => {
      if (data.action === "create-new-product") {
        // once data is recieved need to check if the users selected tags match with what is
        // the user is looking at the product added section
        //
        const newProductTags = data.productCreated.productTags;
        const copyOfActiveTags = JSON.parse(JSON.stringify(activeTags)).slice();

        // Handeling Scenario where there are no active tags
        if (copyOfActiveTags.length === 0) {
          const copyOfRetrievedData = JSON.parse(JSON.stringify(retrievedData));
          copyOfRetrievedData.push(data.productCreated);
          dispatch(
            marketplaceStoreActions.setRetrievedData(copyOfRetrievedData)
          );
          return;
        }

        // checking to see if the active tags only has category highlighted

        let indexOfActiveTagCategory = -1;
        let indexOfNewProductTagCategory = -1;
        let activeTagCategory = "";
        let productIdTagCategory = "";

        for (
          let indexOfActiveTag = 0;
          indexOfActiveTag < acceptedCategories.length;
          indexOfActiveTag++
        ) {
          if (copyOfActiveTags.includes(acceptedCategories[indexOfActiveTag])) {
            indexOfActiveTagCategory = copyOfActiveTags.indexOf(
              acceptedCategories[indexOfActiveTag]
            );
            activeTagCategory = acceptedCategories[indexOfActiveTag];
          }
          if (newProductTags.includes(acceptedCategories[indexOfActiveTag])) {
            indexOfNewProductTagCategory = newProductTags.indexOf(
              acceptedCategories[indexOfActiveTag]
            );
            productIdTagCategory = acceptedCategories[indexOfActiveTag];
          }
        }
        if (indexOfActiveTagCategory !== -1) {
          copyOfActiveTags.splice(indexOfActiveTagCategory, 1);
        }
        if (indexOfNewProductTagCategory !== -1) {
          newProductTags.splice(indexOfNewProductTagCategory, 1);
        }

        // Checking to see if the two removed categories are the same

        if (indexOfActiveTagCategory !== -1) {
          if (activeTagCategory !== productIdTagCategory) {
            return;
          }
        }

        for (
          let indexOfNewProductIds = 0;
          indexOfNewProductIds < newProductTags.length;
          indexOfNewProductIds++
        ) {
          if (activeTags.includes(newProductTags[indexOfNewProductIds])) {
            const copyOfRetrievedData = JSON.parse(
              JSON.stringify(retrievedData)
            );
            copyOfRetrievedData.push(data.productCreated);
            dispatch(
              marketplaceStoreActions.setRetrievedData(copyOfRetrievedData)
            );
            return;
          } else {
            return;
          }
        }
      }
    });
    socket.on("update-product", (data) => {
      if (data.action === "update-product") {
        const copyOfRetrievedData = JSON.parse(JSON.stringify(retrievedData));
        const updatedProductId = data.productCreated.productId;

        for (
          let indexOfCopiedRetrievedData = 0;
          indexOfCopiedRetrievedData < copyOfRetrievedData.length;
          indexOfCopiedRetrievedData++
        ) {
          if (
            copyOfRetrievedData[indexOfCopiedRetrievedData].productId ===
            updatedProductId
          ) {
            copyOfRetrievedData[indexOfCopiedRetrievedData] =
              data.productCreated;
          }
        }

        dispatch(marketplaceStoreActions.setRetrievedData(copyOfRetrievedData));
      }
    });
  }, []);

  if (retrievedData.length !== 0) {
    let indexOfRender = 0;

    for (
      let indexOfRenderReadyProductData =
        (activePageNumber - 1) * numberOfItemsPerPage;
      indexOfRenderReadyProductData < numberOfItemsPerPage * activePageNumber;
      indexOfRenderReadyProductData++
    ) {
      const itemData = retrievedData[indexOfRenderReadyProductData];

      if (typeof itemData === "undefined") {
        break;
      }

      const productImageUrl = imageUrlCreator(itemData.imageUrl);

      const tempPrice = priceStringCreator(
        priceInputCleaner(
          `${convertPrice(
            itemData.priceType,
            selectedPriceType,
            itemData.price
          )}`
        ),
        selectedPriceType
      );

      const key = randomKeyGenerator(20);

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
      renderReadyProductData[indexOfRender] = (
        <div
          className={classes.itemContainer}
          key={`${itemData.title} ${indexOfRender} ${key}`}
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
      indexOfRender++;
    }
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
  const containerKey = randomKeyGenerator(20);

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
        {renderReadyProductData.length !== 0 && renderReadyProductData}

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
