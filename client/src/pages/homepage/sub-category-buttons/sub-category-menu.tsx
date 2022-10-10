import classes from "./sub-category-menu.module.scss";
import antiqueVase from "../../../images/homepage/photo-carousel/antique-vase.jpg";
import antiqueClock from "../../../images/homepage/photo-carousel/antique-clock.jpg";
import antiquePainting from "../../../images/homepage/photo-carousel/antique-painting.jpg";
import antiqueTablewear from "../../../images/homepage/photo-carousel/antique-tablewear.jpg";
import { useState } from "react";
const SubCategoryMenu = () => {
  const [buttonHover, setButtonHover] = useState("");
  const buttonMouseEnterHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLDivElement;
    const elementId = targetElement.id;
    setButtonHover(elementId);
  };

  const buttonMouseLeaveHandler = () => {
    setButtonHover("");
  };

  const buttonTextEnterHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLDivElement;

    const elementId = targetElement.id;
    const splitElementId = elementId.split("-");

    setButtonHover(splitElementId[0]);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.subCategoryButton}>
        <img
          className={`${classes.buttonImage} ${
            buttonHover === "ceramics" && classes.activeButtonHover
          }`}
          src={antiqueVase}
          alt="ceramics"
        />
        <div
          className={classes.blurBackground}
          id="ceramics"
          onMouseEnter={buttonMouseEnterHandler}
          onMouseLeave={buttonMouseLeaveHandler}
        />
        <h6
          className={`${classes.categoryTitle} ${
            buttonHover === "ceramics" && classes.activeText
          }`}
          onMouseEnter={buttonTextEnterHandler}
          id="ceramics-title-text"
        >
          Ceramics
        </h6>
        <p
          className={`${classes.categorySubText} ${
            buttonHover === "ceramics" && classes.activeText
          }`}
          onMouseEnter={buttonTextEnterHandler}
          id="ceramics-button-subtext"
        >
          Find a new family hierloom for yourself and generations after
        </p>
        <button
          className={`${classes.actionButton} ${
            buttonHover === "ceramics" && classes.activeActionButton
          }`}
          id="ceramics-button"
          onMouseEnter={buttonTextEnterHandler}
        >
          Discover
        </button>
      </div>
      <div className={classes.subCategoryButton}>
        <img
          className={`${classes.buttonImage} ${
            buttonHover === "antiqueClock" && classes.activeButtonHover
          }`}
          src={antiqueClock}
          alt="antique clock"
        />
        <div
          className={classes.blurBackground}
          id="antiqueClock"
          onMouseEnter={buttonMouseEnterHandler}
          onMouseLeave={buttonMouseLeaveHandler}
        />
        <h6
          className={`${classes.categoryTitle} ${
            buttonHover === "antiqueClock" && classes.activeText
          }`}
          id="antiqueClock-title"
          onMouseEnter={buttonTextEnterHandler}
        >
          Clocks
        </h6>
        <p
          className={`${classes.categorySubText} ${
            buttonHover === "antiqueClock" && classes.activeText
          }`}
          id="antiqueClock-sub-title"
          onMouseEnter={buttonTextEnterHandler}
        >
          Keep yourself and your family on time with a new clock
        </p>
        <button
          className={`${classes.actionButton} ${
            buttonHover === "antiqueClock" && classes.activeActionButton
          }`}
          id="antiqueClock-button"
          onMouseEnter={buttonTextEnterHandler}
        >
          Show Now
        </button>
      </div>
      <div className={classes.subCategoryButton}>
        <img
          className={`${classes.buttonImage} ${
            buttonHover === "antiqueTablewear" && classes.activeButtonHover
          }`}
          src={antiqueTablewear}
          alt="antique tablewear"
        />
        <div
          className={classes.blurBackground}
          id="antiqueTablewear"
          onMouseEnter={buttonMouseEnterHandler}
          onMouseLeave={buttonMouseLeaveHandler}
        />
        <h6
          className={`${classes.categoryTitle} ${
            buttonHover === "antiqueTablewear" && classes.activeText
          }`}
          id="antiqueTablewear-title"
          onMouseEnter={buttonTextEnterHandler}
        >
          Tablewear
        </h6>
        <p
          className={`${classes.categorySubText} ${
            buttonHover === "antiqueTablewear" && classes.activeText
          }`}
          id="antiqueTablewear-subtext"
          onMouseEnter={buttonTextEnterHandler}
        >
          Share a new dining exprience with friends and loved ones today
        </p>
        <button
          className={`${classes.actionButton} ${
            buttonHover === "antiqueTablewear" && classes.activeActionButton
          }`}
          id="antiqueTablewear-shop-now-button"
          onMouseEnter={buttonTextEnterHandler}
        >
          Shop Now
        </button>
      </div>
      <div className={classes.subCategoryButton}>
        <img
          className={`${classes.buttonImage} ${
            buttonHover === "antiquePainting" && classes.activeButtonHover
          }`}
          src={antiquePainting}
          alt="antique painting"
        />

        <div
          className={classes.blurBackground}
          id="antiquePainting"
          onMouseEnter={buttonMouseEnterHandler}
          onMouseLeave={buttonMouseLeaveHandler}
        />
        <h6
          className={`${classes.categoryTitle} ${
            buttonHover === "antiquePainting" && classes.activeText
          }`}
          id="antiquePainting-title"
          onMouseEnter={buttonTextEnterHandler}
        >
          Paintings
        </h6>
        <p
          className={`${classes.categorySubText} ${
            buttonHover === "antiquePainting" && classes.activeText
          }`}
          id="antiquePainting-subtitle"
          onMouseEnter={buttonTextEnterHandler}
        >
          Discover new acclaimed paintings and find timeless classics
        </p>
        <button
          className={`${classes.actionButton} ${
            buttonHover === "antiquePainting" && classes.activeActionButton
          }`}
          id="antiquePainting-button"
          onMouseEnter={buttonTextEnterHandler}
        >
          Discover
        </button>
      </div>
    </div>
  );
};
export default SubCategoryMenu;
