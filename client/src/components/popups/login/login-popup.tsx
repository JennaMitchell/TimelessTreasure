import classes from "./login-popup.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import decor from "../../../images/homepage/decor/decor.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { mainStoreSliceActions } from "../../../store/store";
import {
  loginCall,
  logoutHandler,
  signupCall,
} from "../../../utilities/login-signup-api-hooks/api-calls";
// import {
//   loginPasswordValidator,
//   emailValidator,
// } from "../../../utilities/validation-hooks/validation-hooks";

import Spinner from "../../spinner/spinner";
import { userStoreSliceActions } from "../../../store/user-store";
import {
  clearUserStateData,
  clearActivePopups,
} from "../../../utilities/refresh-hooks/refresh-hooks";
import { useNavigate } from "react-router-dom";
import { sellerStoreActions } from "../../../store/seller";
import { CheckIcon } from "@heroicons/react/24/solid";
import {
  tempEmailGenerator,
  randomKeyGenerator,
} from "../../../utilities/generic-hooks/generic-hooks";
import { deleteAccountCall } from "../../../utilities/user-settings-api-hooks/api-calls-user-setting-hooks";

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
  const [isSeller, setIsSeller] = useState(false);
  const [tempEmail, setTempEmail] = useState<string>("");
  const [tempPassword, setTempPassword] = useState<string>("");
  const [tempUsername, setTempUsername] = useState("");
  const userToken = useAppSelector((state) => state.userStore.userToken);
  const userId = useAppSelector((state) => state.userStore.userId);

  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
    emailLoginInput: {
      labelMoveout: true,
      inputData: "",
    },
    passwordLoginInput: {
      labelMoveout: true,
      inputData: "",
    },
  });
  const [signingInActive, setSigningInActive] = useState(false);
  const navigate = useNavigate();

  const apiCallDropdownActive = useAppSelector(
    (state) => state.mainStore.apiCallDropdownActive
  );
  const apiCallMessageType = useAppSelector(
    (state) => state.mainStore.apiCallMessageType
  );

  const generateFakeUser = (isSellerBoolean: boolean) => {
    const randomEmail = tempEmailGenerator(isSellerBoolean);
    const randomPassword = randomKeyGenerator(20);
    setTempEmail(randomEmail);
    setTempPassword(randomPassword);
    setTempUsername(randomEmail);
  };

  useEffect(() => {
    const randomEmail = tempEmailGenerator(false);
    const randomPassword = randomKeyGenerator(20);
    const randomUsername = randomKeyGenerator(10);
    setTempEmail(randomEmail);
    setTempPassword(randomPassword);
    setTempUsername(randomUsername);
  }, []);

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
    // const validEmail = !emailValidator(
    //   inputLogicObject.emailLoginInput.inputData
    // );

    // const validPasswordObject = loginPasswordValidator(
    //   inputLogicObject.passwordLoginInput.inputData
    // );

    // const validPassword = !Object.values(validPasswordObject).includes(true);

    // if (!validEmail || !validPassword) {
    //   console.log(validEmail);
    //   console.log(validPassword)
    //   dispatch(
    //     mainStoreSliceActions.setAPICallMessage("Invalid Login or Password")
    //   );
    //   dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
    //   setSigningInActive(false);
    //   return;
    // } else {
    //   setSigningInActive(true);
    // }
    setSigningInActive(true);
    setTimeout(() => {
      signupCall(dispatch, {
        email: tempEmail.toLowerCase(),
        password: tempPassword,
        username: tempUsername,
        isSeller: isSeller,
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
            dispatch(mainStoreSliceActions.setAPICallMessage(jsonData.message));
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
          }
        })
        .then(() => {
          return loginCall(dispatch, {
            email: tempEmail.toLowerCase(),
            password: tempPassword,
          });
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
              clearUserStateData(dispatch);
              clearActivePopups(dispatch);
              logoutHandler(dispatch, navigate);
              deleteAccountCall(
                dispatch,
                {
                  password: tempPassword,
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
                      dispatch(
                        mainStoreSliceActions.setAPICallMessage(
                          jsonData.message
                        )
                      );
                      dispatch(
                        mainStoreSliceActions.setAPICallMessageType("ERROR")
                      );
                    }
                  } else {
                    dispatch(
                      mainStoreSliceActions.setAPICallMessage(jsonData.message)
                    );
                    dispatch(
                      mainStoreSliceActions.setAPICallMessageType("SUCCESS")
                    );
                    dispatch(userStoreSliceActions.setUsername(""));
                    dispatch(userStoreSliceActions.setUserEmail(""));
                    dispatch(userStoreSliceActions.setUserLoggedIn(false));
                    dispatch(userStoreSliceActions.setUserToken(""));
                    dispatch(userStoreSliceActions.setUserId(""));
                    dispatch(userStoreSliceActions.setSessionId(""));

                    navigate("/");
                  }
                });
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
            dispatch(sellerStoreActions.setIsSeller(jsonData.isSeller));
            localStorage.setItem("token", jsonData.token);
            localStorage.setItem("userId", jsonData.userId);
            localStorage.setItem("expiryDate", expiryDate.toISOString());

            closingIconHandler();
          }
          setSigningInActive(false);
        });
    }, 2000);
  };

  const forgotPasswordHandler = () => {
    dispatch(mainStoreSliceActions.setLoginPopupActive(false));
    dispatch(mainStoreSliceActions.setForgotPasswordPopupActive(true));
  };
  const sellerTypeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSeller(true);
    generateFakeUser(true);
  };
  const buyerTypeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSeller(false);
    generateFakeUser(false);
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
                value={tempEmail}
                disabled
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
                value={tempPassword}
                disabled
              />
              <p
                className={classes.forgotPassword}
                onClick={forgotPasswordHandler}
              >
                Forgot your password?
              </p>
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
