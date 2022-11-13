import { useState } from "react";
import { useAppDispatch } from "../../../../../store/hooks";
import { mainStoreSliceActions } from "../../../../../store/store";

import classes from "./ceramics-slide.module.scss";

const CeramicsSlide = () => {
  const fallInText = "Live Collection";
  const fadeInText =
    "Add and sell products live, and update all users immediately";
  const [seperatedText, setSeperatedText] = useState<string[]>([]);
  const [initialRender, setIntialRender] = useState(false);
  const [activeAnimationNumber, setActiveAnimationNumber] = useState(0);
  const [renderReadyFallinText, setRenderReadyFallinText] = useState<
    JSX.Element[]
  >([]);
  const dispatch = useAppDispatch();

  if (!initialRender) {
    const tempSeperatedArray = [];
    for (let i = 0; i < fallInText.length; i++) {
      tempSeperatedArray.push(fallInText[i]);
    }
    setSeperatedText(tempSeperatedArray);

    const tempRenderReadyFallinText = tempSeperatedArray.map((text, index) => {
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
    setRenderReadyFallinText(tempRenderReadyFallinText);

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
          `slide-show-fade-in-text-ceramics`
        );
        activeElement?.classList.add(classes.subtitleTextActive);
        setActiveAnimationNumber(tempActiveNumber);
      }, 1000);
    }

    if (activeAnimationNumber === seperatedText.length + 2) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(
          `slide-show-try-now-button-ceramics`
        );
        activeElement?.classList.add(classes.slideshowButtonActive);
        setActiveAnimationNumber(tempActiveNumber);
      }, 1000);
    }
  }

  const tryNowButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(true));
    dispatch(mainStoreSliceActions.setLoginPopupActive(true));
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.backdropFilter} />
      <div className={classes.animationTextContainer}>
        {renderReadyFallinText}
      </div>
      <p className={classes.subtitleText} id="slide-show-fade-in-text-ceramics">
        {fadeInText}
      </p>
      <button
        className={classes.slideshowButton}
        id="slide-show-try-now-button-ceramics"
        onClick={tryNowButtonHandler}
      >
        Try Now
      </button>
    </div>
  );
};

export default CeramicsSlide;
