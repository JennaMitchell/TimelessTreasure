import classes from "./edit-post-popup.module.scss";
import { XMarkIcon } from "@heroicons/react/24/outline";
import decor from "../../../images/homepage/decor/decor.png";
import React, { useRef, useState } from "react";
import { updateProductCall } from "../../../utilities/product-api-hooks/seller-product-hooks";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import { priceValidator } from "../../../utilities/validation-hooks/validation-hooks";
import { priceInputCleaner } from "../../../utilities/generic-hooks/generic-hooks";
import {
  imageUrlCreator,
  priceStringCreator,
} from "../../../utilities/generic-hooks/generic-hooks";
import Spinner from "../../spinner/spinner";
interface Props {
  productImage: string;
  productTitle: string;
  productPrice: string;
  productPriceType: string;
  productQty: string;
  productId: string;
  productDescription: string;
}
interface LogicObject {
  [key: string]: {
    labelMoveout: boolean;
    inputData: string;
  };
}
const EditPostPopup = ({
  productImage,
  productTitle,
  productPrice,
  productPriceType,
  productQty,
  productId,
  productDescription,
}: Props) => {
  const productImageUrl = imageUrlCreator(productImage);
  let tempPrice = priceStringCreator(productPrice, productPriceType);

  const closeHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(false));
    dispatch(mainStoreSliceActions.setEditPostPopup(false));
    dispatch(mainStoreSliceActions.setActiveEditPostPopupId(""));
  };
  const dispatch = useAppDispatch();
  const [selectedPriceType, setSelectedPrice] = useState(productPriceType);
  const [selectedQuantity, setSelectedQuantity] = useState(productQty);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const userId = useAppSelector((state) => state.userStore.userId);
  const newImageRef = useRef(null);
  const userToken = useAppSelector((state) => state.userStore.userToken);
  const maxQuantity = 99;
  const renderReadyQuantityOptions: any[] = [];

  for (let quantityIndex = 0; quantityIndex < maxQuantity; quantityIndex++) {
    renderReadyQuantityOptions.push(
      <option
        className={classes.quantityOption}
        key={`quantity-option-${quantityIndex + 1}`}
      >
        {quantityIndex + 1}
      </option>
    );
  }

  const apiCallMessageType = useAppSelector(
    (state) => state.mainStore.apiCallMessageType
  );
  const priceTypeSelectionHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    setSelectedPrice(e.target.value);
  };

  const acceptedImageFormats = ["png", "jpg", "jpeg"];
  const acceptedProductTypes = ["USD", "CAD", "EUR"];
  const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
    titleEditPostInput: {
      labelMoveout: false,
      inputData: productTitle,
    },
    priceEditPostInput: {
      labelMoveout: false,
      inputData: tempPrice,
    },
    descriptionPostInput: {
      labelMoveout: false,
      inputData: productDescription,
    },
  });

  const quantiySelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedQuantity(e.target.value);
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

  const fileInputHandler = () => {
    if (newImageRef.current != null) {
      const imageInput = newImageRef.current as HTMLInputElement;

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

  const confirmButtonHandler = () => {
    if (inputLogicObject.titleEditPostInput.inputData.length === 0) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a title!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));

      return;
    }
    if (inputLogicObject.priceEditPostInput.inputData.length === 0) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a price!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    if (priceValidator(inputLogicObject.priceEditPostInput.inputData)) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a valid price!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    if (+selectedQuantity <= 0 || +selectedQuantity >= 99) {
      dispatch(mainStoreSliceActions.setAPICallMessage("Invalid Quantity!"));
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    if (!acceptedProductTypes.includes(selectedPriceType)) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Invalid Product Type!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    if (inputLogicObject.descriptionPostInput.inputData.trim().length === 0) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a description!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }

    const newFormData = new FormData();
    newFormData.append("quantity", selectedQuantity);
    newFormData.append("title", inputLogicObject.titleEditPostInput.inputData);
    newFormData.append(
      "price",
      priceInputCleaner(inputLogicObject.priceEditPostInput.inputData)
    );
    newFormData.append("productId", productId);
    newFormData.append("priceType", selectedPriceType);
    newFormData.append("userId", userId);
    newFormData.append(
      "description",
      inputLogicObject.descriptionPostInput.inputData
    );
    if (newImageRef.current !== null) {
      const imageInput = newImageRef.current as HTMLInputElement;
      if (imageInput?.files !== null && imageInput.value.length !== 0) {
        newFormData.append("image", imageInput.files[0]);
      }
    }
    setSubmitButtonClicked(true);
    setTimeout(() => {
      updateProductCall(dispatch, newFormData, userToken)
        .then((data) => {
          return data?.json();
        })
        .then((jsonData) => {
          if ("error" in jsonData) {
            if (jsonData.error.length !== 0) {
              dispatch(
                mainStoreSliceActions.setAPICallMessage(jsonData.message)
              );
              dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
              setSubmitButtonClicked(false);
            }
          } else {
            dispatch(mainStoreSliceActions.setAPICallMessage("Product Edited"));
            dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
            setSubmitButtonClicked(false);
            closeHandler();
          }
        });
    }, 3000);
  };

  return (
    <div className={classes.backdrop} id="edit-post-backdrop">
      <div className={classes.popupContainer}>
        <div className={classes.closingContainer} onClick={closeHandler}>
          <XMarkIcon className={classes.closingIcon} />
        </div>
        <h6 className={classes.popupTitle}>Edit</h6>
        <img src={decor} alt="text-decor" className={classes.textDecor} />
        <img
          className={classes.productImage}
          alt="product"
          src={productImageUrl}
        />
        <div className={classes.imageInputContainer}>
          <p className={classes.imageInputText}>New Image:</p>
          <input
            className={classes.newImageInput}
            maxLength={30}
            type="file"
            onChange={fileInputHandler}
            ref={newImageRef}
          />
        </div>
        <div
          className={`${classes.titleInputContainer} ${
            inputLogicObject.titleEditPostInput.labelMoveout &&
            classes.focusedHandler
          }`}
        >
          <label
            htmlFor="titleEditPostInput"
            className={`${classes.titleLabel} ${classes.inputLabel}`}
          >
            Title
          </label>
          <input
            className={classes.titleProductInput}
            defaultValue={productTitle}
            maxLength={30}
            id={"titleEditPostInput"}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            onFocus={inputFocusHandler}
          />
        </div>
        <div className={classes.priceInputContainer}>
          <label
            htmlFor="priceEditPostInput"
            className={`${classes.priceLabel} ${classes.inputLabel}`}
          >
            Price
          </label>
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
          <input
            className={classes.priceProductInput}
            defaultValue={tempPrice}
            maxLength={30}
            id={"priceEditPostInput"}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            onFocus={inputFocusHandler}
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
            defaultValue={productDescription}
          />
          <p className={classes.characterRemainingText}>
            {inputLogicObject.descriptionPostInput.inputData.length}/200
          </p>
        </div>
        <div className={classes.quantityInputContainer}>
          <label
            className={`${classes.quantityLabel}`}
            htmlFor={"quantityEditPostSelect"}
          >
            Qty.
          </label>
          <select
            className={classes.quantitySelect}
            id={"quantityEditPostSelect"}
            onChange={quantiySelectHandler}
            defaultValue={productQty}
          >
            {renderReadyQuantityOptions}
          </select>
        </div>

        <button
          className={classes.actionButton}
          onClick={confirmButtonHandler}
          id="confirm-edit-post-button"
        >
          {submitButtonClicked && (
            <Spinner
              initialRender={true}
              parentButtonId={"confirm-edit-post-button"}
            />
          )}
          {!submitButtonClicked && "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default EditPostPopup;
