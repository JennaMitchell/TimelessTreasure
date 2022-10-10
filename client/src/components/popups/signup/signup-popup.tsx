import classes from "./signup-popup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import decor from "../../../images/homepage/decor/decor.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { mainStoreSliceActions } from "../../../store/store";
import {
  emailValidator,
  signupPasswordValidator,
} from "../../../utilities/validation-hooks/validation-hooks";
import { SignupHandler } from "../../../utilities/login-signup-hooks/login-signup-hooks";
import SignupRequirements from "./signup-requirements/signup-requirements";
const SignupPopup = () => {
  const signupPopupActive = useAppSelector(
    (state) => state.mainStore.signupPopupActive
  );
  const dispatch = useAppDispatch();

  const [
    passwordRequirementsDropdownActive,
    setPasswordRequirementsDropdownActive,
  ] = useState(false);

  const [emailLabelMoveout, setEmailLabelMoveout] = useState(false);
  const [passwordLabelMoveout, setPasswordLabelMoveout] = useState(false);
  const [
    confirmationPasswordLabelMoveout,
    setConfirmationPasswordLabelMoveout,
  ] = useState(false);

  const [emailInputData, setEmailInputData] = useState("");
  const [passwordInputData, setPasswordInputData] = useState("");
  const [confirmationPasswordInputData, setConfirmationPasswordInputData] =
    useState("");

  const signinButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLoginPopupActive(true));
    dispatch(mainStoreSliceActions.setSignupPopupActive(false));
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
  const confirmationPasswordInputChangeHandler = (e: React.ChangeEvent) => {
    if (
      !confirmationPasswordLabelMoveout &&
      confirmationPasswordInputData.length === 0
    ) {
      setConfirmationPasswordLabelMoveout(true);
    }
    const targetElement = e.target as HTMLInputElement;

    setConfirmationPasswordInputData(targetElement.value);
  };

  const emailInputFocusHandler = () => {
    if (emailInputData.length === 0) {
      setEmailLabelMoveout(!emailLabelMoveout);
    }
  };
  const passwordInputFocusHandler = () => {
    if (passwordInputData.length === 0) {
      setPasswordLabelMoveout(!passwordLabelMoveout);
    }
    if (!passwordRequirementsDropdownActive) {
      setPasswordRequirementsDropdownActive(true);
    }
  };
  const confirmationPasswordInputFocusHandler = () => {
    if (confirmationPasswordInputData.length === 0) {
      setConfirmationPasswordLabelMoveout(!confirmationPasswordLabelMoveout);
    }
    if (!passwordRequirementsDropdownActive) {
      setPasswordRequirementsDropdownActive(true);
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
    if (
      passwordInputData.length === 0 &&
      confirmationPasswordInputData.length === 0
    ) {
      setPasswordRequirementsDropdownActive(false);
    }
  };
  const passwordLabelClickHandler = () => {
    document.getElementById("passwordLoginInput")?.focus();
    setPasswordLabelMoveout(!emailLabelMoveout);
  };

  const confirmationPasswordInputBlurHandler = () => {
    if (confirmationPasswordInputData.length === 0) {
      setConfirmationPasswordLabelMoveout(false);
    }
    if (
      passwordInputData.length === 0 &&
      confirmationPasswordInputData.length === 0
    ) {
      setPasswordRequirementsDropdownActive(false);
    }
  };
  const confirmationPasswordLabelClickHandler = () => {
    document.getElementById("confirmationPasswordLoginInput")?.focus();
    setConfirmationPasswordLabelMoveout(!confirmationPasswordLabelMoveout);
  };

  // const passwordValidation = () => {
  //   signupPasswordValidator(passwordInputData, confirmationPasswordInputData);
  //   return
  // };

  const signupButtonHandler = () => {
    const validEmail = emailValidator(emailInputData);
    const validPasswordObject = signupPasswordValidator(
      passwordInputData,
      confirmationPasswordInputData
    );

    const validPassword = !Object.values(validPasswordObject).includes(false);

    if (!validEmail || !validPassword) {
      dispatch(
        mainStoreSliceActions.setDropdownMessage("Invalid Login Or Password")
      );
      dispatch(mainStoreSliceActions.setDropdownMessageType("Error"));
      return;
    }
    SignupHandler(emailInputData, passwordInputData);
  };

  return (
    <>
      {signupPopupActive && (
        <div
          className={classes.loginDialog}
          id="dialogContainer"
          onClick={dialogBackdropClickHandler}
        >
          <form className={classes.loginForm}>
            <div className={classes.closingContainer}>
              <XMarkIcon className={classes.closingIcon} />
            </div>
            <h6 className={classes.loginTitle}>Signup</h6>

            <img src={decor} alt="text-decor" className={classes.textDecor} />
            {passwordRequirementsDropdownActive && (
              <SignupRequirements
                password={passwordInputData}
                confirmationPassword={confirmationPasswordInputData}
              />
            )}
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
                type="password"
              />
            </div>
            <div className={classes.inputContainer}>
              <p
                className={`${classes.inputLabel} ${
                  confirmationPasswordLabelMoveout && classes.activeInputLabel
                }`}
                onClick={confirmationPasswordLabelClickHandler}
              >
                Confirm Password
              </p>
              <input
                className={classes.loginInput}
                id="confirmationPasswordLoginInput"
                onChange={confirmationPasswordInputChangeHandler}
                onBlur={confirmationPasswordInputBlurHandler}
                onFocus={confirmationPasswordInputFocusHandler}
                type="password"
              />
            </div>

            <button className={classes.actionButton}>Signup</button>
            <p className={classes.orText}>- - or - -</p>
            <button
              className={classes.signupButton}
              onClick={signinButtonHandler}
            >
              Signin
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default SignupPopup;
