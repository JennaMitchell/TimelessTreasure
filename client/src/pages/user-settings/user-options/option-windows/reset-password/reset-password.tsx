import classes from "./reset-password.module.scss";
import decorImage from "../../../../../images/homepage/decor/decor.png";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { mainStoreSliceActions } from "../../../../../store/store";
import { updatePasswordCall } from "../../../../../utilities/user-settings-api-hooks/api-calls-user-setting-hooks";

import Spinner from "../../../../../components/spinner/spinner";
import { signupPasswordValidator } from "../../../../../utilities/validation-hooks/validation-hooks";
interface LogicObject {
  [key: string]: {
    labelMoveout: boolean;
    inputData: "";
  };
}
const ResetPassword = () => {
  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
    currentPasswordInput: {
      labelMoveout: false,
      inputData: "",
    },
    newPasswordInput: {
      labelMoveout: false,
      inputData: "",
    },
    confirmNewPasswordInput: {
      labelMoveout: false,
      inputData: "",
    },
  });

  const userId = useAppSelector((state) => state.userStore.userId);
  const token = useAppSelector((state) => state.userStore.userToken);

  const [activeInput, setActiveInput] = useState("");
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const dispatch = useAppDispatch();

  const inputCopyObjectHandler = () =>
    JSON.parse(JSON.stringify(inputLogicObject));

  const inputChangeHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();
    setActiveInput(targetElement.id);

    if (!copyOfInputObject[targetElement.id].labelMoveout) {
      copyOfInputObject[targetElement.id].labelMoveout = true;
    }
    copyOfInputObject[targetElement.id].inputData = targetElement.value;
    setInputLogicObject(copyOfInputObject);
  };
  const inputFocusHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();
    setActiveInput(targetElement.id);

    if (copyOfInputObject[targetElement.id].inputData.length === 0) {
      copyOfInputObject[targetElement.id].labelMoveout =
        !copyOfInputObject[targetElement.id].labelMoveout;
      setInputLogicObject(copyOfInputObject);
    }
  };
  const inputBlurHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();
    setActiveInput("");
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
    setActiveInput(targetElement.htmlFor);

    copyOfInputObject[targetElement.htmlFor].labelMoveout =
      !copyOfInputObject[targetElement.htmlFor].labelMoveout;
    setInputLogicObject(copyOfInputObject);
  };

  const submitButtonHandler = () => {
    //Validation
    if (
      inputLogicObject.newPasswordInput.inputData !==
      inputLogicObject.confirmNewPasswordInput.inputData
    ) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Non-matching passwords.")
      );
      return;
    }
    if (
      inputLogicObject.newPasswordInput.inputData.length > 100 &&
      inputLogicObject.confirmNewPasswordInput.inputData.length > 100 &&
      inputLogicObject.currentPasswordInput.inputData.length > 100
    ) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(mainStoreSliceActions.setAPICallMessage("Password too long."));
      return;
    }
    if (
      inputLogicObject.newPasswordInput.inputData.length === 0 &&
      inputLogicObject.confirmNewPasswordInput.inputData.length === 0 &&
      inputLogicObject.currentPasswordInput.inputData.length === 0
    ) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a password.")
      );
      return;
    }
    if (
      inputLogicObject.newPasswordInput.inputData ===
      inputLogicObject.currentPasswordInput.inputData
    ) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a new password")
      );
      return;
    }

    const passwordErrorObject = signupPasswordValidator(
      inputLogicObject.newPasswordInput.inputData,
      inputLogicObject.confirmNewPasswordInput.inputData
    );

    const passwordErrorObjectValues = Object.values(passwordErrorObject);

    if (passwordErrorObjectValues.includes(true)) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a valid password")
      );
      return;
    }

    setChangePasswordLoading(true);

    setTimeout(() => {
      console.log(userId);
      updatePasswordCall(
        dispatch,
        {
          password: inputLogicObject.newPasswordInput.inputData,
          currentPassword: inputLogicObject.currentPasswordInput.inputData,
          userId: userId,
        },
        token
      )
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
            setChangePasswordLoading(false);
          } else {
            dispatch(mainStoreSliceActions.setAPICallMessage(jsonData.message));
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
            setChangePasswordLoading(false);
          }
        });
    }, 2000);
  };
  return (
    <>
      <h6 className={classes.sectionTitle}>Change Username</h6>
      <img
        className={classes.sectionImage}
        alt="section-img"
        src={decorImage}
      />
      <h6 className={classes.inputTitle}>Current Password</h6>
      <div
        className={`${classes.inputContainer} ${
          activeInput === "currentPasswordInput" && classes.inputFocused
        }`}
      >
        <label
          htmlFor="currentPasswordInput"
          className={`${classes.changeInputLabel} ${
            inputLogicObject.currentPasswordInput.labelMoveout &&
            classes.moveLabel
          }`}
          id="currentPasswordInputLabel"
          onClick={inputLabelClickHandler}
        >
          Current Password
        </label>
        <input
          className={classes.changeInput}
          id="currentPasswordInput"
          maxLength={100}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          onFocus={inputFocusHandler}
          type="password"
        />
      </div>
      <h6 className={`${classes.inputTitle} ${classes.inputTitleGap}`}>
        New Password
      </h6>
      <div
        className={`${classes.inputContainer} ${
          activeInput === "newPasswordInput" && classes.inputFocused
        }`}
      >
        <label
          htmlFor="newPasswordInput"
          className={`${classes.changeInputLabel} ${
            inputLogicObject.newPasswordInput.labelMoveout && classes.moveLabel
          } `}
          id="newPasswordInputLabel"
          onClick={inputLabelClickHandler}
        >
          New Password
        </label>
        <input
          className={classes.changeInput}
          id="newPasswordInput"
          maxLength={100}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          onFocus={inputFocusHandler}
          type="password"
        />
      </div>
      <h6 className={`${classes.inputTitle} ${classes.inputTitleGap}`}>
        Confirm New Password
      </h6>
      <div
        className={`${classes.inputContainer} ${
          activeInput === "confirmNewPasswordInput" && classes.inputFocused
        }`}
      >
        <label
          htmlFor="confirmNewPasswordInput"
          className={`${classes.changeInputLabel} ${
            inputLogicObject.confirmNewPasswordInput.labelMoveout &&
            classes.moveLabel
          } `}
          id="confirmNewPasswordInputLabel"
          onClick={inputLabelClickHandler}
        >
          Confirm New Password
        </label>
        <input
          className={classes.changeInput}
          id="confirmNewPasswordInput"
          maxLength={100}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          onFocus={inputFocusHandler}
          type="password"
        />
      </div>
      <button
        className={classes.submitButton}
        onClick={submitButtonHandler}
        id="change-username-submit-button"
      >
        {changePasswordLoading ? (
          <Spinner
            parentButtonId="change-username-submit-button"
            initialRender={changePasswordLoading}
          />
        ) : (
          "Submit"
        )}
      </button>
    </>
  );
};
export default ResetPassword;
