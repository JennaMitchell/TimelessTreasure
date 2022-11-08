import { mainStoreSliceActions } from "../../store/store";
export const getFilteredProduct = async (dispatch: any, tagData: any) => {
  let filterString = "";
  for (let indexOfTag = 0; indexOfTag < tagData.length; indexOfTag++) {
    if (indexOfTag === 0) {
      filterString = filterString + tagData[indexOfTag];
    } else {
      filterString = filterString + "-" + tagData[indexOfTag];
    }
  }

  if (filterString.length === 0) {
    try {
      const fetchedResponse = await fetch(
        `http://localhost:5000/product/get-all`,
        {
          method: "GET",
        }
      );
      return fetchedResponse;
    } catch (error) {
      dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
    }
  } else {
    try {
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
  }
};

export const getSearchedProduct = async (dispatch: any, filterString: any) => {
  if (filterString.trim().length === 0) {
    try {
      const fetchedResponse = await fetch(
        `http://localhost:5000/product/get-all`,
        {
          method: "GET",
        }
      );
      return fetchedResponse;
    } catch (error) {
      dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
    }
  } else {
    try {
      const fetchedResponse = await fetch(
        `http://localhost:5000/product/filter-search/${filterString}`,
        {
          method: "GET",
        }
      );
      return fetchedResponse;
    } catch (error) {
      dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
    }
  }
};
