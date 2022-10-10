import { useEffect } from "react";
import classes from "./loading-page.module.scss";
import logo from "../../images/logo/logo.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { mainStoreSliceActions } from "../../store/store";
import { useState } from "react";
const LoadingPage = () => {
  const lockScreen = useAppSelector((state) => state.mainStore.lockViewport);

  const [activeLoadingDot, setActiveLoadingDot] = useState(0);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!lockScreen) {
      dispatch(mainStoreSliceActions.setLockViewPort(true));
    }
  }, [lockScreen, dispatch]);
  if (lockScreen) {
    setTimeout(() => {
      if (activeLoadingDot === 3) {
        for (let i = 0; i <= 3; i++) {
          const dotElementToTrigger = document.getElementById(`dot ${i}`);
          dotElementToTrigger?.classList.remove(classes.activeLoadingDot);
        }

        setActiveLoadingDot(0);
      } else {
        const tempTrackingNumber = activeLoadingDot;
        const dotElementToTrigger = document.getElementById(
          `dot ${tempTrackingNumber}`
        );
        dotElementToTrigger?.classList.add(classes.activeLoadingDot);

        setActiveLoadingDot(tempTrackingNumber + 1);
      }
    }, 2000);
  }

  return (
    <div className={classes.blurBackdrop}>
      <img
        alt="logo"
        src={logo}
        className={`${classes.loadingLogo} ${
          activeLoadingDot === 0 ? classes.activeLogo : classes.inactiveLogo
        }`}
        id="loading-logo"
      />
      <h6 className={classes.titleText}>Timeless Treasures</h6>
      <div className={classes.loadingContainer}>
        <p className={classes.loadingText}>Loading</p>
        <div className={classes.loadingDots}>
          <p className={classes.dot} id={`dot 0`}>
            .
          </p>
          <p className={classes.dot} id={`dot 1`}>
            .
          </p>
          <p className={classes.dot} id={`dot 2`}>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoadingPage;
