import classes from "./bottom-nav-bar-mobile.module.scss";
import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { returnTrueWhenBreakPointIsMatched } from "../../../utilities/media-queries/media-query-hooks";
const BottomNavBarMobile = () => {
  const [bottomNavBarMobileEnabled, setBottomNavBarMobileEnabled] =
    useState(false);
  const [dropdownButtonActive, setDropdownButtonActive] = useState(false);

  const bottomNavhBarMobileEnablerHandler = () => {
    setBottomNavBarMobileEnabled(
      returnTrueWhenBreakPointIsMatched(480, bottomNavBarMobileEnabled)
    );
  };
  window.addEventListener("resize", bottomNavhBarMobileEnablerHandler);

  useEffect(() => {
    const dropDownMatch = window.matchMedia(`(max-width:480px)`);
    if (dropDownMatch.matches) {
      setBottomNavBarMobileEnabled(true);
    }
  }, []);

  const dropdownButtonHandler = () => {
    setDropdownButtonActive(!dropdownButtonActive);
  };

  return (
    <>
      {bottomNavBarMobileEnabled && (
        <>
          <button
            className={classes.dropdownButton}
            onClick={dropdownButtonHandler}
          >
            <Bars3Icon className={classes.menuIcon} />
          </button>
          {dropdownButtonActive && (
            <div className={classes.marketplaceButtonDropdown}>
              <NavLink to="/marketplace" className={classes.marketplaceButton}>
                Ceramics
              </NavLink>
              <NavLink to="/marketplace" className={classes.marketplaceButton}>
                Clocks
              </NavLink>
              <NavLink to="/marketplace" className={classes.marketplaceButton}>
                Tablewear
              </NavLink>
              <NavLink to="/marketplace" className={classes.marketplaceButton}>
                Paintings
              </NavLink>
              <NavLink to="/marketplace" className={classes.marketplaceButton}>
                Electronics
              </NavLink>
              <NavLink to="/credits" className={classes.marketplaceButton}>
                Credits
              </NavLink>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default BottomNavBarMobile;
