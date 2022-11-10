import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import classes from "./signup-thank-you.module.scss";
import { mainStoreSliceActions } from "../../../store/store";
import { XMarkIcon } from "@heroicons/react/24/solid";
import decor from "../../../images/homepage/decor/decor.png";
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

  return (
    <>
      {signupThankYouPopupActive && (
        <div
          className={classes.thankYouDialog}
          id="dialogContainer"
          onClick={closingIconHandler}
        >
          <div className={classes.mainContainer}>
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
              return to the login page to see all the available features.
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
