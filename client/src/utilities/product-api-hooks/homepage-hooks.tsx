import { mainStoreSliceActions } from "../../store/store";
import { databaseURL } from "../constants/constants";
export const latestItemsApiCall = async (dispatch: any) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/product/get-ten-latest`,
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
export const latestItemsApiCallWithFilter = async (
  dispatch: any,
  sectionType: string
) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/product/get-ten-latest-filtered/${sectionType}`,
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

export const hotestItemsApiCall = async (dispatch: any) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/product/get-ten-hotest`,
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
export const hotestItemsApiCallWithFilter = async (
  dispatch: any,
  sectionType: string
) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/product/get-ten-hotest-filtered/${sectionType}`,
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
