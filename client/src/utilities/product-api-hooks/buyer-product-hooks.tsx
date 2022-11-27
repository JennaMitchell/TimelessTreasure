import { mainStoreSliceActions } from "../../store/store";
import { databaseURL } from "../constants/constants";

export const getBuyersFulfilledItemsCall = async (
  dispatch: any,
  buyerId: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/order/buyer-fulfilled-orders/${buyerId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};

export const getBuyersPendingItemsCall = async (
  dispatch: any,
  buyerId: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/order/buyer-pending-orders/${buyerId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
