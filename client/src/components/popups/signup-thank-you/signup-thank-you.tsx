import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import classes from "./signup-thank-you.module.scss";
import { mainStoreSliceActions } from "../../../store/store";
import { XMarkIcon } from "@heroicons/react/24/solid";
import decor from "../../../images/homepage/decor/decor.png";
import { useRef, useEffect } from "react";
const SignupThankYou = () => {
  const dispatch = useAppDispatch();

  const closingIconHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(false));
    dispatch(mainStoreSliceActions.setSignupThankYouPopupActive(false));
  };
  const signupThankYouPopupActive = useAppSelector(
    (state) => state.mainStore.signupThankYouPopupActive
  );
  const loginButtonHandler = () => {
    dispatch(mainStoreSliceActions.setSignupThankYouPopupActive(false));
    dispatch(mainStoreSliceActions.setLoginPopupActive(true));
  };

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

  return (
    <>
      {signupThankYouPopupActive && (
        <div
          className={classes.thankYouDialog}
          id="dialogContainer"
          onClick={closingIconHandler}
          ref={backdropRef}
        >
          <div className={classes.mainContainer} ref={mainContainerRef}>
            <div
              className={classes.closingContainer}
              onClick={closingIconHandler}
            >
              <XMarkIcon className={classes.closingIcon} />
            </div>
            <h6 className={classes.popupTitle}>Thank You!</h6>
            <img src={decor} alt="text-decor" className={classes.textDecor} />
            <p className={classes.textBody}>
              Signup functionality is disabled due to security concerns. Please
              return to the login page to create a temporary user login.
            </p>
            <button
              className={classes.loginButton}
              onClick={loginButtonHandler}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default SignupThankYou;
