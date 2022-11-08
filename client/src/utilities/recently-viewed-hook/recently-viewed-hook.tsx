import { marketplaceStoreActions } from "../../store/marketplace";

export const recentlyViewedHook = (
  dispatch: any,
  recentlyViewedItems: any[],
  viewedItem: {}
) => {
  const copyOfRecentlyViewedItems = JSON.parse(
    JSON.stringify(recentlyViewedItems)
  );

  if (copyOfRecentlyViewedItems.length === 3) {
    copyOfRecentlyViewedItems[2] = copyOfRecentlyViewedItems[1];
    copyOfRecentlyViewedItems[1] = copyOfRecentlyViewedItems[0];
    copyOfRecentlyViewedItems[0] = viewedItem;
  } else {
    copyOfRecentlyViewedItems.push(viewedItem);
  }
  dispatch(
    marketplaceStoreActions.setRecentlyViewedProduct(copyOfRecentlyViewedItems)
  );
};
