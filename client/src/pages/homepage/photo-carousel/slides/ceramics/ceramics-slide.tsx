import { useState } from "react";

import classes from "./ceramics-slide.module.scss";

const CeramicsSlide = () => {
  const fallInText = "Live Collection";
  const fadeInText =
    "Add and sell products live, and update product status to all users immediately";
  const [seperatedText, setSeperatedText] = useState<string[]>([]);
  const [initialRender, setIntialRender] = useState(false);
  const [activeAnimationNumber, setActiveAnimationNumber] = useState(0);
  const [renderReadyFallinText, setRenderReadyFallinText] = useState<
    JSX.Element[]
  >([]);

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
            className={classes.fallInTitleText}
            key={`${text} ${index}`}
            id={`${text} ${index}`}
          >
            &nbsp;
          </p>
        );
      }
      return (
        <p
          className={classes.fallInTitleText}
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

        activeElement?.classList.add(classes.fallInTitleTextActive);

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
      <div className={classes.fallInTextContainer}>{renderReadyFallinText}</div>
      <p className={classes.subtitleText} id="subtitleText">
        {fadeInText}
      </p>
      <button className={classes.loginButton} id="loginButton">
        Try Now
      </button>
    </div>
  );
};

export default CeramicsSlide;
