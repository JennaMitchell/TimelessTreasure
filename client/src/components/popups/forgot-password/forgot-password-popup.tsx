import classes from "./forgot-password-popup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import decor from "../../../images/homepage/decor/decor.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState, useRef } from "react";
import { mainStoreSliceActions } from "../../../store/store";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const ForgotPasswordPopup = () => {
  const forgotPasswordPopupActive = useAppSelector(
    (state) => state.mainStore.forgotPasswordPopupActive
  );
  const dispatch = useAppDispatch();
  const [initialRender, setInitialRender] = useState(false);

  const apiCallDropdownActive = useAppSelector(
    (state) => state.mainStore.apiCallDropdownActive
  );
  const mainContainerRef = useRef(null);
  const backdropRef = useRef(null);
  useEffect(() => {
    if (mainContainerRef.current != null && backdropRef.current != null) {
      const windowHeight = window.innerHeight;
      const mainContainerPopupCurrent =
        mainContainerRef.current as HTMLFormElement;
      const currentbackDrop = backdropRef.current as HTMLDivElement;

      const popupHeight = mainContainerPopupCurrent.clientHeight;

      if (popupHeight > windowHeight) {
        dispatch(mainStoreSliceActions.setLockScreenHeight(popupHeight));
        currentbackDrop.style.height = `${popupHeight}`;
        currentbackDrop.style.overflowY = `scroll`;
      } else {
        dispatch(mainStoreSliceActions.setLockScreenHeight(0));
      }
    }
  }, [dispatch]);
  const resizeLockedHeightHandler = () => {
    if (mainContainerRef.current != null) {
      const windowHeight = window.innerHeight;
      const mainContainerPopupCurrent =
        mainContainerRef.current as HTMLFormElement;
      const popupHeight = mainContainerPopupCurrent.clientHeight;
      if (backdropRef.current != null) {
        const currentbackDrop = backdropRef.current as HTMLDivElement;

        if (popupHeight > windowHeight) {
          dispatch(mainStoreSliceActions.setLockScreenHeight(popupHeight));
          currentbackDrop.style.height = `${popupHeight}`;
          currentbackDrop.style.overflowY = `scroll`;
        }
      }
    }
  };
  window.addEventListener("resize", resizeLockedHeightHandler);

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
          ref={backdropRef}
        >
          <form className={classes.forgotPasswordForm} ref={mainContainerRef}>
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
              All users accounts are deleted after one hour
            </p>
            <button
              className={classes.signinButton}
              onClick={signInTextHandler}
            >
              Login
              <ArrowRightIcon className={classes.returnIcon} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default ForgotPasswordPopup;
