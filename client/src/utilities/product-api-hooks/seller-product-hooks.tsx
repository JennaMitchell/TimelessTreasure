import { mainStoreSliceActions } from "../../store/store";
import { databaseURL } from "../constants/constants";
export const newProductCall = async (
  dispatch: any,
  formData: any,
  token: string
) => {
  console.log(formData);
  console.log("HOOKS");
  try {
    const fetchedResponse = await fetch(`${databaseURL}/product/new`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return fetchedResponse;
  } catch (error) {
    console.log(error);
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
export const getSellersItemsForSaleCall = async (
  dispatch: any,
  sellerId: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/product/seller-items-for-sale/${sellerId}`,
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

export const getSellersPendingItemsCall = async (
  dispatch: any,
  sellerId: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/order/seller-pending-orders/${sellerId}`,
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
///seller-fulfilled-orders/:sellerId"
export const getSellersFulfilledItemsCall = async (
  dispatch: any,
  sellerId: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(
      `${databaseURL}/order/seller-fulfilled-orders/${sellerId}`,
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

export const deleteItemForSaleCall = async (
  dispatch: any,
  deleteData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(`${databaseURL}/product/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(deleteData),
    });
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
export const updateProductCall = async (
  dispatch: any,
  formData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(`${databaseURL}/product/update`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
export const shipProductCall = async (
  dispatch: any,
  orderData: any,
  token: string
) => {
  try {
    const fetchedResponse = await fetch(`${databaseURL}/order/ship-product`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(orderData),
    });
    return fetchedResponse;
  } catch (error) {
    dispatch(mainStoreSliceActions.setAPICallMessage("Local Error"));
    dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
  }
};
