import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import classes from "./marketplace-selection.module.scss";
import marketplaceTempData from "./marketplace-temp-data";
import { getFilteredProduct } from "../../../utilities/product-api-hooks/marketplace-product-hooks";
import { mainStoreSliceActions } from "../../../store/store";
import { userStoreSliceActions } from "../../../store/user-store";
const MarketplaceSelection = () => {
  const activeTags = useAppSelector((state) => state.marketStore.activeTags);

  const dispatch = useAppDispatch();
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

  const getDataHandler = () => {
    getFilteredProduct(dispatch, activeTags)
      .then((response) => {
        return response?.json();
      })
      .then((jsonData) => {
        if (jsonData !== undefined) {
          if ("error" in jsonData) {
            if (jsonData.error.length !== 0) {
              dispatch(
                mainStoreSliceActions.setAPICallMessage(jsonData.message)
              );
              dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
            }
          } else {
            dispatch(
              mainStoreSliceActions.setAPICallMessage("Data Retrieved!")
            );
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));

            dispatch(userStoreSliceActions.setSellerData(jsonData));
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
        }
      });
  };

  return (
    <>
      <div className={classes.tempButton} onClick={getDataHandler}>
        Get Data
      </div>
      <div className={classes.markplaceSelection}>{renderReadyProductData}</div>
    </>
  );
};
export default MarketplaceSelection;
