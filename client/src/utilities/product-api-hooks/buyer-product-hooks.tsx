import { mainStoreSliceActions } from "../../store/store";

export const getBuyersFulfilledItemsCall = async (
  dispatch: any,
  buyerId: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      `http://localhost:5000/order/buyer-fulfilled-orders/${buyerId}`,
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
      `http://localhost:5000/order/buyer-pending-orders/${buyerId}`,
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
