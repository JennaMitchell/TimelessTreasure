import { useState } from "react";

import classes from "./clocks-slide.module.scss";
import { useAppDispatch } from "../../../../../store/hooks";
import { mainStoreSliceActions } from "../../../../../store/store";
const ClocksSlide = () => {
  const slideInText = "Live Inventory";
  const fadeInText = "Update your stores inventory status whenever";
  const [seperatedText, setSeperatedText] = useState<string[]>([]);
  const [initialRender, setIntialRender] = useState(false);
  const [activeAnimationNumber, setActiveAnimationNumber] = useState(0);
  const [renderReadyslideInText, setRenderReadySlideInText] = useState<
    JSX.Element[]
  >([]);
  const dispatch = useAppDispatch();

  if (!initialRender) {
    const tempSeperatedArray = [];
    for (let i = 0; i < slideInText.length; i++) {
      tempSeperatedArray.push(slideInText[i]);
    }
    setSeperatedText(tempSeperatedArray);

    const tempRenderReadyslideInText = tempSeperatedArray.map((text, index) => {
      if (text === " ") {
        return (
          <p
            className={classes.animationTitleText}
            key={`${text} ${index}`}
            id={`${text} ${index}`}
          >
            &nbsp;
          </p>
        );
      }
      return (
        <p
          className={classes.animationTitleText}
          key={`${text} ${index}`}
          id={`${text} ${index}`}
        >
          {text}
        </p>
      );
    });
    setRenderReadySlideInText(tempRenderReadyslideInText);

    setIntialRender(true);
  }

  if (initialRender) {
    if (activeAnimationNumber <= seperatedText.length) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(
          `${seperatedText[activeAnimationNumber]} ${activeAnimationNumber}`
        );

        activeElement?.classList.add(classes.animationTitleTextActive);

        setActiveAnimationNumber(tempActiveNumber);
      }, 150);
    }

    if (activeAnimationNumber === seperatedText.length + 1) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(
          `clocks-slide-show-fade-in-text`
        );
        activeElement?.classList.add(classes.subtitleTextActive);
        setActiveAnimationNumber(tempActiveNumber);
      }, 1000);
    }

    if (activeAnimationNumber === seperatedText.length + 2) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(
          "clocks-slide-show-login-button"
        );
        activeElement?.classList.add(classes.slideshowButtonActive);
        setActiveAnimationNumber(tempActiveNumber);
      }, 1000);
    }
  }
  const loginButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(true));
    dispatch(mainStoreSliceActions.setLoginPopupActive(true));
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.backdropFilter} />
      <div className={classes.slideInTextContainer}>
        {renderReadyslideInText}
      </div>
      <p className={classes.subtitleText} id="clocks-slide-show-fade-in-text">
        {fadeInText}
      </p>
      <button
        className={classes.slideshowButton}
        id="clocks-slide-show-login-button"
        onClick={loginButtonHandler}
      >
        Login
      </button>
    </div>
  );
};

export default ClocksSlide;
