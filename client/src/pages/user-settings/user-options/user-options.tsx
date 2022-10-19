import classes from "./user-options.module.scss";
import decorImage from "../../../images/homepage/decor/decor.png";
import { useState } from "react";
import UserInfo from "./option-windows/current-info/user-info";
import ChangeUsername from "./option-windows/change-username/change-username";

import { logoutHandler } from "../../../utilities/login-signup-hooks/api-calls";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import ChangeEmail from "./option-windows/change-email/change-email";
import ResetPassword from "./option-windows/reset-password/reset-password";
import DeletePassword from "./option-windows/delete-account/delete-password";
const UserOptions = () => {
  const [activeButton, setActiveButton] = useState("Current Info");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const buttons = [
    "Current Info",
    "Change Username",
    "Change Email",
    "Reset Password",
    "Delete Account",
    "Logout",
  ];
  const optionsButtonClicked = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLButtonElement;

    if (activeButton !== targetElement.id) {
      setActiveButton(targetElement.id);
    }

    if (activeButton === "Logout") {
      logoutHandler(dispatch, navigate);
    }
  };

  const renderReadyButtons = buttons.map((title, index) => {
    if (activeButton === title) {
      return (
        <button
          className={`${classes.optionsButton} ${classes.activeButton}`}
          key={`${title}-${index}-active-user-option`}
          id={`${title}`}
          onClick={optionsButtonClicked}
        >
          {title}
        </button>
      );
    } else {
      return (
        <button
          className={classes.optionsButton}
          onClick={optionsButtonClicked}
          key={`${title}-${index}-inactive-user-option`}
          id={`${title}`}
        >
          {title}
        </button>
      );
    }
  });

  return (
    <div className={classes.optionsContainer}>
      <div className={classes.optionsMenu}>
        <h6 className={classes.sectionTitle}>Options</h6>
        <img
          className={classes.sectionImage}
          alt="section-img"
          src={decorImage}
        />
        {renderReadyButtons}
      </div>
      <div className={classes.optionsInfoContainer}>
        {activeButton === "Current Info" && <UserInfo />}
        {activeButton === "Change Username" && <ChangeUsername />}
        {activeButton === "Change Email" && <ChangeEmail />}
        {activeButton === "Reset Password" && <ResetPassword />}
        {activeButton === "Delete Account" && <DeletePassword />}
      </div>
    </div>
  );
};
export default UserOptions;
