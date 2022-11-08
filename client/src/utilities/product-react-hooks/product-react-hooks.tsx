import { getFilteredProduct } from "../product-api-hooks/marketplace-product-hooks";
import { mainStoreSliceActions } from "../../store/store";
import { marketplaceStoreActions } from "../../store/marketplace";

export const dropdownIdSpliter = (idString: string) => {
  const activeTags = idString.split("-");

  const capitalizedArray = [];

  for (
    let indexOfActiveTag = 0;
    indexOfActiveTag < activeTags.length;
    indexOfActiveTag++
  ) {
    capitalizedArray[indexOfActiveTag] =
      activeTags[indexOfActiveTag].charAt(0).toUpperCase() +
      activeTags[indexOfActiveTag].slice(1);
  }

  return capitalizedArray.slice(0, 2);
};

export const getTagDataHandler = (dispatch: any, activeTags: any) => {
  getFilteredProduct(dispatch, activeTags)
    .then((response) => {
      return response?.json();
    })
    .then((jsonData) => {
      if (jsonData !== undefined) {
        if ("error" in jsonData) {
          if (jsonData.error.length !== 0) {
            dispatch(mainStoreSliceActions.setAPICallMessage(jsonData.message));
            dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          }
        } else {
          dispatch(mainStoreSliceActions.setAPICallMessage("Data Retrieved!"));
          dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));

          if (`${typeof jsonData.foundProducts}` === "undefined") {
            dispatch(marketplaceStoreActions.setRetrievedData([]));
          } else {
            dispatch(
              marketplaceStoreActions.setRetrievedData(jsonData.foundProducts)
            );
          }
        }
      } else {
        dispatch(mainStoreSliceActions.setAPICallMessage("Undefined Returned"));
        dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      }
    });
};
