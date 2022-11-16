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
import { deleteAccountCall } from "../../utilities/user-settings-api-hooks/api-calls-user-setting-hooks";
import { useEffect, useRef } from "react";
const LoggedInDropdown = () => {
  const isSeller = useAppSelector((state) => state.sellerStore.isSeller);
  const loggedInDropDownActive = useAppSelector(
    (state) => state.mainStore.loggedInDropDownActive
  );
  const userId = useAppSelector((state) => state.userStore.userId);
  const userToken = useAppSelector((state) => state.userStore.userToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const savedPassword = useAppSelector((state) => state.userStore.tempPassword);
  const logoutButtonHandler = () => {
    logoutHandler(dispatch, navigate);
    dropdownButtonHandler();

    deleteAccountCall(
      dispatch,
      {
        password: savedPassword,
        userId: userId,
      },
      userToken
    )
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
          dispatch(mainStoreSliceActions.setAPICallMessage(jsonData.message));
          dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
          dispatch(userStoreSliceActions.setUsername(""));
          dispatch(userStoreSliceActions.setUserEmail(""));
          dispatch(userStoreSliceActions.setUserLoggedIn(false));
          dispatch(userStoreSliceActions.setUserToken(""));
          dispatch(userStoreSliceActions.setUserId(""));
          dispatch(userStoreSliceActions.setSessionId(""));

          navigate("/");
        }
      });
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

  const dropdownMenuRef = useRef(null);

  useEffect(() => {
    const dropdownTarget = document.getElementById("logged-in-drop-down-menu");
    const topNavBarUserButton = document.getElementById("nav-bar-user-button");
    if (dropdownTarget != null && topNavBarUserButton != null) {
      const navUserButtonOffsets = topNavBarUserButton.getBoundingClientRect();
      const navUserButtonLeftOffset = navUserButtonOffsets.left;
      dropdownTarget.style.left = `${navUserButtonLeftOffset + 2.5}px`;
      console.log(dropdownTarget.style.left);
    }
  }, []);

  const resizeLockedHeightHandler = () => {
    const topNavBarUserButton = document.getElementById("nav-bar-user-button");
    if (dropdownMenuRef.current != null && topNavBarUserButton != null) {
      const dropdownMenuRefCurrent = dropdownMenuRef.current as HTMLDivElement;
      const navUserButtonOffsets = topNavBarUserButton.getBoundingClientRect();
      const navUserButtonLeftOffset = navUserButtonOffsets.left;
      dropdownMenuRefCurrent.style.left = `${navUserButtonLeftOffset + 2.5}px`;
    }
  };
  window.addEventListener("resize", resizeLockedHeightHandler);

  return (
    <div
      className={`${classes.loggedInDropDownMenu} ${
        loggedInDropDownActive && classes.dropdownMoveOut
      }`}
      ref={dropdownMenuRef}
      id="logged-in-drop-down-menu"
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
