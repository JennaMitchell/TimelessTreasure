import classes from "./bottom-nav-bar.module.scss";

import { useEffect, useState } from "react";
import { buttonLogicObject } from "./bottom-nav-bar-data";
import CeramicsDropDown from "../dropsdowns/ceramics/ceramics-dropdown";
import ClocksDropDown from "../dropsdowns/clocks/clocks-dropdown";
import TablewearDropDown from "../dropsdowns/tablewear/tablewear-dropdown";
import PaintingsDropDown from "../dropsdowns/paintings/paintings-dropdown";
import ElectronicsDropDown from "../dropsdowns/electronics/electronics-dropdown";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { marketplaceStoreActions } from "../../../store/marketplace";
import { dropdownIdSpliter } from "../../../utilities/product-react-hooks/product-react-hooks";
import { getTagDataHandler } from "../../../utilities/product-react-hooks/product-react-hooks";
const BottomNavBar = () => {
  const [bottomNavBarEnabled, setBottomNavBarEnabled] = useState(true);
  const [dropdownsEnabled, setDropdownsEnabled] = useState(true);

  const bottomNavBarEnablerHandler = () => {
    const borromNavMatch = window.matchMedia(`(max-width:480px)`);
    if (borromNavMatch.matches) {
      setBottomNavBarEnabled(false);
    }
    if (!bottomNavBarEnabled && !borromNavMatch.matches) {
      setBottomNavBarEnabled(true);
    }
  };

  const dropdownsEnabledEnablerHandler = () => {
    const dropdownMatch = window.matchMedia(`(max-width:1250px)`);
    if (dropdownMatch.matches) {
      setDropdownsEnabled(false);
    }
    if (!bottomNavBarEnabled && !dropdownMatch.matches) {
      setDropdownsEnabled(true);
    }
  };

  useEffect(() => {
    const bottomNavWindowMatch = window.matchMedia("(max-width:480px)").matches;
    const dropdownWindowMatch = window.matchMedia("(max-width:1250px)").matches;
    if (bottomNavWindowMatch) {
      setBottomNavBarEnabled(false);
    }
    if (dropdownWindowMatch) {
      setDropdownsEnabled(false);
    }
  }, []);

  window.addEventListener("resize", bottomNavBarEnablerHandler);

  window.addEventListener("resize", dropdownsEnabledEnablerHandler);

  const loggedInDropdownActive = useAppSelector(
    (state) => state.mainStore.loggedInDropDownActive
  );
  const [buttonLogic, setButtonLogic] = useState(buttonLogicObject);

  const buttonLogicUpdator = (
    activeButtonTitle: string,
    key: string,
    state: boolean
  ) => {
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

    if (!dropdownsEnabled) {
      return;
    }
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

    if (!dropdownsEnabled) {
      return;
    }

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sectionClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLDivElement;

    const activeTags = [dropdownIdSpliter(targetElement.id)[0]];

    dispatch(marketplaceStoreActions.setActiveTags(activeTags));

    getTagDataHandler(dispatch, activeTags);
    navigate("/marketplace");
  };

  return (
    <>
      {bottomNavBarEnabled && (
        <div className={classes.backgroundContainer}>
          <div className={classes.mainContainer}>
            {!loggedInDropdownActive && (
              <div
                className={classes.sectionButton}
                onMouseEnter={buttonMouseEnterHandler}
                onMouseLeave={buttonMouseLeaveHandler}
                id="ceramics-button"
                onClick={sectionClickHandler}
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
                onClick={sectionClickHandler}
              >
                Ceramics
              </div>
            )}
            {!loggedInDropdownActive && (
              <div
                className={classes.sectionButton}
                onMouseEnter={buttonMouseEnterHandler}
                onMouseLeave={buttonMouseLeaveHandler}
                onClick={sectionClickHandler}
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
                onClick={sectionClickHandler}
              >
                Clocks
              </div>
            )}
            {!loggedInDropdownActive && (
              <div
                className={classes.sectionButton}
                onMouseEnter={buttonMouseEnterHandler}
                onMouseLeave={buttonMouseLeaveHandler}
                onClick={sectionClickHandler}
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
                onClick={sectionClickHandler}
              >
                Tablewear
              </div>
            )}
            {!loggedInDropdownActive && (
              <div
                className={classes.sectionButton}
                onMouseEnter={buttonMouseEnterHandler}
                onMouseLeave={buttonMouseLeaveHandler}
                onClick={sectionClickHandler}
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
                onClick={sectionClickHandler}
              >
                Paintings
              </div>
            )}
            {!loggedInDropdownActive && (
              <div
                className={classes.sectionButton}
                onMouseEnter={buttonMouseEnterHandler}
                onMouseLeave={buttonMouseLeaveHandler}
                onClick={sectionClickHandler}
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
                onClick={sectionClickHandler}
              >
                Electronics
              </div>
            )}
            <button className={classes.sectionButton}>Credits</button>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNavBar;
