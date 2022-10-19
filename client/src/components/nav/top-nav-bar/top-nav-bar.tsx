import classes from "./top-nav-bar.module.scss";
import logo from "../../../images/logo/logo.png";
import bagIcon from "../../../images/icons/bag-icon.png";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import { NavLink } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const TopNavBar = () => {
  const availableCurrency = ["USD", "CAN", "EUR"];
  const [searchValue, setSearchValue] = useState("Search");
  const dispatch = useAppDispatch();

  const searchBarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value.length === 0) {
    }
  };
  const loginPopupActive = useAppSelector(
    (state) => state.mainStore.loginPopupActive
  );
  const lockViewPort = useAppSelector((state) => state.mainStore.lockViewport);
  const loginHandler = () => {
    dispatch(mainStoreSliceActions.setLoginPopupActive(!loginPopupActive));
    dispatch(mainStoreSliceActions.setLockViewPort(!lockViewPort));
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

  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.topContainer}>
        <div className={classes.titleContainer}>
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
            <NavLink className={classes.userButton} to="/user-settings">
              <UserCircleIcon className={classes.userIcon} />
              <p className={classes.username}>{username}</p>
            </NavLink>
          )}

          <div
            className={classes.searchContainer}
            onClick={searchContainerClickHandler}
          >
            <MagnifyingGlassIcon
              className={classes.searchIcon}
              onClick={searchContainerClickHandler}
            />
            <input
              className={classes.searchInput}
              value={searchValue}
              onChange={searchBarHandler}
              id="searchContainerId"
            />
          </div>

          <select className={classes.currencyDropDown}>
            {renderReadyCurrencyOptions}
          </select>
          <NavLink className={classes.cartContainer} to="/cart">
            <img className={classes.cartIcon} src={bagIcon} alt="Cart Icon" />
            <div className={classes.cartItemsTrackers}>0</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
