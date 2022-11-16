import MarketplaceMenu from "./marketplace-menu/marketplace-menu";
import MarketplaceSelection from "./marketplace-selection/marketplace-selection";
import classes from "./marketplace.module.scss";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { marketplaceStoreActions } from "../../store/marketplace";
import { useState, useEffect } from "react";
import { returnTrueWhenBreakPointIsMatched } from "../../utilities/media-queries/media-query-hooks";
const Marketplace = () => {
  const marketplaceMenuMoveOut = useAppSelector(
    (state) => state.marketStore.marketplaceMenuMoveOut
  );
  const dispatch = useAppDispatch();
  const moveoutButtonHandler = () => {
    dispatch(
      marketplaceStoreActions.setMarketplaceMenuMoveOut(!marketplaceMenuMoveOut)
    );
  };
  const [menuMoveButtonEnabled, setMenuMovedButtonEnabled] = useState(false);

  const menuMoveoutButtonEnabled = () => {
    setMenuMovedButtonEnabled(
      returnTrueWhenBreakPointIsMatched(800, menuMoveButtonEnabled)
    );
  };
  useEffect(() => {
    const menuMoveButtonMatch = window.matchMedia(`(max-width:800px)`);
    if (menuMoveButtonMatch.matches) {
      setMenuMovedButtonEnabled(true);
    }
  }, []);
  window.addEventListener("resize", menuMoveoutButtonEnabled);
  return (
    <>
      <div className={classes.titleBanner}>
        <h6 className={classes.mainTitle}>Marketplace</h6>
      </div>
      <div className={classes.collectionTopContainer}>
        <MarketplaceMenu />
        <MarketplaceSelection />
        {menuMoveButtonEnabled && (
          <button
            className={`${classes.moveoutButton} ${
              marketplaceMenuMoveOut && classes.moveoutButtonActive
            }`}
            onClick={moveoutButtonHandler}
          >
            <Bars3Icon className={classes.moveoutIcon} />
          </button>
        )}
      </div>
    </>
  );
};
export default Marketplace;
