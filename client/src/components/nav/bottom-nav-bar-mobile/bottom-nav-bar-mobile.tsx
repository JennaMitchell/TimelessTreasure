import classes from "./bottom-nav-bar-mobile.module.scss";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
const BottomNavBarMobile = () => {
  const [bottomNavBarMobileEnabled, setBottomNavBarMobileEnabled] =
    useState(false);
  const [dropdownButtonActive, setDropdownButtonActive] = useState(false);

  const bottomNavhBarMobileEnablerHandler = () => {
    const match = window.matchMedia(`(max-width:480px)`);
    if (match.matches) {
      setBottomNavBarMobileEnabled(false);
    }
    if (!bottomNavBarMobileEnabled && !match.matches) {
      setBottomNavBarMobileEnabled(true);
    }
  };
  window.addEventListener("resize", bottomNavhBarMobileEnablerHandler);

  const dropdownButtonHandler = () => {
    setDropdownButtonActive(!dropdownButtonActive);
  };

  return (
    <>
      {!bottomNavBarMobileEnabled && (
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
              <NavLink to="/marketplace" className={classes.marketplaceButton}>
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
