import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { mainStoreSliceActions } from "../../store/store";

import { logoutHandler } from "../../utilities/login-signup-hooks/api-calls";
import classes from "./logged-in-dropdown.module.scss";

const LoggedInDropdown = () => {
  const isSeller = useAppSelector((state) => state.userStore.isSeller);
  const loggedInDropDownActive = useAppSelector(
    (state) => state.mainStore.loggedInDropDownActive
  );
  const dispatch = useAppDispatch();
  const logoutButtonHandler = () => {
    logoutHandler();
    dropdownButtonHandler();
  };
  const dropdownButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLoggedInDropDownActive(false));
  };

  return (
    <div
      className={`${classes.loggedInDropDownMenu} ${
        loggedInDropDownActive && classes.dropdownMoveOut
      }`}
    >
      <NavLink
        className={classes.userOptionButton}
        to="/user-settings"
        onClick={dropdownButtonHandler}
      >
        Settings
      </NavLink>
      {isSeller && (
        <NavLink
          className={classes.userOptionButton}
          to="/seller-orders"
          onClick={dropdownButtonHandler}
        >
          Posts
        </NavLink>
      )}
      <button
        className={classes.userOptionButton}
        onClick={logoutButtonHandler}
      >
        Logout
      </button>
    </div>
  );
};
export default LoggedInDropdown;
