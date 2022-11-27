import { createSlice } from "@reduxjs/toolkit";
interface SelectedItem {
  [key: string]: string;
}
interface NewPostInterface {
  titlePostInput: {
    labelMoveout: boolean;
    inputData: string;
  };
  pricePostInput: {
    labelMoveout: boolean;
    inputData: string;
  };
  descriptionPostInput: {
    labelMoveout: boolean;
    inputData: string;
  };
}
interface State {
  isSeller: boolean;
  sellerData: string[];
  sellerNewPostTags: SelectedItem;
  sellerNewPostPriceType: string;
  sellerNewPostProductCategory: string;
  sellerPendingOrderData: any[];
  sellerFulfilledOrderData: any[];
  newPostSelectedPhotoKey: string;
  sellerNewProductQuantity: number;
  sellerNewProductInputLogicObject: NewPostInterface;
}
const initialState: State = {
  isSeller: false,
  sellerData: [],
  sellerNewPostTags: {},
  sellerNewPostPriceType: "USD",
  sellerNewPostProductCategory: "Ceramics",
  sellerPendingOrderData: [],
  sellerFulfilledOrderData: [],
  newPostSelectedPhotoKey: "",
  sellerNewProductQuantity: 1,
  sellerNewProductInputLogicObject: {
    titlePostInput: {
      labelMoveout: false,
      inputData: "",
    },
    pricePostInput: {
      labelMoveout: false,
      inputData: "",
    },
    descriptionPostInput: {
      labelMoveout: false,
      inputData: "",
    },
  },
};

export const sellerStoreSlice = createSlice({
  name: "Timeless Treasures Seller Store",
  initialState: initialState,
  reducers: {
    setIsSeller(state, { payload }) {
      state.isSeller = payload;
    },
    setSellerData(state, { payload }) {
      state.sellerData = payload;
    },
    setSellerNewPostTags(state, { payload }) {
      state.sellerNewPostTags = payload;
    },
    setSellerNewPostPriceType(state, { payload }) {
      state.sellerNewPostPriceType = payload;
    },
    setSellerNewPostProductCategory(state, { payload }) {
      state.sellerNewPostProductCategory = payload;
    },
    setSellerPendingOrderData(state, { payload }) {
      state.sellerPendingOrderData = payload;
    },
    setSellerFulfilledOrderData(state, { payload }) {
      state.sellerFulfilledOrderData = payload;
    },
    setNewPostSelectedPhotoKey(state, { payload }) {
      state.newPostSelectedPhotoKey = payload;
    },
    setSellerNewProductQuantity(state, { payload }) {
      state.sellerNewProductQuantity = payload;
    },
    setSellerNewProductInputLogicObject(state, { payload }) {
      state.sellerNewProductInputLogicObject = payload;
    },
  },
});

export const sellerStoreActions = sellerStoreSlice.actions;
