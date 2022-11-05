import { mainStoreSliceActions } from "../../store/store";
export const updateSellersWithOrder = async (dispatch: any, orderData: any) => {
  try {
    const fetchedResponse = await fetch(
      `http://localhost:5000/order/new-order-seller-data`,
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
