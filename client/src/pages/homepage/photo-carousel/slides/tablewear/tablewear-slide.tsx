import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../../../store/hooks";

import classes from "./tablewear-slide.module.scss";
import { getTagDataHandler } from "../../../../../utilities/product-react-hooks/product-react-hooks";
const TablewearSlide = () => {
  const slideInText = "Large Selection";
  const fadeInText = "Browse a large selection of products";
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

        const activeElement = document.getElementById(
          `tablewear-slideshow-fade-in-text`
        );
        activeElement?.classList.add(classes.subtitleTextActive);
        setActiveAnimationNumber(tempActiveNumber);
      }, 1000);
    }

    if (activeAnimationNumber === seperatedText.length + 2) {
      setTimeout(() => {
        let tempActiveNumber = activeAnimationNumber + 1;

        const activeElement = document.getElementById(
          `tablewear-slideshow-browse-button`
        );
        activeElement?.classList.add(classes.slideShowButtonActive);
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
      <p className={classes.subtitleText} id="tablewear-slideshow-fade-in-text">
        {fadeInText}
      </p>
      <NavLink
        to="/marketplace"
        className={classes.slideShowButton}
        id="tablewear-slideshow-browse-button"
        onClick={slideshowButtonHandler}
      >
        Browse
      </NavLink>
    </div>
  );
};

export default TablewearSlide;
