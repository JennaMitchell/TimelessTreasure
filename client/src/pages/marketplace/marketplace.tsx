import MarketplaceMenu from "./marketplace-menu/marketplace-menu";
import MarketplaceSelection from "./marketplace-selection/marketplace-selection";
import classes from "./marketplace.module.scss";

const Marketplace = () => {
  return (
    <>
      <div className={classes.titleBanner}>
        <h6 className={classes.mainTitle}>Marketplace</h6>
      </div>
      <div className={classes.collectionTopContainer}>
        <MarketplaceMenu />
        <MarketplaceSelection />
      </div>
    </>
  );
};
export default Marketplace;
