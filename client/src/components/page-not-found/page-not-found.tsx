import classes from "./page-not-found.module.scss";
import errorPhoto from "../../images/error-photos/funny-goat.jpg";
import { NavLink } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className={classes.pageNotFoundTopContainer} id="pageNotFoundPage">
      <h6 className={classes.titleText}>Whoops!</h6>

      <div className={classes.errorImageContainer}>
        <img
          className={classes.errorImage}
          src={errorPhoto}
          alt="surprised goat"
        />
      </div>
      <p className={classes.text}>We can't find your page.</p>
      <NavLink className={classes.homeButton} to="/home">
        Go to Home Page
      </NavLink>
    </div>
  );
};
export default PageNotFound;
