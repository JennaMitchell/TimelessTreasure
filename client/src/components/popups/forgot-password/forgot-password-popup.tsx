import classes from "./forgot-password-popup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import decor from "../../../images/homepage/decor/decor.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { mainStoreSliceActions } from "../../../store/store";

const ForgotPasswordPopup = () => {
  const forgotPasswordPopupActive = useAppSelector(
    (state) => state.mainStore.forgotPasswordPopupActive
  );
  const dispatch = useAppDispatch();
  const [initialRender, setInitialRender] = useState(false);

  const apiCallDropdownActive = useAppSelector(
    (state) => state.mainStore.apiCallDropdownActive
  );

  useEffect(() => {
    if (!initialRender && forgotPasswordPopupActive) {
      setInitialRender(true);
    }
  }, [forgotPasswordPopupActive, initialRender]);

  const closingIconHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(false));
    dispatch(mainStoreSliceActions.setForgotPasswordPopupActive(false));
    if (apiCallDropdownActive) {
      dispatch(mainStoreSliceActions.setApiCallDropDownMove(false));
      setTimeout(() => {
        dispatch(mainStoreSliceActions.setAPICallMessage(""));
        dispatch(mainStoreSliceActions.setAPICallMessageType(""));
        dispatch(mainStoreSliceActions.setApiCallDropdownActive(false));
      }, 1000);
    }
  };
  const dialogBackdropClickHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.id === "dialogContainer") {
      dispatch(mainStoreSliceActions.setLockViewPort(false));
      dispatch(mainStoreSliceActions.setForgotPasswordPopupActive(false));
    }
  };

  const signInTextHandler = () => {
    dispatch(mainStoreSliceActions.setLoginPopupActive(true));
    dispatch(mainStoreSliceActions.setForgotPasswordPopupActive(false));
  };

  return (
    <>
      {forgotPasswordPopupActive && (
        <div
          className={classes.forgotPasswordDialog}
          id="dialogContainer"
          onClick={dialogBackdropClickHandler}
        >
          <form className={classes.forgotPasswordForm}>
            <div
              className={classes.closingContainer}
              onClick={closingIconHandler}
            >
              <XMarkIcon className={classes.closingIcon} />
            </div>
            <h6 className={classes.forgotPasswordTitle}>Forgot Password</h6>
            <img src={decor} alt="text-decor" className={classes.textDecor} />
            <p className={classes.forgotPasswordWarningTitle}>
              Service Unavailable
            </p>
            <p className={classes.forgotPasswordText}>
              {" "}
              All users and data are erased every 24 hours
            </p>
            <button
              className={classes.signinButton}
              onClick={signInTextHandler}
            >
              Back to Signin
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default ForgotPasswordPopup;
