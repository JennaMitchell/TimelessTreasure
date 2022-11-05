import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { mainStoreSliceActions } from "../../store/store";

import { logoutHandler } from "../../utilities/login-signup-api-hooks/api-calls";
import classes from "./logged-in-dropdown.module.scss";

const LoggedInDropdown = () => {
  const isSeller = useAppSelector((state) => state.sellerStore.isSeller);
  const loggedInDropDownActive = useAppSelector(
    (state) => state.mainStore.loggedInDropDownActive
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutButtonHandler = () => {
    logoutHandler(dispatch, navigate);
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
      {!isSeller && (
        <NavLink
          className={classes.userOptionButton}
          to="/buyer-orders"
          onClick={dropdownButtonHandler}
        >
          Orders
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
