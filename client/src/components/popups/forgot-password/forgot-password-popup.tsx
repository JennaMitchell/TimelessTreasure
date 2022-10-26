import classes from "./forgot-password-popup.module.scss";
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
import { NavLink } from "react-router-dom";

interface LogicObject {
  [key: string]: {
    labelMoveout: boolean;
    inputData: "";
  };
}
const ForgotPasswordPopup = () => {
  const forgotPasswordPopupActive = useAppSelector(
    (state) => state.mainStore.forgotPasswordPopupActive
  );
  const dispatch = useAppDispatch();
  const [initialRender, setInitialRender] = useState(false);
  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
    forgotPasswordEmailInput: {
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
    if (!initialRender && forgotPasswordPopupActive) {
      setInitialRender(true);
    }
  }, [forgotPasswordPopupActive, initialRender]);

  const [
    passwordRequirementsDropdownActive,
    setPasswordRequirementsDropdownActive,
  ] = useState(false);

  const submitButtonHandler = () => {
    dispatch(mainStoreSliceActions.setForgotPasswordPopupActive(false));
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
      inputLogicObject.forgotPasswordEmailInput.inputData
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
        inputLogicObject.forgotPasswordEmailInput.inputData
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
        email: inputLogicObject.forgotPasswordEmailInput.inputData,
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
