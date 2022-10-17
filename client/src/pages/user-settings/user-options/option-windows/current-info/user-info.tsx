import classes from "./user-info.module.scss";
import decorImage from "../../../../../images/homepage/decor/decor.png";
import { useAppSelector } from "../../../../../store/hooks";
const UserInfo = () => {
  const userEmail = useAppSelector((state) => state.userStore.userEmail);
  const username = useAppSelector((state) => state.userStore.username);

  return (
    <>
      <h6 className={classes.sectionTitle}>Current Info</h6>
      <img
        className={classes.sectionImage}
        alt="section-img"
        src={decorImage}
      />
      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Email:&nbsp; </p>
        <p className={classes.infoText}>{userEmail}</p>
      </div>
      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Username:&nbsp; </p>
        <p className={classes.infoText}>{username}</p>
      </div>
      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Type:&nbsp; </p>
        <p className={classes.infoText}>Seller</p>
      </div>

      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Last Order:&nbsp; </p>
        <p className={classes.infoText}>Feb 22nd 2022</p>
      </div>
      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Total Sales:&nbsp; </p>
        <p className={classes.infoText}>0</p>
      </div>
      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Total Orders:&nbsp;</p>
        <p className={classes.infoText}>2</p>
      </div>
    </>
  );
};
export default UserInfo;
