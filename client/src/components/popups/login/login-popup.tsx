import classes from "./login-popup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import decor from "../../../images/homepage/decor/decor.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { mainStoreSliceActions } from "../../../store/store";
import {
  loginCall,
  logoutHandler,
} from "../../../utilities/login-signup-hooks/api-calls";
import {
  loginPasswordValidator,
  emailValidator,
} from "../../../utilities/validation-hooks/validation-hooks";

import Spinner from "../../spinner/spinner";
import { userStoreSliceActions } from "../../../store/user-store";

interface LogicObject {
  [key: string]: {
    labelMoveout: boolean;
    inputData: "";
  };
}
const LoginPopup = () => {
  const loginPopupActive = useAppSelector(
    (state) => state.mainStore.loginPopupActive
  );
  const dispatch = useAppDispatch();
  const [initialRender, setInitialRender] = useState(false);
  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
    emailLoginInput: {
      labelMoveout: false,
      inputData: "",
    },
    passwordLoginInput: {
      labelMoveout: false,
      inputData: "",
    },
  });
  const [signingInActive, setSigningInActive] = useState(false);

  const apiCallDropdownActive = useAppSelector(
    (state) => state.mainStore.apiCallDropdownActive
  );
  const apiCallMessageType = useAppSelector(
    (state) => state.mainStore.apiCallMessageType
  );

  useEffect(() => {
    if (!initialRender && loginPopupActive) {
      setInitialRender(true);
    }
  }, [loginPopupActive, initialRender]);

  const [
    passwordRequirementsDropdownActive,
    setPasswordRequirementsDropdownActive,
  ] = useState(false);

  const signupButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLoginPopupActive(false));
    dispatch(mainStoreSliceActions.setSignupPopupActive(true));
    if (apiCallDropdownActive) {
      dispatch(mainStoreSliceActions.setApiCallDropDownMove(false));
      setTimeout(() => {
        dispatch(mainStoreSliceActions.setAPICallMessage(""));
        dispatch(mainStoreSliceActions.setAPICallMessageType(""));
        dispatch(mainStoreSliceActions.setApiCallDropdownActive(false));
      }, 1000);
    }
  };

  const closingIconHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(false));
    dispatch(mainStoreSliceActions.setLoginPopupActive(false));
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

  const signInButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const validEmail = !emailValidator(
      inputLogicObject.emailLoginInput.inputData
    );

    const validPasswordObject = loginPasswordValidator(
      inputLogicObject.passwordLoginInput.inputData
    );

    const validPassword = !Object.values(validPasswordObject).includes(true);

    if (!validEmail || !validPassword) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Invalid Login or Password")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      setSigningInActive(false);
      return;
    } else {
      setSigningInActive(true);
    }

    setTimeout(() => {
      const validEmail = emailValidator(
        inputLogicObject.emailLoginInput.inputData
      );
      const validPasswordCheck = loginPasswordValidator(
        inputLogicObject.passwordLoginInput.inputData
      );
      if (!validEmail || !validPasswordCheck) {
        dispatch(
          mainStoreSliceActions.setAPICallMessage("Invalid Login Or Password")
        );
        dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      }

      loginCall(dispatch, {
        email: inputLogicObject.emailLoginInput.inputData,
        password: inputLogicObject.passwordLoginInput.inputData,
      })
        .then((data) => {
          return data?.json();
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
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
              new Date().getTime() + remainingMilliseconds
            );

            setTimeout(() => {
              logoutHandler();
            }, remainingMilliseconds);
            dispatch(
              userStoreSliceActions.setAutoLogoutTime(expiryDate.toString())
            );
            dispatch(mainStoreSliceActions.setAPICallMessage(jsonData.message));
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
            dispatch(userStoreSliceActions.setUsername(jsonData.username));
            dispatch(userStoreSliceActions.setUserEmail(jsonData.email));
            dispatch(userStoreSliceActions.setUserLoggedIn(true));
            dispatch(userStoreSliceActions.setUserToken(jsonData.token));
            dispatch(userStoreSliceActions.setUserId(jsonData.userId));
            dispatch(userStoreSliceActions.setSessionId(jsonData.sessionId));
            localStorage.setItem("token", jsonData.token);
            localStorage.setItem("userId", jsonData.userId);
            localStorage.setItem("expiryDate", expiryDate.toISOString());

            closingIconHandler();
          }
          setSigningInActive(false);
        });
    }, 2000);
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
            <div
              className={classes.closingContainer}
              onClick={closingIconHandler}
            >
              <XMarkIcon className={classes.closingIcon} />
            </div>
            <h6 className={classes.loginTitle}>Login</h6>
            <img src={decor} alt="text-decor" className={classes.textDecor} />
            <div className={classes.inputContainer}>
              <label
                className={`${classes.inputLabel} ${
                  inputLogicObject.emailLoginInput.labelMoveout &&
                  classes.activeInputLabel
                } ${apiCallMessageType === "ERROR" && classes.errorText}`}
                onClick={inputLabelClickHandler}
                htmlFor="emailLoginInput"
              >
                Email
              </label>
              <input
                className={`${classes.loginInput} ${
                  apiCallMessageType === "ERROR" && classes.inputError
                }`}
                id="emailLoginInput"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
              />
            </div>
            <div className={classes.inputContainer}>
              <label
                className={`${classes.inputLabel} ${
                  inputLogicObject.passwordLoginInput.labelMoveout &&
                  classes.activeInputLabel
                } ${apiCallMessageType === "ERROR" && classes.errorText}`}
                onClick={inputLabelClickHandler}
                htmlFor="passwordLoginInput"
              >
                Password
              </label>
              <input
                className={`${classes.loginInput} ${
                  apiCallMessageType === "ERROR" && classes.inputError
                }`}
                id="passwordLoginInput"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
                type="password"
              />
              <p className={classes.forgotPassword}> Forgot your password? </p>
            </div>

            <button
              className={classes.signinButton}
              onClick={signInButtonHandler}
              id="loginSignInButton"
            >
              {initialRender &&
                (signingInActive ? (
                  <Spinner
                    parentButtonId={"loginSignInButton"}
                    initialRender={initialRender}
                  />
                ) : (
                  "Sign In"
                ))}
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
