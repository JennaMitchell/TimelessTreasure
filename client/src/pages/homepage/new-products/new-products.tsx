import React, { useEffect } from "react";
import classes from "./new-products.module.scss";
import { useState } from "react";
import ProductPopup from "../../../components/popups/product/product-popup";
import {
  latestItemsApiCall,
  latestItemsApiCallWithFilter,
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

const NewProducts = () => {
  const [activeNewArrivalButton, setActiveNewArrivalButton] = useState("All");
  const [navBarSeperatedEnabler, setNavBarSeperatedEnabler] = useState(false);
  const [clickedItemData, setClickedItemData] = useState<{
    [key: string]: any;
  }>({});
  const [latestData, setLatestData] = useState<any[]>([]);
  const navBarSeperatedEnablerHandler = () => {
    const match = window.matchMedia(`(max-width:1000px)`);

    if (match.matches) {
      setNavBarSeperatedEnabler(true);
    }
    if (!navBarSeperatedEnabler && !match.matches) {
      setNavBarSeperatedEnabler(false);
    }
  };

  useEffect(() => {
    const navBarWindowMatch = window.matchMedia("(max-width:1000px)");

    if (navBarWindowMatch) {
      setNavBarSeperatedEnabler(true);
    }
  }, []);

  window.addEventListener("resize", navBarSeperatedEnablerHandler);

  useEffect(() => {
    const socket = openSocket("http://localhost:5000");
    socket.on("new-product", (data) => {
      if (data.action === "create-new-product") {
        // once data is recieved need to check if the users selected tags match with what is
        // the user is looking at
        const copyOfLatestData = JSON.parse(JSON.stringify(latestData));
        // shifting data over 1.
        const shiftedData = [];
        for (let indexOfShift = 0; indexOfShift < 7; indexOfShift++) {
          shiftedData[indexOfShift + 1] = copyOfLatestData[indexOfShift];
        }
        shiftedData[0] = data.productCreated;
      }
    });
    socket.on("update-product", (data) => {
      if (data.action === "update-product") {
        const updatedProductId = data.productCreated.productId;
        let indexOfMatch = -1;

        for (
          let indexOfLatestItem = 0;
          indexOfLatestItem < latestData.length;
          indexOfLatestItem++
        ) {
          if (updatedProductId === latestData[indexOfLatestItem].productId) {
            indexOfMatch = indexOfLatestItem;
          }
        }
        if (indexOfMatch !== -1) {
          const copyOfLatestData = JSON.parse(JSON.stringify(latestData));
          copyOfLatestData[indexOfMatch] = data.productCreated;
          setLatestData(copyOfLatestData);
        }
      }
    });
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const navButtonApiHandler = (productType: string) => {
    latestItemsApiCallWithFilter(dispatch, productType)
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
            setLatestData(jsonData.foundProducts);
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
    latestItemsApiCall(dispatch)
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
            setLatestData(jsonData.foundProducts);
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
    latestItemsApiCall(dispatch)
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
            setLatestData(jsonData.foundProducts);
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

  let renderReadyCollection: any[] = [];
  const selectedPriceType = useAppSelector(
    (state) => state.mainStore.selectedPriceType
  );

  if (latestData.length !== 0) {
    renderReadyCollection = latestData.map((dataEntry, index) => {
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

      {!navBarSeperatedEnabler && (
        <div className={classes.navBar}>{renderReadyNavButtons}</div>
      )}
      {navBarSeperatedEnabler && (
        <div className={classes.seperatedNavBar}>
          {renderReadyNavButtons.slice(0, 3)}
        </div>
      )}
      {navBarSeperatedEnabler && (
        <div className={classes.seperatedNavBar}>
          {renderReadyNavButtons.slice(3, 6)}
        </div>
      )}
      <div className={classes.itemCollection}>
        {latestData.length === 0 && (
          <p className={classes.noItemsFoundText}>
            No items currently available. Check back soon for new sales
          </p>
        )}
        {latestData.length !== 0 && renderReadyCollection}
      </div>
      <button className={classes.showMoreButton} onClick={viewMoreHandler}>
        View More
      </button>
    </div>
  );
};

export default NewProducts;
