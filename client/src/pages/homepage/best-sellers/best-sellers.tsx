import React, { useEffect } from "react";
import classes from "./best-sellers.module.scss";
import { useState } from "react";
import ProductPopup from "../../../components/popups/product/product-popup";
import {
  hotestItemsApiCall,
  hotestItemsApiCallWithFilter,
} from "../../../utilities/product-api-hooks/homepage-hooks";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import {
  imageUrlCreator,
  priceInputCleaner,
  priceStringCreator,
  convertPrice,
} from "../../../utilities/generic-hooks/generic-hooks";
import { getTagDataHandler } from "../../../utilities/product-react-hooks/product-react-hooks";
import { useNavigate } from "react-router-dom";
import openSocket from "socket.io-client";
const BestSellers = () => {
  const [activeNewArrivalButton, setActiveNewArrivalButton] = useState("All");
  const [clickedItemData, setClickedItemData] = useState<{
    [key: string]: any;
  }>({});
  let renderReadyCollection: any[] = [];
  const selectedPriceType = useAppSelector(
    (state) => state.mainStore.selectedPriceType
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const socket = openSocket("http://localhost:5000");
  socket.on("update-product", (data) => {
    if (data.action === "update-product") {
      const updatedProductId = data.productCreated.productId;
      let indexOfMatch = -1;

      for (
        let indexOfLatestItem = 0;
        indexOfLatestItem < hotestData.length;
        indexOfLatestItem++
      ) {
        if (updatedProductId === hotestData[indexOfLatestItem].productId) {
          indexOfMatch = indexOfLatestItem;
        }
      }
      if (indexOfMatch !== -1) {
        const copyOfLatestData = JSON.parse(JSON.stringify(hotestData));
        copyOfLatestData[indexOfMatch] = data.productCreated;
        setHotestData(copyOfLatestData);
      }
    }
  });

  const navButtonTitles = [
    "All",
    "Ceramics",
    "Clocks",
    "Tablewear",
    "Paintings",
    "Electronics",
  ];
  const navButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLButtonElement;
    const elementId = targetElement.id;
    const indexOfFirstDash = elementId.indexOf("-");
    const sectionTitle = elementId.slice(0, indexOfFirstDash);

    setActiveNewArrivalButton(sectionTitle);

    if (sectionTitle === "All") {
      latestAllProductHandler();
    } else {
      navButtonApiHandler(sectionTitle);
    }
  };

  const [hotestData, setHotestData] = useState<any[]>([]);

  const navButtonApiHandler = (productType: string) => {
    hotestItemsApiCallWithFilter(dispatch, productType)
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
            setHotestData(jsonData.foundProducts);
            console.log(jsonData);
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          Promise.reject();
        }
      });
  };

  const latestAllProductHandler = () => {
    hotestItemsApiCall(dispatch)
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
            setHotestData(jsonData.foundProducts);
            console.log(jsonData);
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          Promise.reject();
        }
      });
  };

  useEffect(() => {
    hotestItemsApiCall(dispatch)
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
            setHotestData(jsonData.foundProducts);
            console.log(jsonData);
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          Promise.reject();
        }
      });
  }, [dispatch]);

  const renderReadyNavButtons = navButtonTitles.map((title: string, index) => {
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    return (
      <button
        id={`${title}-new-arrivals-section-button`}
        className={`${classes.navButton} ${
          activeNewArrivalButton === `${title}` && classes.activeNavButton
        }`}
        onClick={navButtonHandler}
        key={`${title} ${index}`}
      >
        {capitalizedTitle}
      </button>
    );
  });

  if (hotestData.length !== 0) {
    renderReadyCollection = hotestData.map((dataEntry, index) => {
      const imageUrl = imageUrlCreator(dataEntry.imageUrl);
      const cleanedPrice = priceStringCreator(
        priceInputCleaner(
          `${convertPrice(
            dataEntry.priceType,
            selectedPriceType,
            dataEntry.price
          )}`
        ),
        selectedPriceType
      );
      const productClickHandler = () => {
        setClickedItemData(dataEntry);
        dispatch(mainStoreSliceActions.setProductPopupActive(true));
        dispatch(mainStoreSliceActions.setLockViewPort(true));
      };

      return (
        <div
          className={classes.itemContainer}
          key={`${dataEntry.title} ${index}`}
          onClick={productClickHandler}
        >
          <img
            src={imageUrl}
            alt={`${dataEntry}`}
            className={classes.itemImage}
          />
          <p className={classes.itemTitle}>{dataEntry.title}</p>
          <p className={classes.itemPrice}>{cleanedPrice}</p>
        </div>
      );
    });
  }
  const viewMoreHandler = () => {
    getTagDataHandler(dispatch, "");
    navigate("/marketplace");
  };

  return (
    <div className={classes.mainContainer}>
      {Object.keys(clickedItemData).length !== 0 && (
        <ProductPopup
          imageUrl={imageUrlCreator(clickedItemData.imageUrl)}
          title={clickedItemData.title}
          description={clickedItemData.description}
          quantity={clickedItemData.quantity}
          price={priceStringCreator(
            priceInputCleaner(`${clickedItemData.price}`),
            "USD"
          )}
          productId={clickedItemData.productId}
        />
      )}

      <div className={classes.navBar}>{renderReadyNavButtons}</div>
      <div className={classes.itemCollection}>
        {hotestData.length === 0 && (
          <p className={classes.noItemsFoundText}>
            No items currently available. Check back soon for new sales
          </p>
        )}
        {hotestData.length !== 0 && renderReadyCollection}
      </div>
      <button className={classes.showMoreButton} onClick={viewMoreHandler}>
        View More
      </button>
    </div>
  );
};

export default BestSellers;
