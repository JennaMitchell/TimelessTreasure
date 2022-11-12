import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../../../store/hooks";

import classes from "./electronics-slide.module.scss";
import { getTagDataHandler } from "../../../../../utilities/product-react-hooks/product-react-hooks";

const ElectronicsSlide = () => {
  const slideInText = "Recapture the Past";
  const fadeInText = "Find lost treasures from the past";
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
      }, 100);
    }

    if (activeAnimationNumber === seperatedText.length + 1) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(
          `electronics-slideshow-fade-in-text`
        );
        activeElement?.classList.add(classes.subtitleTextActive);
        setActiveAnimationNumber(tempActiveNumber);
      }, 1000);
    }

    if (activeAnimationNumber === seperatedText.length + 2) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(
          `slideshow-electronics-search-button`
        );
        activeElement?.classList.add(classes.slideshowButtonActive);
        setActiveAnimationNumber(tempActiveNumber);
      }, 1000);
    }
  }

  const slideshowButtonHandler = () => {
    getTagDataHandler(dispatch, "");
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.backdropFilter} />
      <div className={classes.slideInTextContainer}>
        {renderReadyslideInText}
      </div>
      <p
        className={classes.subtitleText}
        id="electronics-slideshow-fade-in-text"
      >
        {fadeInText}
      </p>
      <NavLink
        to="/marketplace"
        className={classes.slideshowButton}
        id="slideshow-electronics-search-button"
        onClick={slideshowButtonHandler}
      >
        Search
      </NavLink>
    </div>
  );
};

export default ElectronicsSlide;
