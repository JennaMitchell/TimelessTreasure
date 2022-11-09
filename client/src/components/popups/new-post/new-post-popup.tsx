import classes from "./new-post-popup.module.scss";
import { XMarkIcon } from "@heroicons/react/24/outline";
import decor from "../../../images/homepage/decor/decor.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import React, { useState, useEffect, useRef } from "react";
import NewPostSelectionDropdrop from "./selection-dropdown/new-post-selection-dropdown";
import productTypeSubSelection from "../../../utilities/product-type-sub-selection";
import { newProductCall } from "../../../utilities/product-api-hooks/seller-product-hooks";
import keyIdGenerator from "../../../utilities/key-id-generator/key-id-generator";
import { priceValidator } from "../../../utilities/validation-hooks/validation-hooks";
import { priceInputCleaner } from "../../../utilities/generic-hooks/generic-hooks";
import { sellerStoreActions } from "../../../store/seller";
import { getSellersItemsForSaleCall } from "../../../utilities/product-api-hooks/seller-product-hooks";
interface LogicObject {
  [key: string]: {
    labelMoveout: boolean;
    inputData: "";
  };
}
interface SelectedTypes {
  [key: string]: string;
}
const NewPostPopup = () => {
  const imageInputRef = useRef(null);
  const dispatch = useAppDispatch();
  const sellerNewPostTags = useAppSelector(
    (state) => state.sellerStore.sellerNewPostTags
  );

  const [priceInputFocused, setPriceInputFocused] = useState(false);
  const closingIconHandler = () => {
    dispatch(sellerStoreActions.setSellerNewPostPriceType("USD"));
    dispatch(sellerStoreActions.setSellerNewPostProductCategory("Ceramics"));
    dispatch(sellerStoreActions.setSellerNewPostTags({}));
    dispatch(mainStoreSliceActions.setNewPostPopupActive(false));
    dispatch(mainStoreSliceActions.setLockViewPort(false));
    setProductQuantity(1);
  };
  const newPostPopupActive = useAppSelector(
    (state) => state.mainStore.newPostPopupActive
  );
  const sellerNewPostProductCategory = useAppSelector(
    (state) => state.sellerStore.sellerNewPostProductCategory
  );
  const sellerNewPostPriceType = useAppSelector(
    (state) => state.sellerStore.sellerNewPostPriceType
  );

  const userId = useAppSelector((state) => state.userStore.userId);
  const userToken = useAppSelector((state) => state.userStore.userToken);
  const acceptedImageFormats = ["png", "jpg", "jpeg"];
  const acceptedProductTypes = [
    "Ceramics",
    "Clocks",
    "Tablewear",
    "Paintings",
    "Electronics",
  ];

  const [initialRender, setInitialRender] = useState(false);

  const [productQuantity, setProductQuantity] = useState(1);
  const maxQuantity = 99;

  const renderReadyQuantitySelects = [];
  for (let quantity = 1; quantity < maxQuantity; quantity++) {
    renderReadyQuantitySelects.push(
      <option
        className={classes.productOption}
        key={`item-quantity-${quantity}`}
      >
        {quantity}
      </option>
    );
  }

  const quantityHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLOptionElement;

    setProductQuantity(+targetElement.value);
  };

  const [dropDownSelectedTypes, setDropDownSelectedTypes] =
    useState<SelectedTypes>({});

  const dropDownSelectionHandler = (selectedTypes: SelectedTypes) => {
    setDropDownSelectedTypes(selectedTypes);
  };

  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
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
  });

  const apiCallMessageType = useAppSelector(
    (state) => state.mainStore.apiCallMessageType
  );

  const productTypeSelectionHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    dispatch(
      sellerStoreActions.setSellerNewPostProductCategory(e.target.value)
    );
  };
  const priceTypeSelectionHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    dispatch(sellerStoreActions.setSellerNewPostPriceType(e.target.value));
  };

  useEffect(() => {
    if (!initialRender && newPostPopupActive) {
      setInitialRender(true);
      console.log(initialRender);
    }
  }, [newPostPopupActive, initialRender]);

  const dialogBackdropClickHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;

    if (targetElement.id === "new-post-backdrop") {
      closingIconHandler();
    }
  };
  const inputCopyObjectHandler = () =>
    JSON.parse(JSON.stringify(inputLogicObject));

  const inputChangeHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();

    if (!copyOfInputObject[targetElement.id].labelMoveout) {
      copyOfInputObject[targetElement.id].labelMoveout = true;
    }
    copyOfInputObject[targetElement.id].inputData = targetElement.value;
    setInputLogicObject(copyOfInputObject);
  };
  const inputFocusHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();
    if (copyOfInputObject[targetElement.id].inputData.length === 0) {
      copyOfInputObject[targetElement.id].labelMoveout =
        !copyOfInputObject[targetElement.id].labelMoveout;
      setInputLogicObject(copyOfInputObject);
    }
    if (targetElement.id === "pricePostInput") {
      setPriceInputFocused(true);
    }
  };
  const inputBlurHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();
    if (copyOfInputObject[targetElement.id].inputData.length === 0) {
      copyOfInputObject[targetElement.id].labelMoveout =
        !copyOfInputObject[targetElement.id].labelMoveout;
      setInputLogicObject(copyOfInputObject);
    }
    if (targetElement.id === "pricePostInput") {
      setPriceInputFocused(false);
    }
  };

  const inputLabelClickHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLLabelElement;
    const copyOfInputObject = inputCopyObjectHandler();
    document.getElementById(`${targetElement.htmlFor}`)?.focus();
    copyOfInputObject[targetElement.htmlFor].labelMoveout =
      !copyOfInputObject[targetElement.htmlFor].labelMoveout;
    setInputLogicObject(copyOfInputObject);
  };

  const fileInputHandler = () => {
    if (imageInputRef.current != null) {
      const imageInput = imageInputRef.current as HTMLInputElement;

      const tempString = imageInput.value.slice(-10);
      const indexOfFileEnding = tempString.indexOf(".");
      const fileEnding = tempString.slice(
        indexOfFileEnding + 1,
        tempString.length
      );
      if (!acceptedImageFormats.includes(fileEnding)) {
        dispatch(
          mainStoreSliceActions.setAPICallMessage("Please enter a valid image!")
        );
        dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
        imageInput.value = "";
      }
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const data = productTypeSubSelection[sellerNewPostProductCategory];
    const dataKeys = Object.keys(data);
    const dataValues = Object.values(data);

    for (let i = 0; i < dataKeys.length; i++) {
      if (!dataValues[i].includes(dropDownSelectedTypes[dataKeys[i]])) {
        dispatch(mainStoreSliceActions.setAPICallMessage("Catagory Missing!"));
        dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
        return;
      }
    }

    if (inputLogicObject.titlePostInput.inputData.length === 0) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a title!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));

      return;
    }
    if (inputLogicObject.pricePostInput.inputData.length === 0) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a price!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    if (priceValidator(inputLogicObject.pricePostInput.inputData)) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a valid price!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    if (productQuantity <= 0 || productQuantity >= 99) {
      dispatch(mainStoreSliceActions.setAPICallMessage("Invalid Quantity!"));
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    if (!acceptedProductTypes.includes(sellerNewPostProductCategory)) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Invalid Product Type!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    const formData = new FormData();

    if (imageInputRef.current !== null) {
      const imageInput = imageInputRef.current as HTMLInputElement;

      if (imageInput?.files !== null) {
        formData.append("image", imageInput.files[0]);
      }
      if (imageInput.value.length === 0) {
        dispatch(mainStoreSliceActions.setAPICallMessage("No image added!"));
        dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
        return;
      }
    }
    if (inputLogicObject.descriptionPostInput.inputData.trim().length === 0) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please add a description.")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }

    formData.append("title", inputLogicObject.titlePostInput.inputData);
    formData.append(
      "price",
      priceInputCleaner(inputLogicObject.pricePostInput.inputData)
    );

    formData.append("quantity", JSON.stringify(productQuantity));
    formData.append("priceType", sellerNewPostPriceType);
    formData.append("productType", sellerNewPostProductCategory);
    formData.append(
      "productTags",
      JSON.stringify(Object.values(sellerNewPostTags))
    );

    const productId = keyIdGenerator();
    formData.append("productId", productId);
    formData.append("userId", userId);
    formData.append("status", "For Sale");
    formData.append(
      "description",
      inputLogicObject.descriptionPostInput.inputData
    );
    const today = new Date();
    const utc = today.toUTCString();
    const indexOfUtcComma = utc.indexOf(",");
    const utcSliced = utc.slice(indexOfUtcComma + 1).trim();

    formData.append("date", utcSliced);

    newProductCall(dispatch, formData, userToken)
      .then((data) => {
        return data?.json();
      })
      .then((jsonData) => {
        if ("error" in jsonData) {
          if (jsonData.error.length !== 0) {
            dispatch(mainStoreSliceActions.setAPICallMessage(jsonData.message));
            dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          }
        } else {
          dispatch(mainStoreSliceActions.setAPICallMessage("Product Uploaded"));
          dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
          dispatch(sellerStoreActions.setSellerNewPostPriceType("USD"));
          dispatch(
            sellerStoreActions.setSellerNewPostProductCategory("Ceramics")
          );
        }
      })
      .then(() => {
        return getSellersItemsForSaleCall(dispatch, userId, userToken);
      })
      .then((response) => {
        return response?.json();
      })
      .then((jsonData) => {
        if (jsonData !== undefined) {
          if ("error" in jsonData) {
            if (jsonData.error.length !== 0) {
              dispatch(
                mainStoreSliceActions.setAPICallMessage(jsonData.message)
              );
              dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
              Promise.reject();
            }
          } else {
            dispatch(sellerStoreActions.setSellerData(jsonData));
            closingIconHandler();
          }
        } else {
          dispatch(
            mainStoreSliceActions.setAPICallMessage("Undefined Returned")
          );
          dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          Promise.reject();
        }
      });
  };

  return (
    <>
      {newPostPopupActive && (
        <div
          className={classes.newPostBackdrop}
          onClick={dialogBackdropClickHandler}
          id="new-post-backdrop"
        >
          <form
            className={classes.newPostContentContainer}
            encType="multipart/form-data"
            onSubmit={submitHandler}
            method="POST"
          >
            <div
              className={classes.closingContainer}
              onClick={closingIconHandler}
            >
              <XMarkIcon className={classes.closingIcon} />
            </div>
            <h6 className={classes.popupTitle}>New Post</h6>
            <img src={decor} alt="text-decor" className={classes.textDecor} />
            <div className={classes.inputContainer}>
              <label
                className={`${classes.inputLabel} ${
                  inputLogicObject.titlePostInput.labelMoveout &&
                  classes.activeInputLabel
                } ${apiCallMessageType === "ERROR" && classes.errorText}`}
                onClick={inputLabelClickHandler}
                htmlFor="titlePostInput"
              >
                Title
              </label>
              <input
                className={`${classes.titleInput} ${
                  apiCallMessageType === "ERROR" && classes.inputError
                }`}
                id="titlePostInput"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
                maxLength={30}
              />
            </div>
            <div
              className={`${classes.inputPriceContainer} ${
                apiCallMessageType === "ERROR" && classes.inputError
              } ${priceInputFocused && classes.activeInputContainer}`}
            >
              <select
                className={`${classes.priceSelectContainer} ${
                  apiCallMessageType === "ERROR" && classes.errorText
                }`}
                onChange={priceTypeSelectionHandler}
              >
                <option className={classes.priceOption}>USD</option>
                <option className={classes.priceOption}>CAD</option>
                <option className={classes.priceOption}>EUR</option>
              </select>
              <label
                className={`${classes.priceInputLabel} ${
                  inputLogicObject.pricePostInput.labelMoveout &&
                  classes.activeInputLabel
                } ${apiCallMessageType === "ERROR" && classes.errorText}`}
                onClick={inputLabelClickHandler}
                htmlFor="pricePostInput"
              >
                Price
              </label>
              <input
                className={`${classes.priceInput} ${
                  apiCallMessageType === "ERROR" && classes.errorText
                } `}
                id="pricePostInput"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
                maxLength={6}
              />
            </div>
            <div className={classes.descriptionContainer}>
              <label
                htmlFor="descriptionPostInput"
                className={classes.descriptionLabel}
              >
                Description
              </label>
              <textarea
                id="descriptionPostInput"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
                maxLength={200}
                rows={3}
                cols={33}
                className={classes.descriptionInput}
              />
              <p className={classes.characterRemainingText}>
                {inputLogicObject.descriptionPostInput.inputData.length}/200
              </p>
            </div>
            <div className={classes.productContainer}>
              Product Type:
              <select
                className={classes.productSelection}
                onChange={productTypeSelectionHandler}
              >
                <option className={classes.productOption}>Ceramics</option>
                <option className={classes.productOption}>Clocks</option>
                <option className={classes.productOption}>Tablewear</option>
                <option className={classes.productOption}>Paintings</option>
                <option className={classes.productOption}>Electronics</option>
              </select>
            </div>
            <div className={classes.productContainer}>
              Quantity:
              <select
                className={classes.productSelection}
                onChange={quantityHandler}
              >
                {renderReadyQuantitySelects}
              </select>
            </div>

            {sellerNewPostProductCategory.length !== 0 && (
              <NewPostSelectionDropdrop
                productType={sellerNewPostProductCategory}
                returnFunction={dropDownSelectionHandler}
              />
            )}

            <div className={classes.productContainer}>
              Image Upload:
              <input
                className={classes.imageInput}
                type="file"
                ref={imageInputRef}
                onChange={fileInputHandler}
              />
            </div>

            <button className={classes.submitButton} type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default NewPostPopup;
