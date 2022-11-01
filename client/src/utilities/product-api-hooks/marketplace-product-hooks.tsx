import { mainStoreSliceActions } from "../../store/store";
export const getFilteredProduct = async (dispatch: any, tagData: any) => {
  try {
    let filterString = "";
    for (let indexOfTag = 0; indexOfTag < tagData.length; indexOfTag++) {
      if (indexOfTag === 0) {
        filterString = filterString + tagData[indexOfTag];
      } else {
        filterString = filterString + "-" + tagData[indexOfTag];
      }
    }

    const fetchedResponse = await fetch(
      `http://localhost:5000/product/filter/${filterString}`,
      {
        method: "GET",
      }
    );
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
