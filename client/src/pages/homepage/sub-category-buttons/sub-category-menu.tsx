import classes from "./sub-category-menu.module.scss";
import antiqueVase from "../../../images/homepage/photo-carousel/antique-vase.jpg";
import antiqueClock from "../../../images/homepage/photo-carousel/antique-clock.jpg";
import antiquePainting from "../../../images/homepage/photo-carousel/antique-painting.jpg";
import antiqueTablewear from "../../../images/homepage/photo-carousel/antique-tablewear.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { getTagDataHandler } from "../../../utilities/product-react-hooks/product-react-hooks";
const SubCategoryMenu = () => {
  const [buttonHover, setButtonHover] = useState("");
  const buttonMouseEnterHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLDivElement;
    const elementId = targetElement.id;
    setButtonHover(elementId);
  };
  const dispatch = useAppDispatch();

  const buttonMouseLeaveHandler = () => {
    setButtonHover("");
  };

  const buttonTextEnterHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLDivElement;

    const elementId = targetElement.id;
    const splitElementId = elementId.split("-");

    setButtonHover(splitElementId[0]);
  };

  const navigate = useNavigate();
  const subCategoryButtonHandler = (e: React.MouseEvent) => {
    const clickedElement = e.target as HTMLDivElement;
    const clickedId = clickedElement.id;
    const indexOfFirstDash = clickedId.indexOf("-");
    const categoryClicked = clickedId.slice(0, indexOfFirstDash);
    getTagDataHandler(dispatch, [categoryClicked]);
    navigate("/marketplace");
  };

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.subCategoryButton}
        onClick={subCategoryButtonHandler}
        id={"Ceramics-sub-cat-button"}
      >
        <img
          className={`${classes.buttonImage} ${
            buttonHover === "ceramics" && classes.activeButtonHover
          }`}
          src={antiqueVase}
          alt="ceramics"
        />
        <div
          className={classes.blurBackground}
          id="Ceramics-blur-background-sub-cat"
          onMouseEnter={buttonMouseEnterHandler}
          onMouseLeave={buttonMouseLeaveHandler}
        />
        <h6
          className={`${classes.categoryTitle} ${
            buttonHover === "ceramics" && classes.activeText
          }`}
          onMouseEnter={buttonTextEnterHandler}
          id="Ceramics-sub-cat-title-text"
        >
          Ceramics
        </h6>
        <p
          className={`${classes.categorySubText} ${
            buttonHover === "ceramics" && classes.activeText
          }`}
          onMouseEnter={buttonTextEnterHandler}
          id="Ceramics-sub-cat-button-subtext"
        >
          Find a new family hierloom for yourself and generations after
        </p>
        <button
          className={`${classes.actionButton} ${
            buttonHover === "ceramics" && classes.activeActionButton
          }`}
          id="Ceramics-sub-cat-discover-button"
          onMouseEnter={buttonTextEnterHandler}
        >
          Discover
        </button>
      </div>
      <div
        className={classes.subCategoryButton}
        onClick={subCategoryButtonHandler}
        id={"Clocks-sub-cat-button"}
      >
        <img
          className={`${classes.buttonImage} ${
            buttonHover === "antiqueClock" && classes.activeButtonHover
          }`}
          src={antiqueClock}
          alt="antique clock"
        />
        <div
          className={classes.blurBackground}
          id="Clocks-sub-cat-blurred-background"
          onMouseEnter={buttonMouseEnterHandler}
          onMouseLeave={buttonMouseLeaveHandler}
        />
        <h6
          className={`${classes.categoryTitle} ${
            buttonHover === "antiqueClock" && classes.activeText
          }`}
          id="Clocks-sub-cat-button-title"
          onMouseEnter={buttonTextEnterHandler}
        >
          Clocks
        </h6>
        <p
          className={`${classes.categorySubText} ${
            buttonHover === "antiqueClock" && classes.activeText
          }`}
          id="Clocks-sub-cat-button-title"
          onMouseEnter={buttonTextEnterHandler}
        >
          Keep yourself and your family on time with a new clock
        </p>
        <button
          className={`${classes.actionButton} ${
            buttonHover === "antiqueClock" && classes.activeActionButton
          }`}
          id="Clocks-sub-cat-shop-button"
          onMouseEnter={buttonTextEnterHandler}
        >
          Show Now
        </button>
      </div>
      <div
        className={classes.subCategoryButton}
        onClick={subCategoryButtonHandler}
        id={"Tablewear-sub-cat-button"}
      >
        <img
          className={`${classes.buttonImage} ${
            buttonHover === "antiqueTablewear" && classes.activeButtonHover
          }`}
          src={antiqueTablewear}
          alt="antique tablewear"
        />
        <div
          className={classes.blurBackground}
          id="Tablewear-sub-cat-blur-background"
          onMouseEnter={buttonMouseEnterHandler}
          onMouseLeave={buttonMouseLeaveHandler}
        />
        <h6
          className={`${classes.categoryTitle} ${
            buttonHover === "antiqueTablewear" && classes.activeText
          }`}
          id="Tablewear-sub-cat-button-title-text"
          onMouseEnter={buttonTextEnterHandler}
        >
          Tablewear
        </h6>
        <p
          className={`${classes.categorySubText} ${
            buttonHover === "antiqueTablewear" && classes.activeText
          }`}
          id="Tablewear-sub-description-text"
          onMouseEnter={buttonTextEnterHandler}
        >
          Share a new dining exprience with friends and loved ones today
        </p>
        <button
          className={`${classes.actionButton} ${
            buttonHover === "antiqueTablewear" && classes.activeActionButton
          }`}
          id="Tablewear-sub-cat-shop-now-button"
          onMouseEnter={buttonTextEnterHandler}
        >
          Shop Now
        </button>
      </div>
      <div
        className={classes.subCategoryButton}
        onClick={subCategoryButtonHandler}
        id={"Paintings-sub-cat-button"}
      >
        <img
          className={`${classes.buttonImage} ${
            buttonHover === "antiquePainting" && classes.activeButtonHover
          }`}
          src={antiquePainting}
          alt="antique painting"
        />

        <div
          className={classes.blurBackground}
          id="Paintings-sub-cat-blur-background"
          onMouseEnter={buttonMouseEnterHandler}
          onMouseLeave={buttonMouseLeaveHandler}
        />
        <h6
          className={`${classes.categoryTitle} ${
            buttonHover === "antiquePainting" && classes.activeText
          }`}
          id="Paintings-sub-cat-title-text"
          onMouseEnter={buttonTextEnterHandler}
        >
          Paintings
        </h6>
        <p
          className={`${classes.categorySubText} ${
            buttonHover === "antiquePainting" && classes.activeText
          }`}
          id="Paintings-sub-cat-description-text"
          onMouseEnter={buttonTextEnterHandler}
        >
          Discover new acclaimed paintings and find timeless classics
        </p>
        <button
          className={`${classes.actionButton} ${
            buttonHover === "antiquePainting" && classes.activeActionButton
          }`}
          id="Paintings-sub-cat-discovery-button"
          onMouseEnter={buttonTextEnterHandler}
        >
          Discover
        </button>
      </div>
    </div>
  );
};
export default SubCategoryMenu;
