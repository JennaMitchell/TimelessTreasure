import { mainStoreSliceActions } from "../../store/store";
import { databaseURL } from "../constants/constants";
export const updateSellersWithOrder = async (dispatch: any, orderData: any) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/order/new-order-seller-data`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
