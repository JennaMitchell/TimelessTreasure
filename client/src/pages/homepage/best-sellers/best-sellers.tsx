import React from "react";
import classes from "./best-sellers.module.scss";
import { useState } from "react";
import newProductsTempData from "./best-sellers-temp-data";

import {
  ShoppingBagIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
const BestSellers = () => {
  const [activeButton, setActiveButton] = useState("all");
  const [hoveredItem, setHoveredItem] = useState("");

  const navButtonTitles = [
    "all",
    "ceramics",
    "clocks",
    "tablewear",
    "paintings",
    "electronics",
  ];
  const navButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLButtonElement;
    const elementId = targetElement.id;
    setActiveButton(elementId);
  };

  const itemContainerMouseEnterHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLDivElement;
    const elementId = targetElement.id;
    setHoveredItem(elementId);
  };

  const itemContainerMouseLeaveHandler = () => {
    setHoveredItem("");
  };

  const renderReadyNavButtons = navButtonTitles.map((title: string, index) => {
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    return (
      <button
        id={`${title}`}
        className={`${classes.navButton} ${
          activeButton === `${title}` && classes.activeNavButton
        }`}
        onClick={navButtonHandler}
        key={`${title} ${index}`}
      >
        {capitalizedTitle}
      </button>
    );
  });

  const renderReadyCollection = newProductsTempData.map((dataEntry, index) => {
    return (
      <div
        className={classes.itemContainer}
        key={`${dataEntry.title} ${index}`}
      >
        <div
          className={classes.moreInfoContainer}
          onMouseEnter={itemContainerMouseEnterHandler}
          onMouseLeave={itemContainerMouseLeaveHandler}
          id={`${dataEntry.title}`}
        >
          <div className={classes.moreInfoBar}>
            <MagnifyingGlassIcon
              className={`${classes.moreInfoButton} ${
                hoveredItem === `${dataEntry.title}` &&
                classes.moreInfoButtonActive
              }`}
            />
            <HeartIcon
              className={`${classes.moreInfoButton} ${
                hoveredItem === `${dataEntry.title}` &&
                classes.moreInfoButtonActive
              }`}
            />
            <ShoppingBagIcon
              className={`${classes.moreInfoButton} ${
                hoveredItem === `${dataEntry.title}` &&
                classes.moreInfoButtonActive
              }`}
            />
          </div>
        </div>
        <img
          src={dataEntry.image}
          alt={`${dataEntry}`}
          className={classes.itemImage}
        />
        <p className={classes.itemTitle}>{dataEntry.title}</p>
        <p className={classes.itemPrice}>{dataEntry.price}</p>
      </div>
    );
  });

  return (
    <div className={classes.mainContainer}>
      <div className={classes.navBar}>{renderReadyNavButtons}</div>
      <div className={classes.itemCollection}>{renderReadyCollection}</div>
      <button className={classes.showMoreButton}>View More</button>
    </div>
  );
};

export default BestSellers;
