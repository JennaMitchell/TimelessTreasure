import { useEffect, useState } from "react";
import classes from "./api-call-dropdown.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { mainStoreSliceActions } from "../../store/store";

const ApiCallDropdown = () => {
  const apiCallMessageType = useAppSelector(
    (state) => state.mainStore.apiCallMessageType
  );
  const apiCallMessage = useAppSelector(
    (state) => state.mainStore.apiCallMessage
  );
  const apiCallDropdownActive = useAppSelector(
    (state) => state.mainStore.apiCallDropdownActive
  );
  const apiCallDropDownMove = useAppSelector(
    (state) => state.mainStore.apiCallDropDownMove
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      !apiCallDropdownActive &&
      apiCallMessageType.length !== 0 &&
      apiCallMessage.length !== 0
    ) {
      dispatch(mainStoreSliceActions.setApiCallDropdownActive(true));
      dispatch(mainStoreSliceActions.setApiCallDropDownMove(true));
    }
  }, [apiCallMessage, apiCallMessageType, apiCallDropdownActive]);

  const closeIconHandler = () => {
    dispatch(mainStoreSliceActions.setApiCallDropDownMove(false));
    setTimeout(() => {
      dispatch(mainStoreSliceActions.setAPICallMessage(""));
      dispatch(mainStoreSliceActions.setAPICallMessageType(""));
      dispatch(mainStoreSliceActions.setApiCallDropdownActive(false));
    }, 1000);
  };

  return (
    <div
      className={`${classes.messageContainer} ${
        apiCallMessageType === "ERROR" && classes.errorMessageContainer
      }  ${
        apiCallMessageType === "SUCCESS" && classes.successMessageContainer
      } ${apiCallDropDownMove ? classes.moveDropDown : classes.moveDropUp}`}
    >
      <div className={classes.messageTextContainer}>
        <p className={`${classes.message}`}>{apiCallMessageType}</p>
        <p className={`${classes.message}`}>-</p>

        <p className={`${classes.message}`}>{apiCallMessage}</p>
      </div>
      <XMarkIcon className={classes.closingIcon} onClick={closeIconHandler} />
    </div>
  );
};
export default ApiCallDropdown;
