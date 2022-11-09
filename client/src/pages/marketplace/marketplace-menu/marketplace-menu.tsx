import classes from "./marketplace-menu.module.scss";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import MarkplaceMenuTag from "../markplace-menu-components/tags/marketplace-menu-tag";
import CategoryFilterDropdown from "../markplace-menu-components/category-filter-dropdown/category-filter-dropdown";
import { capitalizeFirstLetter } from "../../../utilities/generic-hooks/generic-hooks";
import productTypeSubSelection from "../../../utilities/product-type-sub-selection";
import { marketplaceStoreActions } from "../../../store/marketplace";
import { getSearchedProduct } from "../../../utilities/product-api-hooks/marketplace-product-hooks";
import RecentlyViewedProduct from "../recently-viewed-product/recently-viewed-product";
import keyIdGenerator from "../../../utilities/key-id-generator/key-id-generator";
import { getTagDataHandler } from "../../../utilities/product-react-hooks/product-react-hooks";
interface RecentlyViewedProduct {
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  quantity: number;
  productId: string;
}
const MarketplaceMenu = () => {
  const dispatch = useAppDispatch();
  const [searchContainerActive, setSearchContainerActive] = useState(false);
  const [activeTagsActive, setActiveTagsActive] = useState(false);
  const [productCategoriesActive, setProductCategoriesActive] = useState(false);
  const [recentlyViewedActive, setRecentlyViewedActive] = useState(false);
  const [priceRangeActive, setPriceRangeActive] = useState(false);
  const marketplaceMenuSearchRef = useRef(null);
  const recentlyViewedProduct = useAppSelector(
    (state) => state.marketStore.recentlyViewedProduct
  );
  const activeTags = useAppSelector((state) => state.marketStore.activeTags);

  const [searchLabelMoveout, setSearchLabelMoveout] = useState(false);
  const [searchInputData, setSearchInputData] = useState("");
  const [searchInputActive, setSearchInputActive] = useState(false);

  const [activeFilterDropdown, setActiveFilterDropdown] = useState("");

  const tagClickedHandler = (targetId: string) => {
    const copyOfActiveTags: string[] = activeTags.slice();
    const indexOfTagToRemove = copyOfActiveTags.indexOf(targetId);
    copyOfActiveTags.splice(indexOfTagToRemove, 1);
    console.log(copyOfActiveTags);
    getTagDataHandler(dispatch, copyOfActiveTags);
    dispatch(marketplaceStoreActions.setActiveTags(copyOfActiveTags));
  };

  const searchBarApiCallHandler = () => {
    getSearchedProduct(dispatch, searchInputData)
      .then((data) => {
        return data?.json();
      })
      .then((jsonData) => {
        if ("error" in jsonData) {
          if (jsonData.error.length !== 0) {
            dispatch(mainStoreSliceActions.setAPICallMessage(jsonData.message));
            dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          }
        } else {
          dispatch(mainStoreSliceActions.setAPICallMessage("Product Found"));
          dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
          dispatch(
            marketplaceStoreActions.setRetrievedData(jsonData.foundProducts)
          );
          setSearchInputData("");
          if (marketplaceMenuSearchRef.current != null) {
            const currentElement =
              marketplaceMenuSearchRef.current as HTMLInputElement;
            currentElement.value = "";
          }
        }
      });
  };

  const dropdownClickedButtonRetriever = (
    filterClicked: string,
    remove: boolean,
    productType: string
  ) => {
    const copyOfActiveTags = activeTags.slice();

    const type = activeFilterDropdown;
    const typeKeys = Object.keys(productTypeSubSelection[type]);
    const typeValues = Object.values(productTypeSubSelection[type]);
    const indexOfClickedKey = typeKeys.indexOf(productType);
    const valuesToCheckArray = typeValues[indexOfClickedKey];

    let valueOfSubCatToRemove = "";

    for (let j = 0; j < valuesToCheckArray.length; j++) {
      if (copyOfActiveTags.includes(valuesToCheckArray[j])) {
        valueOfSubCatToRemove = valuesToCheckArray[j];
        break;
      }
    }

    if (valueOfSubCatToRemove.length !== 0) {
      const indexOfValueToRemove = copyOfActiveTags.indexOf(
        valueOfSubCatToRemove
      );
      copyOfActiveTags.splice(indexOfValueToRemove, 1);
    }

    if (remove) {
      const indexOfItemToRemove = copyOfActiveTags.indexOf(filterClicked);
      copyOfActiveTags.splice(indexOfItemToRemove, 1);

      dispatch(marketplaceStoreActions.setActiveTags(copyOfActiveTags));
      getTagDataHandler(dispatch, copyOfActiveTags);
    } else {
      const indexOfItem = copyOfActiveTags.indexOf(filterClicked);
      if (indexOfItem === -1) {
        copyOfActiveTags.push(filterClicked);
        dispatch(marketplaceStoreActions.setActiveTags(copyOfActiveTags));
        getTagDataHandler(dispatch, copyOfActiveTags);
      } else {
        copyOfActiveTags.splice(indexOfItem, 1);
        dispatch(marketplaceStoreActions.setActiveTags(copyOfActiveTags));
        getTagDataHandler(dispatch, copyOfActiveTags);
      }
    }
  };

  const filterDropdownHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLButtonElement;
    const targetId = targetElement.id;

    const indexOfDash = targetId.indexOf("-");
    const categorySelected = capitalizeFirstLetter(
      targetId.slice(0, indexOfDash)
    );

    dispatch(marketplaceStoreActions.setActiveTags([categorySelected]));

    if (activeFilterDropdown === categorySelected) {
      setActiveFilterDropdown("");
    } else {
      setActiveFilterDropdown(categorySelected);
    }
  };

  const navMenuSubCategoryClicked = useAppSelector(
    (state) => state.mainStore.navMenuSubCategoryClicked
  );
  const priceRanges = [
    "$5 - $9.99",
    "$10 - $14.99",
    "$15 - $19.99",
    "$20 - $24.99",
    "$25 - $29.99",
    "$30 - $39.99",
    "$40 - $49.99",
    "$50 - $99.99",
    "$100 +",
  ];
  useEffect(() => {
    if (navMenuSubCategoryClicked.length !== 0) {
      dispatch(
        mainStoreSliceActions.setNavMenuSubCategoryClicked(
          navMenuSubCategoryClicked
        )
      );
    }
  }, [navMenuSubCategoryClicked]);

  const priceButtonHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLDivElement;
    const targetId = targetElement.id;
    const indexOfPrice = targetId.indexOf("price");
    const priceRange = targetId.slice(0, indexOfPrice - 1);

    const copyOfActiveTags = activeTags.slice();

    if (copyOfActiveTags.includes(priceRange)) {
      const indexOfTagToRemove = copyOfActiveTags.indexOf(priceRange);
      copyOfActiveTags.splice(indexOfTagToRemove, 1);
    } else {
      for (
        let indexOfPrice = 0;
        indexOfPrice < priceRanges.length;
        indexOfPrice++
      ) {
        if (copyOfActiveTags.includes(priceRanges[indexOfPrice])) {
          const priceRangeToRemove = priceRanges[indexOfPrice];
          const indexOfRangeToRemove =
            copyOfActiveTags.indexOf(priceRangeToRemove);
          copyOfActiveTags.splice(indexOfRangeToRemove, 1);
          break;
        }
      }
      copyOfActiveTags.push(priceRange);
    }

    getTagDataHandler(dispatch, copyOfActiveTags);

    dispatch(marketplaceStoreActions.setActiveTags(copyOfActiveTags));
  };

  const renderReadyPriceRanges = priceRanges.map((range) => {
    let activeRange = false;

    if (activeTags.includes(range)) {
      activeRange = true;
    }

    return (
      <div
        className={classes.priceRangeContainer}
        id={`${range}-price-range`}
        onClick={priceButtonHandler}
        key={`${range}-price-range-dropdown`}
      >
        <button
          aria-label={`price range ${range}`}
          key={`${range}`}
          name={`${range}`}
          className={classes.priceRangeCheckbox}
          id={`${range}-price-range-input`}
        >
          {activeRange && <CheckIcon className={classes.priceCheckIcon} />}
        </button>
        <label
          className={classes.priceRangeText}
          htmlFor={`${range}-price-range-input`}
        >
          {range}
        </label>
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
    if (marketplaceMenuSearchRef.current != null) {
      const currentElement =
        marketplaceMenuSearchRef.current as HTMLInputElement;
      currentElement.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          console.log("ENTER");

          searchBarApiCallHandler();
        }
      });
    }
    if (searchInputData.length === 0) {
      setSearchLabelMoveout(!searchLabelMoveout);
    }
    setSearchInputActive(true);
  };
  const searchInputBlurHandler = () => {
    if (marketplaceMenuSearchRef.current != null) {
      const currentElement =
        marketplaceMenuSearchRef.current as HTMLInputElement;
      currentElement.removeEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          searchBarApiCallHandler();
        }
      });
    }
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
              ref={marketplaceMenuSearchRef}
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
          {activeTags.map((title: string, index: number) => {
            return (
              <MarkplaceMenuTag
                tagName={title}
                clickHandler={tagClickedHandler}
                key={`active-tags-${index}`}
              ></MarkplaceMenuTag>
            );
          })}
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
          <div className={classes.filterButtonContainer}>
            <button
              className={classes.categoryButton}
              onClick={filterDropdownHandler}
              id="ceramics-category-filter-button"
            >
              Ceramics
              {activeFilterDropdown === "Ceramics" && (
                <ChevronUpIcon className={classes.categoryButtonIcon} />
              )}
              {activeFilterDropdown !== "Ceramics" && (
                <ChevronDownIcon className={classes.categoryButtonIcon} />
              )}
            </button>
            {activeFilterDropdown === "Ceramics" && (
              <CategoryFilterDropdown
                productType="Ceramics"
                dataRetriever={dropdownClickedButtonRetriever}
              />
            )}
          </div>
          <div className={classes.filterButtonContainer}>
            <button
              className={classes.categoryButton}
              onClick={filterDropdownHandler}
              id="clocks-category-filter-button"
            >
              Clocks
              {activeFilterDropdown === "Clocks" && (
                <ChevronUpIcon className={classes.categoryButtonIcon} />
              )}
              {activeFilterDropdown !== "Clocks" && (
                <ChevronDownIcon className={classes.categoryButtonIcon} />
              )}
            </button>
            {activeFilterDropdown === "Clocks" && (
              <CategoryFilterDropdown
                productType="Clocks"
                dataRetriever={dropdownClickedButtonRetriever}
              />
            )}
          </div>
          <div className={classes.filterButtonContainer}>
            <button
              className={classes.categoryButton}
              onClick={filterDropdownHandler}
              id="tablewear-category-filter-button"
            >
              Tablewear
              {activeFilterDropdown === "Tablewear" && (
                <ChevronUpIcon className={classes.categoryButtonIcon} />
              )}
              {activeFilterDropdown !== "Tablewear" && (
                <ChevronDownIcon className={classes.categoryButtonIcon} />
              )}
            </button>
            {activeFilterDropdown === "Tablewear" && (
              <CategoryFilterDropdown
                productType="Tablewear"
                dataRetriever={dropdownClickedButtonRetriever}
              />
            )}
          </div>
          <div className={classes.filterButtonContainer}>
            <button
              className={classes.categoryButton}
              onClick={filterDropdownHandler}
              id="paintings-category-filter-button"
            >
              Paintings
              {activeFilterDropdown === "Paintings" && (
                <ChevronUpIcon className={classes.categoryButtonIcon} />
              )}
              {activeFilterDropdown !== "Paintings" && (
                <ChevronDownIcon className={classes.categoryButtonIcon} />
              )}
            </button>
            {activeFilterDropdown === "Paintings" && (
              <CategoryFilterDropdown
                productType="Paintings"
                dataRetriever={dropdownClickedButtonRetriever}
              />
            )}
          </div>
          <div className={classes.filterButtonContainer}>
            <button
              className={classes.categoryButton}
              onClick={filterDropdownHandler}
              id="electronics-category-filter-button"
            >
              Electronics
              {activeFilterDropdown === "Electronics" && (
                <ChevronUpIcon className={classes.categoryButtonIcon} />
              )}
              {activeFilterDropdown !== "Electronicss" && (
                <ChevronDownIcon className={classes.categoryButtonIcon} />
              )}
            </button>
            {activeFilterDropdown === "Electronics" && (
              <CategoryFilterDropdown
                productType="Electronics"
                dataRetriever={dropdownClickedButtonRetriever}
              />
            )}
          </div>
        </div>
      )}
      <button
        className={classes.blockDropdownButton}
        onClick={recentlyViewedHandler}
      >
        Recently Viewed Products
        {!recentlyViewedActive && (
          <ChevronDownIcon className={classes.buttonDownIcon} />
        )}
        {recentlyViewedActive && (
          <ChevronUpIcon className={classes.buttonDownIcon} />
        )}
      </button>

      {recentlyViewedActive && (
        <div className={classes.contentBlock}>
          {recentlyViewedProduct.map(
            (data: RecentlyViewedProduct, index: number) => {
              const key = keyIdGenerator();
              return (
                <RecentlyViewedProduct
                  imageUrl={data.imageUrl}
                  title={data.title}
                  quantity={data.quantity}
                  price={data.price}
                  description={data.description}
                  productId={data.productId}
                  key={key}
                />
              );
            }
          )}
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
