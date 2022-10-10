import classes from "./login-popup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import decor from "../../../images/homepage/decor/decor.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { mainStoreSliceActions } from "../../../store/store";
import {
  LogoutHandler,
  AutoLogout,
  LoginHandler,
} from "../../../utilities/login-signup-hooks/login-signup-hooks";
import {
  loginPasswordValidator,
  emailValidator,
} from "../../../utilities/validation-hooks/validation-hooks";

const LoginPopup = () => {
  const loginPopupActive = useAppSelector(
    (state) => state.mainStore.loginPopupActive
  );
  const dispatch = useAppDispatch();

  const [emailLabelMoveout, setEmailLabelMoveout] = useState(false);
  const [passwordLabelMoveout, setPasswordLabelMoveout] = useState(false);

  const [emailInputData, setEmailInputData] = useState("");
  const [passwordInputData, setPasswordInputData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
      // if we don't ahve a token the user isn't logged in and or the expiry date is null
    }
    if (new Date(expiryDate) <= new Date()) {
      //
      LogoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId") || "";
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    dispatch(mainStoreSliceActions.setUserAuthenticated(true));
    dispatch(mainStoreSliceActions.setUserToken(token));
    dispatch(mainStoreSliceActions.setUserId(userId));

    AutoLogout(remainingMilliseconds);
  }, [dispatch]);

  const signupButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLoginPopupActive(false));
    dispatch(mainStoreSliceActions.setSignupPopupActive(true));
  };

  const dialogBackdropClickHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.id === "dialogContainer") {
      dispatch(mainStoreSliceActions.setLockViewPort(false));
      dispatch(mainStoreSliceActions.setLoginPopupActive(false));
    }
  };

  const emailInputChangeHandler = (e: React.ChangeEvent) => {
    if (!emailLabelMoveout) {
      setEmailLabelMoveout(true);
    }
    const targetElement = e.target as HTMLInputElement;
    setEmailInputData(targetElement.value);
  };

  const passwordInputChangeHandler = (e: React.ChangeEvent) => {
    if (!passwordLabelMoveout && passwordInputData.length === 0) {
      setPasswordLabelMoveout(true);
    }
    const targetElement = e.target as HTMLInputElement;

    setPasswordInputData(targetElement.value);
  };

  const passwordInputFocusHandler = () => {
    if (passwordInputData.length === 0) {
      setPasswordLabelMoveout(!passwordLabelMoveout);
    }
  };
  const emailInputFocusHandler = () => {
    if (emailInputData.length === 0) {
      setEmailLabelMoveout(!emailLabelMoveout);
    }
  };

  const emailInputBlurHandler = () => {
    if (emailInputData.length === 0) {
      setEmailLabelMoveout(false);
    }
  };
  const emailLabelClickHandler = () => {
    document.getElementById("emailLoginInput")?.focus();
    setEmailLabelMoveout(!emailLabelMoveout);
  };

  const passwordInputBlurHandler = () => {
    if (passwordInputData.length === 0) {
      setPasswordLabelMoveout(false);
    }
  };
  const passwordLabelClickHandler = () => {
    document.getElementById("passwordLoginInput")?.focus();
    setPasswordLabelMoveout(!emailLabelMoveout);
  };

  const signInButtonHandler = () => {
    const validEmail = emailValidator(emailInputData);
    const validPasswordCheck = loginPasswordValidator(passwordInputData);
    if (!validEmail || !validPasswordCheck) {
      dispatch(
        mainStoreSliceActions.setDropdownMessage("Invalid Login Or Password")
      );
      dispatch(mainStoreSliceActions.setDropdownMessageType("Error"));
    }

    LoginHandler(emailInputData, passwordInputData);
  };

  return (
    <>
      {loginPopupActive && (
        <div
          className={classes.loginDialog}
          id="dialogContainer"
          onClick={dialogBackdropClickHandler}
        >
          <form className={classes.loginForm}>
            <div className={classes.closingContainer}>
              <XMarkIcon className={classes.closingIcon} />
            </div>
            <h6 className={classes.loginTitle}>Login</h6>
            <img src={decor} alt="text-decor" className={classes.textDecor} />
            <div className={classes.inputContainer}>
              <p
                className={`${classes.inputLabel} ${
                  emailLabelMoveout && classes.activeInputLabel
                }`}
                onClick={emailLabelClickHandler}
              >
                Email
              </p>
              <input
                className={classes.loginInput}
                id="emailLoginInput"
                onChange={emailInputChangeHandler}
                onBlur={emailInputBlurHandler}
                onFocus={emailInputFocusHandler}
              />
            </div>
            <div className={classes.inputContainer}>
              <p
                className={`${classes.inputLabel} ${
                  passwordLabelMoveout && classes.activeInputLabel
                }`}
                onClick={passwordLabelClickHandler}
              >
                Password
              </p>
              <input
                className={classes.loginInput}
                id="passwordLoginInput"
                onChange={passwordInputChangeHandler}
                onBlur={passwordInputBlurHandler}
                onFocus={passwordInputFocusHandler}
              />
              <p className={classes.forgotPassword}> Forgot your password? </p>
            </div>

            <button
              className={classes.actionButton}
              onClick={signInButtonHandler}
            >
              Signin
            </button>
            <p className={classes.orText}>- - or - -</p>
            <button
              className={classes.signupButton}
              onClick={signupButtonHandler}
            >
              Signup
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default LoginPopup;
