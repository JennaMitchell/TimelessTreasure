import classes from "./top-nav-bar.module.scss";
import logo from "../../../images/logo/logo.png";
import bagIcon from "../../../images/icons/bag-icon.png";
import React, { useRef, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { getSearchedProduct } from "../../../utilities/product-api-hooks/marketplace-product-hooks";
import { marketplaceStoreActions } from "../../../store/marketplace";
interface LogicObject {
  [key: string]: {
    labelMoveout: boolean;
    inputData: "";
  };
}
const TopNavBar = () => {
  const availableCurrency = ["USD", "CAN", "EUR"];
  const [searchBarActive, setSearchBarActive] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchBarRef = useRef(null);
  const cartData = useAppSelector((state) => state.cartStore.cartData);
  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
    searchBarNavInput: {
      labelMoveout: false,
      inputData: "",
    },
  });

  const searchBarApiCallHandler = () => {
    getSearchedProduct(dispatch, inputLogicObject.searchBarNavInput.inputData)
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
            marketplaceStoreActions.setRetrievedData(jsonData.foundProduct)
          );
          setInputLogicObject({
            searchBarNavInput: {
              labelMoveout: false,
              inputData: "",
            },
          });
          if (searchBarRef.current != null) {
            const currentElement = searchBarRef.current as HTMLInputElement;
            currentElement.value = "";
          }
        }
        navigate("/marketplace");
      });
  };
  const inputCopyObjectHandler = () =>
    JSON.parse(JSON.stringify(inputLogicObject));

  const inputChangeHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();

    if (!copyOfInputObject[targetElement.id].labelMoveout) {
      copyOfInputObject[targetElement.id].labelMoveout = true;
    }
    copyOfInputObject[targetElement.id].inputData = targetElement.value;
    setInputLogicObject(copyOfInputObject);
  };
  const inputFocusHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();

    if (searchBarRef.current != null) {
      const currentElement = searchBarRef.current as HTMLInputElement;
      currentElement.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          searchBarApiCallHandler();
        }
      });
    }
    if (copyOfInputObject[targetElement.id].inputData.length === 0) {
      copyOfInputObject[targetElement.id].labelMoveout = true;
      setInputLogicObject(copyOfInputObject);
    }
    setSearchBarActive(true);
  };
  const inputBlurHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();

    if (searchBarRef.current != null) {
      const currentElement = searchBarRef.current as HTMLInputElement;
      currentElement.removeEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          searchBarApiCallHandler();
        }
      });
    }
    if (copyOfInputObject[targetElement.id].inputData.length === 0) {
      copyOfInputObject[targetElement.id].labelMoveout = false;
      setInputLogicObject(copyOfInputObject);
    }
    setSearchBarActive(false);
  };

  const inputLabelClickHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLLabelElement;
    const copyOfInputObject = inputCopyObjectHandler();
    document.getElementById(`${targetElement.htmlFor}`)?.focus();
    copyOfInputObject[targetElement.htmlFor].labelMoveout =
      !copyOfInputObject[targetElement.htmlFor].labelMoveout;
    setInputLogicObject(copyOfInputObject);
    setSearchBarActive(true);
  };

  const loginPopupActive = useAppSelector(
    (state) => state.mainStore.loginPopupActive
  );
  const lockViewPort = useAppSelector((state) => state.mainStore.lockViewport);
  const loginHandler = () => {
    dispatch(mainStoreSliceActions.setLoginPopupActive(!loginPopupActive));
    dispatch(mainStoreSliceActions.setLockViewPort(!lockViewPort));
  };

  const homeButtonHandler = () => {
    dispatch(mainStoreSliceActions.setNavMenuSubCategoryClicked(""));
    navigate("/");
  };

  const searchContainerClickHandler = () => {
    document.getElementById("searchContainerId")?.focus();
  };
  const userLoggedIn = useAppSelector((state) => state.userStore.userLoggedIn);
  const username = useAppSelector((state) => state.userStore.username);
  const renderReadyCurrencyOptions = availableCurrency.map((currency) => {
    return (
      <option className={classes.currencyOption} key={`${currency}`}>
        {currency}
      </option>
    );
  });

  const loggedInDropdownActive = useAppSelector(
    (state) => state.mainStore.loggedInDropDownActive
  );
  const userButtonHandler = () => {
    dispatch(
      mainStoreSliceActions.setLoggedInDropDownActive(!loggedInDropdownActive)
    );
  };

  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.topContainer}>
        <div className={classes.titleContainer} onClick={homeButtonHandler}>
          <img className={classes.icon} src={logo} alt="Company logo" />
          <h2 className={classes.title}>Timeless Treasures</h2>
        </div>
        <div className={classes.actionBar}>
          {!userLoggedIn && (
            <button className={classes.loginButton} onClick={loginHandler}>
              Login/Signup
            </button>
          )}
          {userLoggedIn && (
            <button className={classes.userButton} onClick={userButtonHandler}>
              <UserCircleIcon className={classes.userIcon} />
              <p className={classes.username}>{username}</p>
            </button>
          )}

          <div
            className={`${classes.searchContainer} ${
              searchBarActive && classes.searchContainerActive
            }`}
            onClick={searchContainerClickHandler}
          >
            <label
              className={`${classes.searchInputLabel} ${
                inputLogicObject.searchBarNavInput.labelMoveout &&
                classes.searchInputLabelMoveOut
              }`}
              onClick={inputLabelClickHandler}
              htmlFor="searchBarNavInput"
            >
              Search
            </label>
            <MagnifyingGlassIcon
              className={classes.searchIcon}
              onClick={searchContainerClickHandler}
            />
            <input
              className={classes.searchInput}
              id="searchBarNavInput"
              ref={searchBarRef}
              onBlur={inputBlurHandler}
              onFocus={inputFocusHandler}
              onChange={inputChangeHandler}
              maxLength={100}
            />
          </div>

          <select className={classes.currencyDropDown}>
            {renderReadyCurrencyOptions}
          </select>
          <NavLink className={classes.cartContainer} to="/cart">
            <img className={classes.cartIcon} src={bagIcon} alt="Cart Icon" />
            <div className={classes.cartItemsTrackers}>{cartData.length}</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
