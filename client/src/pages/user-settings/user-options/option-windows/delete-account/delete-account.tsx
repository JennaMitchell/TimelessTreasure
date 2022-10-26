import classes from "./delete-account.module.scss";
import decorImage from "../../../../../images/homepage/decor/decor.png";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { mainStoreSliceActions } from "../../../../../store/store";
import { deleteAccountCall } from "../../../../../utilities/user-settings-hooks/api-calls-user-setting-hooks";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../../components/spinner/spinner";
import { userStoreSliceActions } from "../../../../../store/user-store";
interface LogicObject {
  [key: string]: {
    labelMoveout: boolean;
    inputData: "";
  };
}
const DeleteAccount = () => {
  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
    deletePasswordInput: {
      labelMoveout: false,
      inputData: "",
    },
  });
  const navigate = useNavigate();

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

    if (inputLogicObject.deletePasswordInput.inputData.length > 100) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(mainStoreSliceActions.setAPICallMessage("Password too long."));
      return;
    }
    if (inputLogicObject.deletePasswordInput.inputData.length === 0) {
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a password.")
      );
      return;
    }

    setChangePasswordLoading(true);

    setTimeout(() => {
      deleteAccountCall(
        dispatch,
        {
          password: inputLogicObject.deletePasswordInput.inputData,
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
            dispatch(userStoreSliceActions.setUsername(""));
            dispatch(userStoreSliceActions.setUserEmail(""));
            dispatch(userStoreSliceActions.setUserLoggedIn(false));
            dispatch(userStoreSliceActions.setUserToken(""));
            dispatch(userStoreSliceActions.setUserId(""));
            dispatch(userStoreSliceActions.setSessionId(""));

            setChangePasswordLoading(false);
            navigate("/");
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
      <h6 className={classes.warningTitle}>Warning</h6>
      <p className={classes.warningText}>
        Once your account is deleted it cannot be retrieved.
      </p>
      <p className={`${classes.warningText} ${classes.gap}`}>
        Please enter your password to confirm.
      </p>
      <h6 className={classes.inputTitle}>Password</h6>
      <div
        className={`${classes.inputContainer} ${
          activeInput === "deletePasswordInput" && classes.inputFocused
        }`}
      >
        <label
          htmlFor="deletePasswordInput"
          className={`${classes.changeInputLabel} ${
            inputLogicObject.deletePasswordInput.labelMoveout &&
            classes.moveLabel
          }`}
          id="deletePasswordInputLabel"
          onClick={inputLabelClickHandler}
        >
          Current Password
        </label>
        <input
          className={classes.changeInput}
          id="deletePasswordInput"
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
          "Delete"
        )}
      </button>
    </>
  );
};
export default DeleteAccount;
