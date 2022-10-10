import classes from "./photo-carousel.module.scss";

import CeramicsSlide from "./slides/ceramics/ceramics-slide";
import ClocksSlide from "./slides/clocks/clocks-slide";
import TablewearSlide from "./slides/tablewear/tablewear-slide";
import PaintingsSlide from "./slides/paintings/paintings-slide";
import ElectronicsSlide from "./slides/electronics/electronics-slide";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
const PhotoCarousel = () => {
  const [activeSlideNumber, setActiveSlideNumber] = useState(0);

  const leftButtonHandler = () => {
    if (activeSlideNumber === 0) {
      setActiveSlideNumber(4);
    } else {
      const tempActiveNumber = activeSlideNumber;
      setActiveSlideNumber(tempActiveNumber - 1);
    }
  };

  const rightButtonHandler = () => {
    if (activeSlideNumber === 4) {
      setActiveSlideNumber(0);
    } else {
      const tempActiveNumber = activeSlideNumber;
      setActiveSlideNumber(tempActiveNumber + 1);
    }
  };

  return (
    <div className={classes.topContainer}>
      <button
        className={`${classes.arrowButton} ${classes.leftArrowButton}`}
        onClick={leftButtonHandler}
      >
        <ArrowLeftIcon />
      </button>
      <button
        className={`${classes.arrowButton} ${classes.rightArrowButton}`}
        onClick={rightButtonHandler}
      >
        <ArrowRightIcon />
      </button>
      {activeSlideNumber === 0 && <CeramicsSlide />}
      {activeSlideNumber === 1 && <ClocksSlide />}
      {activeSlideNumber === 2 && <TablewearSlide />}
      {activeSlideNumber === 3 && <PaintingsSlide />}
      {activeSlideNumber === 4 && <ElectronicsSlide />}
    </div>
  );
};

export default PhotoCarousel;
