import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { mainStoreSliceActions } from "../../store/store";
import { sellerStoreActions } from "../../store/seller";

import { logoutHandler } from "../../utilities/login-signup-api-hooks/api-calls";
import classes from "./logged-in-dropdown.module.scss";
import {
  getSellersItemsForSaleCall,
  getSellersPendingItemsCall,
  getSellersFulfilledItemsCall,
} from "../../utilities/product-api-hooks/seller-product-hooks";
import {
  getBuyersFulfilledItemsCall,
  getBuyersPendingItemsCall,
} from "../../utilities/product-api-hooks/buyer-product-hooks";
import { userStoreSliceActions } from "../../store/user-store";
const LoggedInDropdown = () => {
  const isSeller = useAppSelector((state) => state.sellerStore.isSeller);
  const loggedInDropDownActive = useAppSelector(
    (state) => state.mainStore.loggedInDropDownActive
  );
  const userId = useAppSelector((state) => state.userStore.userId);
  const userToken = useAppSelector((state) => state.userStore.userToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logoutButtonHandler = () => {
    logoutHandler(dispatch, navigate);
    dropdownButtonHandler();
  };
  const dropdownButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLoggedInDropDownActive(false));
  };
  const sellerDropDownHandler = () => {
    dropdownButtonHandler();
    sellerPageClickedHandler();
  };
  const buyerDropDownHandler = () => {
    dropdownButtonHandler();
    buyerOrderButtonHandler();
  };

  const sellerPageClickedHandler = () => {
    getSellersItemsForSaleCall(dispatch, userId, userToken)
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
            dispatch(sellerStoreActions.setSellerData(jsonData));
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          Promise.reject();
        }
      })
      .then(() => {
        return getSellersPendingItemsCall(dispatch, userId, userToken);
      })
      .then((response: Response | void) => {
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
              return Promise.reject();
            }
          } else {
            dispatch(
              sellerStoreActions.setSellerPendingOrderData(
                jsonData.foundProducts
              )
            );
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          return Promise.reject();
        }
      })
      .then(() => {
        return getSellersFulfilledItemsCall(dispatch, userId, userToken);
      })
      .then((response: Response | void) => {
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
              return Promise.reject();
            }
          } else {
            dispatch(
              sellerStoreActions.setSellerFulfilledOrderData(
                jsonData.foundProducts
              )
            );
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          return Promise.reject();
        }
      })
      .then(() => {
        return getBuyersPendingItemsCall(dispatch, userId, userToken);
      })
      .then((response: Response | void) => {
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
              return Promise.reject();
            }
          } else {
            dispatch(
              userStoreSliceActions.setBuyerPendingOrders(
                jsonData.foundProducts
              )
            );
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          return Promise.reject();
        }
      })
      .then(() => {
        return getBuyersFulfilledItemsCall(dispatch, userId, userToken);
      })
      .then((response: Response | void) => {
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
              return Promise.reject();
            }
          } else {
            dispatch(
              userStoreSliceActions.setBuyerFulfilledOrders(
                jsonData.foundProducts
              )
            );
            dispatch(mainStoreSliceActions.setAPICallMessage("Data Retrieved"));
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          return Promise.reject();
        }
      });
  };

  const buyerOrderButtonHandler = () => {
    getBuyersPendingItemsCall(dispatch, userId, userToken)
      .then((response: Response | void) => {
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
              return Promise.reject();
            }
          } else {
            dispatch(
              userStoreSliceActions.setBuyerPendingOrders(
                jsonData.foundProducts
              )
            );
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          return Promise.reject();
        }
      })
      .then(() => {
        return getBuyersFulfilledItemsCall(dispatch, userId, userToken);
      })
      .then((response: Response | void) => {
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
              return Promise.reject();
            }
          } else {
            dispatch(
              userStoreSliceActions.setBuyerFulfilledOrders(
                jsonData.foundProducts
              )
            );
            dispatch(mainStoreSliceActions.setAPICallMessage("Data Retrieved"));
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          return Promise.reject();
        }
      });
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
          onClick={sellerDropDownHandler}
        >
          Orders
        </NavLink>
      )}
      {!isSeller && (
        <NavLink
          className={classes.userOptionButton}
          to="/buyer-orders"
          onClick={buyerDropDownHandler}
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
