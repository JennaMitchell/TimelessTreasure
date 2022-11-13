import classes from "./process-steps.module.scss";
import antiqueTablewear from "../../../images/homepage/photo-carousel/antique-tablewear.jpg";

const ProcessSteps = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.decorPhotoContainer}>
        <img
          src={antiqueTablewear}
          alt="antique tablewear"
          className={classes.decorPhoto}
        />
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.infoStep}>
          <div className={`${classes.stepIcon} ${classes.stepIconOne}`}>
            <p className={classes.stepIconText}>1</p>
          </div>
          <div className={classes.stepTextContainer}>
            <p className={classes.stepText}>Register</p>
            <p className={classes.stepsubText}>
              Register as a seller to start selling today
            </p>
          </div>
        </div>
        <div className={classes.infoStep}>
          <div className={`${classes.stepIcon} ${classes.stepIconTwo}`}>
            <p className={classes.stepIconText}>2</p>
          </div>
          <div className={classes.stepTextContainer}>
            <p className={classes.stepText}>Create a Product</p>
            <p className={classes.stepsubText}>
              Upload a photo of your product and check a few boxs to start
              selling
            </p>
          </div>
        </div>
        <div className={classes.infoStep}>
          <div className={`${classes.stepIcon} ${classes.stepIconThree}`}>
            <p className={classes.stepIconText}>3</p>
          </div>
          <div className={classes.stepTextContainer}>
            <p className={classes.stepText}>Publish</p>
            <p className={classes.stepsubText}>
              Publish and let the customers find you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProcessSteps;
