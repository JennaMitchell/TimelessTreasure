import classes from "./signup-popup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import decor from "../../../images/homepage/decor/decor.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { mainStoreSliceActions } from "../../../store/store";
import {
  emailValidator,
  signupPasswordValidator,
} from "../../../utilities/validation-hooks/validation-hooks";
import Spinner from "../../spinner/spinner";
import { CheckIcon } from "@heroicons/react/24/solid";

import SignupRequirements from "./signup-requirements/signup-requirements";
import { signupCall } from "../../../utilities/login-signup-api-hooks/api-calls.js";

interface LogicObject {
  [key: string]: {
    labelMoveout: boolean;
    inputData: "";
  };
}

const SignupPopup = () => {
  const signupPopupActive = useAppSelector(
    (state) => state.mainStore.signupPopupActive
  );
  const dispatch = useAppDispatch();
  const [signupLoading, setSignupLoading] = useState(false);
  const [initialRender, setInitialRender] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const sellerTypeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSeller(true);
  };
  const buyerTypeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSeller(false);
  };

  useEffect(() => {
    if (!initialRender && signupPopupActive) {
      setInitialRender(true);
    }
  }, [signupPopupActive, initialRender]);

  const apiCallDropdownActive = useAppSelector(
    (state) => state.mainStore.apiCallDropdownActive
  );
  const closingIconHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(false));
    dispatch(mainStoreSliceActions.setSignupPopupActive(false));
    if (apiCallDropdownActive) {
      dispatch(mainStoreSliceActions.setApiCallDropDownMove(false));
      setTimeout(() => {
        dispatch(mainStoreSliceActions.setAPICallMessage(""));
        dispatch(mainStoreSliceActions.setAPICallMessageType(""));
        dispatch(mainStoreSliceActions.setApiCallDropdownActive(false));
      }, 1000);
    }
  };

  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
    emailSignupInput: {
      labelMoveout: false,
      inputData: "",
    },
    passwordSignupInput: {
      labelMoveout: false,
      inputData: "",
    },
    confirmationPasswordSignupInput: {
      labelMoveout: false,
      inputData: "",
    },
    usernameSignupInput: {
      labelMoveout: false,
      inputData: "",
    },
  });

  const [
    passwordRequirementsDropdownActive,
    setPasswordRequirementsDropdownActive,
  ] = useState(false);
  const apiCallMessageType = useAppSelector(
    (state) => state.mainStore.apiCallMessageType
  );

  const signinButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLoginPopupActive(true));
    dispatch(mainStoreSliceActions.setSignupPopupActive(false));
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
      dispatch(mainStoreSliceActions.setLoginPopupActive(false));
    }
  };
  const inputCopyObjectHandler = () =>
    JSON.parse(JSON.stringify(inputLogicObject));

  const inputChangeHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();

    if (!copyOfInputObject[targetElement.id].labelMoveout) {
      copyOfInputObject[targetElement.id].labelMoveout = true;
    }
    copyOfInputObject[targetElement.id].inputData = targetElement.value;
    setInputLogicObject(copyOfInputObject);
  };
  const inputFocusHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();
    if (copyOfInputObject[targetElement.id].inputData.length === 0) {
      copyOfInputObject[targetElement.id].labelMoveout =
        !copyOfInputObject[targetElement.id].labelMoveout;
      setInputLogicObject(copyOfInputObject);
    }
    if (
      targetElement.id === "passwordSignupInput" ||
      targetElement.id === "confirmationPasswordSignupInput"
    ) {
      if (!passwordRequirementsDropdownActive) {
        setPasswordRequirementsDropdownActive(true);
      }
    }
  };
  const inputBlurHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();
    if (copyOfInputObject[targetElement.id].inputData.length === 0) {
      copyOfInputObject[targetElement.id].labelMoveout =
        !copyOfInputObject[targetElement.id].labelMoveout;
      setInputLogicObject(copyOfInputObject);
    }
  };

  const inputLabelClickHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLLabelElement;
    const copyOfInputObject = inputCopyObjectHandler();
    document.getElementById(`${targetElement.htmlFor}`)?.focus();
    copyOfInputObject[targetElement.htmlFor].labelMoveout =
      !copyOfInputObject[targetElement.htmlFor].labelMoveout;
    setInputLogicObject(copyOfInputObject);
  };

  const signupButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    const validEmail = !emailValidator(
      inputLogicObject.emailSignupInput.inputData
    );

    const validPasswordObject = signupPasswordValidator(
      inputLogicObject.passwordSignupInput.inputData,
      inputLogicObject.confirmationPasswordSignupInput.inputData
    );

    const validPassword = !Object.values(validPasswordObject).includes(true);

    if (!validEmail || !validPassword) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Invalid Login or Password")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      setSignupLoading(false);
      return;
    } else {
      setSignupLoading(true);
    }

    setTimeout(() => {
      // sign up function
      let promiseData: any = "";
      signupCall(dispatch, {
        email: inputLogicObject.emailSignupInput.inputData.toLowerCase(),
        password: inputLogicObject.passwordSignupInput.inputData,
        username: inputLogicObject.usernameSignupInput.inputData,
        isSeller: isSeller,
      })
        .then((data) => {
          promiseData = data?.json();
          return promiseData;
        })
        .then((jsonData) => {
          if ("error" in jsonData) {
            if (jsonData.error.length !== 0) {
              dispatch(
                mainStoreSliceActions.setAPICallMessage(jsonData.message)
              );
              dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
            }
          } else {
            dispatch(mainStoreSliceActions.setAPICallMessage(jsonData.message));
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
          }
          setSignupLoading(false);
        });
    }, 2000);
  };

  return (
    <>
      {signupPopupActive && (
        <div
          className={classes.signupDialog}
          id="dialogContainer"
          onClick={dialogBackdropClickHandler}
        >
          <form className={classes.signupForm}>
            <div
              className={classes.closingContainer}
              onClick={closingIconHandler}
            >
              <XMarkIcon className={classes.closingIcon} />
            </div>
            <h6 className={classes.loginTitle}>Signup</h6>

            <img src={decor} alt="text-decor" className={classes.textDecor} />
            {passwordRequirementsDropdownActive && (
              <SignupRequirements
                password={inputLogicObject.passwordSignupInput.inputData}
                confirmationPassword={
                  inputLogicObject.confirmationPasswordSignupInput.inputData
                }
              />
            )}
            <div className={classes.inputContainer}>
              <label
                className={`${classes.inputLabel} ${
                  inputLogicObject.usernameSignupInput.labelMoveout &&
                  classes.activeInputLabel
                } ${apiCallMessageType === "ERROR" && classes.errorText}`}
                onClick={inputLabelClickHandler}
                id="usernameSignupLabel"
                htmlFor="usernameSignupInput"
              >
                Username
              </label>
              <input
                className={`${classes.signupInput} ${
                  apiCallMessageType === "ERROR" && classes.inputError
                }`}
                id="usernameSignupInput"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
                maxLength={12}
                type="text"
              />
            </div>
            <div className={classes.inputContainer}>
              <label
                className={`${classes.inputLabel} ${
                  inputLogicObject.emailSignupInput.labelMoveout &&
                  classes.activeInputLabel
                } ${apiCallMessageType === "ERROR" && classes.errorText}`}
                onClick={inputLabelClickHandler}
                id="emailSignupLabel"
                htmlFor="emailSignupInput"
              >
                Email
              </label>
              <input
                className={`${classes.signupInput} ${
                  apiCallMessageType === "ERROR" && classes.inputError
                }`}
                id="emailSignupInput"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
                type="text"
              />
            </div>
            <div className={classes.inputContainer}>
              <label
                className={`${classes.inputLabel} ${
                  inputLogicObject.passwordSignupInput.labelMoveout &&
                  classes.activeInputLabel
                } ${apiCallMessageType === "ERROR" && classes.errorText}`}
                onClick={inputLabelClickHandler}
                id="passwordSignupLabel"
                htmlFor="passwordSignupInput"
              >
                Password
              </label>
              <input
                className={`${classes.signupInput} ${
                  apiCallMessageType === "ERROR" && classes.inputError
                } `}
                id="passwordSignupInput"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
                type="password"
              />
            </div>
            <div className={classes.inputContainer}>
              <label
                className={`${classes.inputLabel} ${
                  inputLogicObject.confirmationPasswordSignupInput
                    .labelMoveout && classes.activeInputLabel
                } ${apiCallMessageType === "ERROR" && classes.errorText}`}
                onClick={inputLabelClickHandler}
                id="confirmationPasswordSignupLabel"
                htmlFor="confirmationPasswordSignupInput"
              >
                Confirm Password
              </label>
              <input
                className={`${classes.signupInput} ${
                  apiCallMessageType === "ERROR" && classes.inputError
                }`}
                id="confirmationPasswordSignupInput"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
                type="password"
              />
            </div>

            <div className={classes.radialOptionsTopContainer}>
              <div className={classes.radialContainer}>
                <button
                  className={classes.sellerRadial}
                  id="seller-checkbox"
                  onClick={sellerTypeHandler}
                >
                  {isSeller && <CheckIcon className={classes.checkIcon} />}
                </button>

                <label
                  htmlFor="seller-checkbox"
                  className={classes.checkboxLabel}
                >
                  Seller
                </label>
              </div>
              <div className={classes.radialContainer}>
                <button
                  className={classes.sellerRadial}
                  id="buyer-checkbox"
                  onClick={buyerTypeHandler}
                >
                  {!isSeller && <CheckIcon className={classes.checkIcon} />}
                </button>
                <label
                  htmlFor="buyer-checkbox"
                  className={classes.checkboxLabel}
                >
                  Buyer
                </label>
              </div>
            </div>

            <button
              className={classes.signupButton}
              onClick={signupButtonHandler}
              id="signupPopupButton"
            >
              {initialRender &&
                (signupLoading ? (
                  <Spinner
                    parentButtonId={"signupPopupButton"}
                    initialRender={initialRender}
                  />
                ) : (
                  "Sign Up"
                ))}
            </button>
            <p className={classes.orText}>- - or - -</p>
            <button
              className={classes.signinButton}
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
