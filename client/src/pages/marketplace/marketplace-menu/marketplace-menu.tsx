import classes from "./marketplace-menu.module.scss";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import blueVase from "../../../images/homepage/photo-carousel/antique-vase.jpg";
const MarketplaceMenu = () => {
  const [searchContainerActive, setSearchContainerActive] = useState(false);
  const [activeTagsActive, setActiveTagsActive] = useState(false);
  const [productCategoriesActive, setProductCategoriesActive] = useState(false);
  const [recentlyViewedActive, setRecentlyViewedActive] = useState(false);
  const [priceRangeActive, setPriceRangeActive] = useState(false);

  const [searchLabelMoveout, setSearchLabelMoveout] = useState(false);
  const [searchInputData, setSearchInputData] = useState("");
  const [searchInputActive, setSearchInputActive] = useState(false);
  const priceRanges = [
    "$5 - $9",
    "$10 - $14",
    "$15 - $19",
    "$20 - $24",
    "$25 - $29",
    "$30 - $39",
    "$40 - $49",
    "$50 - $99",
    "$99 +",
  ];

  const renderReadyPriceRanges = priceRanges.map((range) => {
    return (
      <div className={classes.priceRangeContainer}>
        <input
          aria-label={`price range ${range}`}
          type="checkbox"
          key={`${range}`}
          name={`${range}`}
          className={classes.priceRangeCheckbox}
        />
        <p className={classes.priceRangeText}>{range}</p>
      </div>
    );
  });

  const searchContainerHandler = () => {
    setSearchContainerActive(!searchContainerActive);
  };
  const activeTagsHandler = () => {
    setActiveTagsActive(!activeTagsActive);
  };
  const productCategoryHandler = () => {
    setProductCategoriesActive(!productCategoriesActive);
  };
  const recentlyViewedHandler = () => {
    setRecentlyViewedActive(!recentlyViewedActive);
  };
  const priceRangeHandler = () => {
    setPriceRangeActive(!priceRangeActive);
  };

  const searchInputChangeHandler = (e: React.ChangeEvent) => {
    if (!searchLabelMoveout) {
      setSearchLabelMoveout(true);
    }
    const targetElement = e.target as HTMLInputElement;
    setSearchInputData(targetElement.value);
  };
  const searchInputFocusHandler = () => {
    if (searchInputData.length === 0) {
      setSearchLabelMoveout(!searchLabelMoveout);
    }
    setSearchInputActive(true);
  };
  const searchInputBlurHandler = () => {
    if (searchInputData.length === 0) {
      setSearchLabelMoveout(false);
    }
    setSearchInputActive(false);
  };
  const searchLabelClickHandler = () => {
    document.getElementById("marketplaceSearchInput")?.focus();
    setSearchLabelMoveout(searchLabelMoveout);
    setSearchInputActive(true);
  };

  return (
    <div className={classes.collectionMenu}>
      <button
        className={classes.blockDropdownButton}
        onClick={searchContainerHandler}
      >
        Search
        {!searchContainerActive && (
          <ChevronDownIcon className={classes.buttonDownIcon} />
        )}
        {searchContainerActive && (
          <ChevronUpIcon className={classes.buttonDownIcon} />
        )}
      </button>
      {searchContainerActive && (
        <div className={classes.contentBlock}>
          <div
            className={`${classes.searchBarContainer} ${
              searchInputActive && classes.searchBarContainerActive
            } `}
          >
            <MagnifyingGlassIcon className={classes.searchbarIcon} />
            <div
              className={`${classes.inputLabel} ${
                searchLabelMoveout && classes.movedInputLabel
              }`}
              onClick={searchLabelClickHandler}
            >
              Search
            </div>
            <input
              className={classes.searchBarInput}
              onBlur={searchInputBlurHandler}
              onFocus={searchInputFocusHandler}
              onChange={searchInputChangeHandler}
            />
          </div>
        </div>
      )}

      <button
        className={classes.blockDropdownButton}
        onClick={activeTagsHandler}
      >
        Active Tags
        {!activeTagsActive && (
          <ChevronDownIcon className={classes.buttonDownIcon} />
        )}
        {activeTagsActive && (
          <ChevronUpIcon className={classes.buttonDownIcon} />
        )}
      </button>
      {activeTagsActive && (
        <div className={classes.tagBlock}>
          <div className={classes.tagContainer}>
            <p className={classes.tagTitles}>Clocks</p>
            <XMarkIcon className={classes.removeTagIcon}></XMarkIcon>
          </div>
        </div>
      )}
      <button
        className={classes.blockDropdownButton}
        onClick={productCategoryHandler}
      >
        Product Categories
        {!productCategoriesActive && (
          <ChevronDownIcon className={classes.buttonDownIcon} />
        )}
        {productCategoriesActive && (
          <ChevronUpIcon className={classes.buttonDownIcon} />
        )}
      </button>

      {productCategoriesActive && (
        <div className={classes.categoryBlock}>
          <button className={classes.categoryButton}>Ceramics (10)</button>
          <button className={classes.categoryButton}>Clocks (10)</button>
          <button className={classes.categoryButton}>Tablewear (10)</button>
          <button className={classes.categoryButton}>Paintings (10)</button>
          <button className={classes.categoryButton}>Electronics (10)</button>
        </div>
      )}
      <button
        className={classes.blockDropdownButton}
        onClick={recentlyViewedHandler}
      >
        Recently Viewed Products
        {!priceRangeActive && (
          <ChevronDownIcon className={classes.buttonDownIcon} />
        )}
        {priceRangeActive && (
          <ChevronUpIcon className={classes.buttonDownIcon} />
        )}
      </button>

      {priceRangeActive && (
        <div className={classes.contentBlock}>
          <div className={classes.recentlyViewedItemContainer}>
            <img
              className={classes.recentlyViewedProductPhoto}
              src={blueVase}
              alt="vase"
            />
            <div className={classes.priceTitleContainer}>
              <h6 className={classes.productTitles}>Blue Antique Vase</h6>
              <p className={classes.productPrice}>$65.00</p>
            </div>
          </div>
        </div>
      )}
      <button
        className={classes.blockDropdownButton}
        onClick={priceRangeHandler}
      >
        Price Range
        {!priceRangeActive && (
          <ChevronDownIcon className={classes.buttonDownIcon} />
        )}
        {priceRangeActive && (
          <ChevronUpIcon className={classes.buttonDownIcon} />
        )}
      </button>

      {priceRangeActive && (
        <div className={classes.priceRangesSectionContainer}>
          {renderReadyPriceRanges}
        </div>
      )}
    </div>
  );
};
export default MarketplaceMenu;
