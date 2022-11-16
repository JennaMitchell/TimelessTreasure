import classes from "./user-settings-page.module.scss";
import decorImage from "../../images/homepage/decor/decor.png";

import UserOptions from "./user-options/user-options";

const UserSettingsPage = () => {
  return (
    <>
      <div className={classes.banner}>User Info</div>
      <div className={classes.userInfoTopContainer}>
        <div className={classes.userInfoContentContainer}>
          <h6 className={classes.sectionTitle}>User Settings</h6>
          <img
            className={classes.sectionImage}
            alt="section-img"
            src={decorImage}
          />
          <UserOptions />
        </div>
      </div>
    </>
  );
};
export default UserSettingsPage;
