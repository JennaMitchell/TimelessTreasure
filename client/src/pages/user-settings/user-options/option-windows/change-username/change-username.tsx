import classes from "./change-username.module.scss";
import decorImage from "../../../../../images/homepage/decor/decor.png";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { mainStoreSliceActions } from "../../../../../store/store";
import { updateUsernameCall } from "../../../../../utilities/user-settings-api-hooks/api-calls-user-setting-hooks";
import { userStoreSliceActions } from "../../../../../store/user-store";
import Spinner from "../../../../../components/spinner/spinner";
interface LogicObject {
  [key: string]: {
    labelMoveout: boolean;
    inputData: "";
  };
}
const ChangeUsername = () => {
  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
    newUsernameInput: {
      labelMoveout: false,
      inputData: "",
    },
    confirmNewUsernameInput: {
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
      inputLogicObject.newUsernameInput.inputData !==
      inputLogicObject.confirmNewUsernameInput.inputData
    ) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Non-matching usernames.")
      );
      return;
    }
    if (
      inputLogicObject.newUsernameInput.inputData.length > 8 &&
      inputLogicObject.newUsernameInput.inputData.length > 8
    ) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(mainStoreSliceActions.setAPICallMessage("Username too long."));
      return;
    }
    if (
      inputLogicObject.newUsernameInput.inputData.length === 0 &&
      inputLogicObject.newUsernameInput.inputData.length === 0
    ) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter an username.")
      );
      return;
    }
    setChangeUsernameLoading(true);

    setTimeout(() => {
      updateUsernameCall(
        dispatch,
        {
          username: inputLogicObject.newUsernameInput.inputData,
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
              userStoreSliceActions.setUsername(
                inputLogicObject.newUsernameInput.inputData
              )
            );
            setChangeUsernameLoading(false);
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
      <h6 className={classes.inputTitle}>New Username</h6>
      <div
        className={`${classes.inputContainer} ${
          activeInput === "newUsernameInput" && classes.inputFocused
        }`}
      >
        <label
          htmlFor="newUsernameInput"
          className={`${classes.changeInputLabel} ${
            inputLogicObject.newUsernameInput.labelMoveout && classes.moveLabel
          }`}
          id="newUsernameInputLabel"
          onClick={inputLabelClickHandler}
        >
          New Username
        </label>
        <input
          className={classes.changeInput}
          id="newUsernameInput"
          maxLength={12}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          onFocus={inputFocusHandler}
        />
      </div>
      <h6 className={`${classes.inputTitle} ${classes.inputTitleGap}`}>
        Confirm New Username
      </h6>
      <div
        className={`${classes.inputContainer} ${
          activeInput === "confirmNewUsernameInput" && classes.inputFocused
        }`}
      >
        <label
          htmlFor="confirmNewUsernameInput"
          className={`${classes.changeInputLabel} ${
            inputLogicObject.confirmNewUsernameInput.labelMoveout &&
            classes.moveLabel
          } `}
          id="confirmNewUsernameInputLabel"
          onClick={inputLabelClickHandler}
        >
          Confirm New Username
        </label>
        <input
          className={classes.changeInput}
          id="confirmNewUsernameInput"
          maxLength={12}
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
export default ChangeUsername;
