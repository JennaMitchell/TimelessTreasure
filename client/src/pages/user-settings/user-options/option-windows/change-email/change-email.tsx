import classes from "./change-email.module.scss";
import decorImage from "../../../../../images/homepage/decor/decor.png";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { mainStoreSliceActions } from "../../../../../store/store";
import { updateEmailCall } from "../../../../../utilities/user-settings-hooks/api-calls-user-setting-hooks";
import { userStoreSliceActions } from "../../../../../store/user-store";
import Spinner from "../../../../../components/spinner/spinner";
import { emailValidator } from "../../../../../utilities/validation-hooks/validation-hooks";
interface LogicObject {
  [key: string]: {
    labelMoveout: boolean;
    inputData: "";
  };
}
const ChangeEmail = () => {
  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
    newEmailInput: {
      labelMoveout: false,
      inputData: "",
    },
    confirmNewEmailInput: {
      labelMoveout: false,
      inputData: "",
    },
  });

  const userId = useAppSelector((state) => state.userStore.userId);
  const token = useAppSelector((state) => state.userStore.userToken);

  const [activeInput, setActiveInput] = useState("");
  const [changeUsernameLoading, setChangeUsernameLoading] = useState(false);
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
      inputLogicObject.newEmailInput.inputData !==
      inputLogicObject.confirmNewEmailInput.inputData
    ) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(mainStoreSliceActions.setAPICallMessage("Non-matching Email."));
      return;
    }
    if (
      inputLogicObject.newEmailInput.inputData.length > 100 &&
      inputLogicObject.newEmailInput.inputData.length > 100
    ) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(mainStoreSliceActions.setAPICallMessage("Email too long."));
      return;
    }
    if (
      inputLogicObject.newEmailInput.inputData.length === 0 &&
      inputLogicObject.newEmailInput.inputData.length === 0
    ) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter an email.")
      );
      return;
    }

    if (emailValidator(inputLogicObject.newEmailInput.inputData)) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("Error"));
      dispatch(mainStoreSliceActions.setAPICallMessage("Invalid Email."));
      return;
    }

    setChangeUsernameLoading(true);

    setTimeout(() => {
      updateEmailCall(
        dispatch,
        {
          email: inputLogicObject.newEmailInput.inputData,
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
            setChangeUsernameLoading(false);
          } else {
            dispatch(mainStoreSliceActions.setAPICallMessage(jsonData.message));
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
            dispatch(
              userStoreSliceActions.setUserEmail(
                inputLogicObject.newEmailInput.inputData
              )
            );
            setChangeUsernameLoading(false);
          }
        });
    }, 2000);
  };
  return (
    <>
      <h6 className={classes.sectionTitle}>Change Email</h6>
      <img
        className={classes.sectionImage}
        alt="section-img"
        src={decorImage}
      />
      <h6 className={classes.inputTitle}>New Email</h6>
      <div
        className={`${classes.inputContainer} ${
          activeInput === "newEmailInput" && classes.inputFocused
        }`}
      >
        <label
          htmlFor="newEmailInput"
          className={`${classes.changeInputLabel} ${
            inputLogicObject.newEmailInput.labelMoveout && classes.moveLabel
          }`}
          id="newEmailInputLabel"
          onClick={inputLabelClickHandler}
        >
          New Email
        </label>
        <input
          className={classes.changeInput}
          id="newEmailInput"
          maxLength={100}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          onFocus={inputFocusHandler}
        />
      </div>
      <h6 className={`${classes.inputTitle} ${classes.inputTitleGap}`}>
        Confirm New Email
      </h6>
      <div
        className={`${classes.inputContainer} ${
          activeInput === "confirmNewEmailInput" && classes.inputFocused
        }`}
      >
        <label
          htmlFor="confirmNewEmailInput"
          className={`${classes.changeInputLabel} ${
            inputLogicObject.confirmNewEmailInput.labelMoveout &&
            classes.moveLabel
          } `}
          id="confirmNewEmailInputLabel"
          onClick={inputLabelClickHandler}
        >
          Confirm New Email
        </label>
        <input
          className={classes.changeInput}
          id="confirmNewEmailInput"
          maxLength={100}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          onFocus={inputFocusHandler}
        />
      </div>
      <button
        className={classes.submitButton}
        onClick={submitButtonHandler}
        id="change-username-submit-button"
      >
        {changeUsernameLoading ? (
          <Spinner
            parentButtonId="change-username-submit-button"
            initialRender={changeUsernameLoading}
          />
        ) : (
          "Submit"
        )}
      </button>
    </>
  );
};
export default ChangeEmail;
