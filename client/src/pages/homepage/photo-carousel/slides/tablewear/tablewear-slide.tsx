import { useState } from "react";

import classes from "./tablewear-slide.module.scss";

const TablewearSlide = () => {
  const slideInText = "Large Selection";
  const fadeInText = "Browse a large selection of products";
  const [seperatedText, setSeperatedText] = useState<string[]>([]);
  const [initialRender, setIntialRender] = useState(false);
  const [activeAnimationNumber, setActiveAnimationNumber] = useState(0);
  const [renderReadyslideInText, setRenderReadySlideInText] = useState<
    JSX.Element[]
  >([]);

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
            className={classes.slideInTitleText}
            key={`${text} ${index}`}
            id={`${text} ${index}`}
          >
            &nbsp;
          </p>
        );
      }
      return (
        <p
          className={classes.slideInTitleText}
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

        activeElement?.classList.add(classes.slideInTitleTextActive);

        setActiveAnimationNumber(tempActiveNumber);
      }, 150);
    }

    if (activeAnimationNumber === seperatedText.length + 1) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(`subtitleText`);
        activeElement?.classList.add(classes.subtitleTextActive);
        setActiveAnimationNumber(tempActiveNumber);
      }, 1000);
    }

    if (activeAnimationNumber === seperatedText.length + 2) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(`loginButton`);
        activeElement?.classList.add(classes.loginButtonActive);
        setActiveAnimationNumber(tempActiveNumber);
      }, 1000);
    }
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.backdropFilter} />
      <div className={classes.slideInTextContainer}>
        {renderReadyslideInText}
      </div>
      <p className={classes.subtitleText} id="subtitleText">
        {fadeInText}
      </p>
      <button className={classes.loginButton} id="loginButton">
        Browse
      </button>
    </div>
  );
};

export default TablewearSlide;
