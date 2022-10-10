import classes from "./marketplace-selection.module.scss";
import marketplaceTempData from "./marketplace-temp-data";
const MarketplaceSelection = () => {
  const renderReadyProductData = marketplaceTempData.map((itemData, index) => {
    return (
      <div className={classes.itemContainer} key={`${itemData} ${index}`}>
        <img
          src={itemData.image}
          alt={itemData.title}
          className={classes.itemImage}
        />
        <h6 className={classes.itemTitle}>{itemData.title}</h6>
        <p className={classes.itemPrice}>{itemData.price}</p>
      </div>
    );
  });

  return (
    <div className={classes.markplaceSelection}>{renderReadyProductData}</div>
  );
};
export default MarketplaceSelection;
