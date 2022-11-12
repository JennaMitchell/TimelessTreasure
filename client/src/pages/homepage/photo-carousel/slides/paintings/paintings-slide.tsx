import { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "./paintings-slide.module.scss";
import { getTagDataHandler } from "../../../../../utilities/product-react-hooks/product-react-hooks";

import { useAppDispatch } from "../../../../../store/hooks";
const PaintingsSlide = () => {
  const slideInText = "Discover";
  const fadeInText = "Discover something new with a quick search";
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

        activeElement?.classList.add(classes.slideInTitleTextActive);

        setActiveAnimationNumber(tempActiveNumber);
      }, 150);
    }

    if (activeAnimationNumber === seperatedText.length + 1) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(
          `paintings-slideshow-fade-in-text`
        );
        activeElement?.classList.add(classes.subtitleTextActive);
        setActiveAnimationNumber(tempActiveNumber);
      }, 1000);
    }

    if (activeAnimationNumber === seperatedText.length + 2) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(
          `paintings-slideshow-discover-button`
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
      <p className={classes.subtitleText} id="paintings-slideshow-fade-in-text">
        {fadeInText}
      </p>
      <NavLink
        to="/marketplace"
        className={classes.slideshowButton}
        id="paintings-slideshow-discover-button"
        onClick={slideshowButtonHandler}
      >
        Discover
      </NavLink>
    </div>
  );
};

export default PaintingsSlide;
