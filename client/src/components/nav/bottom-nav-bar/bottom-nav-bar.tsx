import classes from "./bottom-nav-bar.module.scss";

import { useState } from "react";
import { buttonLogicObject } from "./bottom-nav-bar-data";
import CeramicsDropDown from "../dropsdowns/ceramics/ceramics-dropdown";
import ClocksDropDown from "../dropsdowns/clocks/clocks-dropdown";
import TablewearDropDown from "../dropsdowns/tablewear/tablewear-dropdown";
import PaintingsDropDown from "../dropsdowns/paintings/paintings-dropdown";
import ElectronicsDropDown from "../dropsdowns/electronics/electronics-dropdown";
import { useAppSelector } from "../../../store/hooks";
const BottomNavBar = () => {
  const loggedInDropdownActive = useAppSelector(
    (state) => state.mainStore.loggedInDropDownActive
  );
  const [buttonLogic, setButtonLogic] = useState(buttonLogicObject);

  const buttonLogicUpdator = (
    activeButtonTitle: string,
    key: string,
    state: boolean
  ) => {
    console.log(activeButtonTitle);

    if (activeButtonTitle !== undefined && activeButtonTitle.length !== 0) {
      const resetButtonLogic = clearOtherPopups(activeButtonTitle);
      resetButtonLogic[activeButtonTitle][key] = state;
      setButtonLogic(resetButtonLogic);
    }
  };

  const clearOtherPopups = (activeButtonTitle: string) => {
    const buttonTitles = [
      "Ceramics",
      "Clocks",
      "Tablewear",
      "Paintings",
      "Electronics",
      "Credits",
    ];
    if (activeButtonTitle != null && activeButtonTitle.length !== 0) {
      const filteredTitles = buttonTitles.filter(
        (title: string) => title !== activeButtonTitle
      );
      const copyOfButtonLogic = JSON.parse(JSON.stringify(buttonLogic));

      filteredTitles.forEach((buttonTitle: string) => {
        copyOfButtonLogic[buttonTitle].buttonHover = false;
        copyOfButtonLogic[buttonTitle].dropDownHover = false;
      });
      return copyOfButtonLogic;
    }
    return;
  };

  const buttonMouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const event = e.target as HTMLDivElement;
    const elementId = event.id;
    if (elementId != null && elementId.length !== 0) {
      const activeButtonTitle =
        elementId.split("-")[0].charAt(0).toUpperCase() +
        elementId.split("-")[0].slice(1);

      setTimeout(() => {
        if (!buttonLogic[activeButtonTitle].dropDownHover) {
          const resetButtonLogic = clearOtherPopups(activeButtonTitle);
          resetButtonLogic[activeButtonTitle].buttonHover = false;
          setButtonLogic(resetButtonLogic);
        }
      }, 100);
    }
  };

  const buttonMouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const event = e.target as HTMLDivElement;
    const elementId = event.id;

    if (elementId != null && elementId.length !== 0) {
      const activeButtonTitle =
        elementId.split("-")[0].charAt(0).toUpperCase() +
        elementId.split("-")[0].slice(1);

      buttonLogicUpdator(activeButtonTitle, "buttonHover", true);
    }
  };
  const dropDownMouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const event = e.target as HTMLDivElement;
    const elementId = event.id;
    if (elementId != null && elementId.length !== 0) {
      const elementId = event.id;
      const buttonTitle =
        elementId.split("-")[0].charAt(0).toUpperCase() +
        elementId.split("-")[0].slice(1);

      buttonLogicUpdator(buttonTitle, "dropDownHover", true);
    }
  };

  const dropDownMouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const event = e.target as HTMLDivElement;
    const elementId = event.id;

    if (elementId != null && elementId.length !== 0) {
      const buttonTitle =
        elementId.split("-")[0].charAt(0).toUpperCase() +
        elementId.split("-")[0].slice(1);
      buttonLogicUpdator(buttonTitle, "dropDownHover", false);
      buttonLogicUpdator(buttonTitle, "buttonHover", false);
    }
  };

  return (
    <div className={classes.backgroundContainer}>
      <div className={classes.mainContainer}>
        {!loggedInDropdownActive && (
          <div
            className={classes.sectionButton}
            onMouseEnter={buttonMouseEnterHandler}
            onMouseLeave={buttonMouseLeaveHandler}
            id="ceramics-button"
          >
            Ceramics
            {buttonLogic["Ceramics"].buttonHover && (
              <CeramicsDropDown
                mouseEnterHandler={dropDownMouseEnterHandler}
                mouseLeaveHandler={dropDownMouseLeaveHandler}
              />
            )}
          </div>
        )}
        {loggedInDropdownActive && (
          <div
            className={classes.sectionButton}
            onMouseEnter={buttonMouseEnterHandler}
            onMouseLeave={buttonMouseLeaveHandler}
            id="ceramics-button"
          >
            Ceramics
          </div>
        )}
        {!loggedInDropdownActive && (
          <div
            className={classes.sectionButton}
            onMouseEnter={buttonMouseEnterHandler}
            onMouseLeave={buttonMouseLeaveHandler}
            id="clocks-button"
          >
            Clocks
            {buttonLogic["Clocks"].buttonHover && (
              <ClocksDropDown
                mouseEnterHandler={dropDownMouseEnterHandler}
                mouseLeaveHandler={dropDownMouseLeaveHandler}
              />
            )}
          </div>
        )}
        {loggedInDropdownActive && (
          <div
            className={classes.sectionButton}
            onMouseEnter={buttonMouseEnterHandler}
            onMouseLeave={buttonMouseLeaveHandler}
            id="clocks-button"
          >
            Clocks
          </div>
        )}
        {!loggedInDropdownActive && (
          <div
            className={classes.sectionButton}
            onMouseEnter={buttonMouseEnterHandler}
            onMouseLeave={buttonMouseLeaveHandler}
            id="tablewear-button"
          >
            Tablewear
            {buttonLogic["Tablewear"].buttonHover && (
              <TablewearDropDown
                mouseEnterHandler={dropDownMouseEnterHandler}
                mouseLeaveHandler={dropDownMouseLeaveHandler}
              />
            )}
          </div>
        )}
        {loggedInDropdownActive && (
          <div
            className={classes.sectionButton}
            onMouseEnter={buttonMouseEnterHandler}
            onMouseLeave={buttonMouseLeaveHandler}
            id="tablewear-button"
          >
            Tablewear
          </div>
        )}
        {!loggedInDropdownActive && (
          <div
            className={classes.sectionButton}
            onMouseEnter={buttonMouseEnterHandler}
            onMouseLeave={buttonMouseLeaveHandler}
            id="paintings-button"
          >
            Paintings
            {buttonLogic["Paintings"].buttonHover && (
              <PaintingsDropDown
                mouseEnterHandler={dropDownMouseEnterHandler}
                mouseLeaveHandler={dropDownMouseLeaveHandler}
              />
            )}
          </div>
        )}
        {loggedInDropdownActive && (
          <div
            className={classes.sectionButton}
            onMouseEnter={buttonMouseEnterHandler}
            onMouseLeave={buttonMouseLeaveHandler}
            id="paintings-button"
          >
            Paintings
          </div>
        )}
        {!loggedInDropdownActive && (
          <div
            className={classes.sectionButton}
            onMouseEnter={buttonMouseEnterHandler}
            onMouseLeave={buttonMouseLeaveHandler}
            id="electronics-button"
          >
            Electronics{" "}
            {buttonLogic["Electronics"].buttonHover && (
              <ElectronicsDropDown
                mouseEnterHandler={dropDownMouseEnterHandler}
                mouseLeaveHandler={dropDownMouseLeaveHandler}
              />
            )}
          </div>
        )}
        {loggedInDropdownActive && (
          <div
            className={classes.sectionButton}
            onMouseEnter={buttonMouseEnterHandler}
            onMouseLeave={buttonMouseLeaveHandler}
            id="electronics-button"
          >
            Electronics
          </div>
        )}
        <button className={classes.sectionButton}>Credits</button>
      </div>
    </div>
  );
};

export default BottomNavBar;
