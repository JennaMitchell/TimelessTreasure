import classes from "./new-post-popup.module.scss";
import { XMarkIcon } from "@heroicons/react/24/outline";
import decor from "../../../images/homepage/decor/decor.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import React, { useState, useEffect, useRef } from "react";
import NewPostSelectionDropdrop from "./selection-dropdown/new-post-selection-dropdown";
import productTypeSubSelection from "./product-type-sub-selection";
import { newProductCall } from "../../../utilities/product-api-hooks/seller-product-hooks";
import keyIdGenerator from "../../../utilities/key-id-generator/key-id-generator";
import { priceValidator } from "../../../utilities/validation-hooks/validation-hooks";
import { priceInputCleaner } from "../../../utilities/generic-hooks/generic-hooks";
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
  const closingIconHandler = () => {
    setProductType("Ceramics");
    dispatch(mainStoreSliceActions.setPostPopupType("Ceramics"));
    dispatch(mainStoreSliceActions.setNewPostPopupActive(false));
    dispatch(mainStoreSliceActions.setLockViewPort(false));
  };
  const newPostPopupActive = useAppSelector(
    (state) => state.mainStore.newPostPopupActive
  );
  const postPopupType = useAppSelector(
    (state) => state.mainStore.postPopupType
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
  const [productType, setProductType] = useState("Ceramics");

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
  });

  const apiCallMessageType = useAppSelector(
    (state) => state.mainStore.apiCallMessageType
  );

  const productTypeSelectionHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    setProductType(e.target.value);
  };
  const priceTypeSelectionHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    dispatch(mainStoreSliceActions.setPostPopupType(e.target.value));
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
  };
  const inputBlurHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();
    if (copyOfInputObject[targetElement.id].inputData.length === 0) {
      copyOfInputObject[targetElement.id].labelMoveout =
        !copyOfInputObject[targetElement.id].labelMoveout;
      setInputLogicObject(copyOfInputObject);
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

    const data = productTypeSubSelection[productType];
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
    if (!acceptedProductTypes.includes(productType)) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Invalid Product Type!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    const formData = new FormData();

    if (imageInputRef.current !== null) {
      const imageInput = imageInputRef.current as HTMLInputElement;
      console.log(imageInput.value.length);
      if (imageInput?.files !== null) {
        formData.append("image", imageInput.files[0]);
      }
      if (imageInput.value.length === 0) {
        dispatch(mainStoreSliceActions.setAPICallMessage("No image added!"));
        dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
        return;
      }
    }

    formData.append("tags", JSON.stringify(dropDownSelectedTypes));

    formData.append("title", inputLogicObject.titlePostInput.inputData);
    formData.append(
      "price",
      priceInputCleaner(inputLogicObject.pricePostInput.inputData)
    );
    formData.append("quantity", JSON.stringify(productQuantity));
    formData.append("priceType", postPopupType);
    formData.append("productType", productType);

    const productId = keyIdGenerator();
    formData.append("productId", productId);
    formData.append("userId", userId);
    formData.append("status", "For Sale");

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
          closingIconHandler();
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
                className={`${classes.userInput} ${
                  apiCallMessageType === "ERROR" && classes.inputError
                }`}
                id="titlePostInput"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
              />
            </div>
            <div
              className={`${classes.inputPriceContainer} ${
                apiCallMessageType === "ERROR" && classes.inputError
              }`}
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
              />
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

            {productType.length !== 0 && (
              <NewPostSelectionDropdrop
                productType={productType}
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
