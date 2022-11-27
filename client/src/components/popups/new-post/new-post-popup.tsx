import classes from "./new-post-popup.module.scss";
import { XMarkIcon } from "@heroicons/react/24/outline";
import decor from "../../../images/homepage/decor/decor.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import React, { useState, useEffect, useRef } from "react";
import NewPostSelectionDropdrop from "./selection-dropdown/new-post-selection-dropdown";
import productTypeSubSelection from "../../../utilities/product-type-sub-selection";
import { newProductCall } from "../../../utilities/product-api-hooks/seller-product-hooks";
import { randomKeyGenerator } from "../../../utilities/generic-hooks/generic-hooks";
import { priceValidator } from "../../../utilities/validation-hooks/validation-hooks";
import { priceInputCleaner } from "../../../utilities/generic-hooks/generic-hooks";
import { sellerStoreActions } from "../../../store/seller";
import { getSellersItemsForSaleCall } from "../../../utilities/product-api-hooks/seller-product-hooks";
import { CheckIcon } from "@heroicons/react/24/solid";

interface SelectedTypes {
  [key: string]: string;
}
const NewPostPopup = () => {
  const maxQuantity = 99;
  const dispatch = useAppDispatch();
  const sellerNewPostTags = useAppSelector(
    (state) => state.sellerStore.sellerNewPostTags
  );
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

  const acceptedProductTypes = [
    "Ceramics",
    "Clocks",
    "Tablewear",
    "Paintings",
    "Electronics",
  ];

  const [initialRender, setInitialRender] = useState(false);

  const sellerNewProductQuantity = useAppSelector(
    (state) => state.sellerStore.sellerNewProductQuantity
  );

  const [priceInputFocused, setPriceInputFocused] = useState(false);
  const closingIconHandler = () => {
    dispatch(sellerStoreActions.setSellerNewPostPriceType("USD"));
    dispatch(sellerStoreActions.setSellerNewPostProductCategory("Ceramics"));
    dispatch(sellerStoreActions.setSellerNewPostTags({}));
    dispatch(mainStoreSliceActions.setNewPostPopupActive(false));
    dispatch(mainStoreSliceActions.setLockViewPort(false));
    dispatch(sellerStoreActions.setSellerNewProductQuantity(1));
  };
  const newPostSelectedPhotoKey = useAppSelector(
    (state) => state.sellerStore.newPostSelectedPhotoKey
  );

  const mainContainerRef = useRef(null);
  const backdropRef = useRef(null);
  const [dropDownSelectedTypes, setDropDownSelectedTypes] =
    useState<SelectedTypes>({});

  const dropDownSelectionHandler = (selectedTypes: SelectedTypes) => {
    setDropDownSelectedTypes(selectedTypes);
  };

  const sellerNewProductInputLogicObject = useAppSelector(
    (state) => state.sellerStore.sellerNewProductInputLogicObject
  );

  // const [inputLogicObject, setInputLogicObject] = useState<LogicObject>({
  //   titlePostInput: {
  //     labelMoveout: false,
  //     inputData: "",
  //   },
  //   pricePostInput: {
  //     labelMoveout: false,
  //     inputData: "",
  //   },
  //   descriptionPostInput: {
  //     labelMoveout: false,
  //     inputData: "",
  //   },
  // });

  useEffect(() => {
    if (mainContainerRef.current != null && backdropRef.current != null) {
      const windowHeight = window.innerHeight;
      const mainContainerPopupCurrent =
        mainContainerRef.current as HTMLFormElement;
      const currentbackDrop = backdropRef.current as HTMLDivElement;

      const popupHeight = mainContainerPopupCurrent.clientHeight;

      if (popupHeight > windowHeight) {
        dispatch(mainStoreSliceActions.setLockScreenHeight(popupHeight));
        currentbackDrop.style.height = `${popupHeight}`;

        currentbackDrop.style.overflowY = `scroll`;
      } else {
        dispatch(mainStoreSliceActions.setLockScreenHeight(0));
      }
    }
  }, [dispatch]);

  const resizeLockedHeightHandler = () => {
    if (mainContainerRef.current != null) {
      const windowHeight = window.innerHeight;
      const mainContainerPopupCurrent =
        mainContainerRef.current as HTMLFormElement;
      const popupHeight = mainContainerPopupCurrent.clientHeight;
      if (backdropRef.current != null) {
        const currentbackDrop = backdropRef.current as HTMLDivElement;

        if (popupHeight > windowHeight) {
          dispatch(mainStoreSliceActions.setLockScreenHeight(popupHeight));
          currentbackDrop.style.height = `${popupHeight}`;
          currentbackDrop.style.overflowY = `scroll`;
        }
      }
    }
  };
  window.addEventListener("resize", resizeLockedHeightHandler);

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
    dispatch(
      sellerStoreActions.setSellerNewProductQuantity(+targetElement.value)
    );
  };

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
    }
  }, [newPostPopupActive, initialRender]);

  const dialogBackdropClickHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;

    if (targetElement.id === "new-post-backdrop") {
      closingIconHandler();
    }
  };
  const inputCopyObjectHandler = () =>
    JSON.parse(JSON.stringify(sellerNewProductInputLogicObject));

  const inputChangeHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();

    if (!copyOfInputObject[targetElement.id].labelMoveout) {
      copyOfInputObject[targetElement.id].labelMoveout = true;
    }
    copyOfInputObject[targetElement.id].inputData = targetElement.value;
    dispatch(
      sellerStoreActions.setSellerNewProductInputLogicObject(copyOfInputObject)
    );
  };
  const inputFocusHandler = (e: React.ChangeEvent) => {
    const targetElement = e.target as HTMLInputElement;
    const copyOfInputObject = inputCopyObjectHandler();
    if (copyOfInputObject[targetElement.id].inputData.length === 0) {
      copyOfInputObject[targetElement.id].labelMoveout =
        !copyOfInputObject[targetElement.id].labelMoveout;
      dispatch(
        sellerStoreActions.setSellerNewProductInputLogicObject(
          copyOfInputObject
        )
      );
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
      dispatch(
        sellerStoreActions.setSellerNewProductInputLogicObject(
          copyOfInputObject
        )
      );
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
    dispatch(
      sellerStoreActions.setSellerNewProductInputLogicObject(copyOfInputObject)
    );
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

    if (newPostSelectedPhotoKey.length === 0) {
      dispatch(mainStoreSliceActions.setAPICallMessage("Select A Photo!"));
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }

    if (
      sellerNewProductInputLogicObject.titlePostInput.inputData.length === 0
    ) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a title!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));

      return;
    }
    if (
      sellerNewProductInputLogicObject.pricePostInput.inputData.length === 0
    ) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a price!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    if (
      priceValidator(sellerNewProductInputLogicObject.pricePostInput.inputData)
    ) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please enter a valid price!")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    if (sellerNewProductQuantity <= 0 || sellerNewProductQuantity >= 99) {
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
    // const formData = new FormData();

    // if (imageInputRef.current !== null) {
    //   const imageInput = imageInputRef.current as HTMLInputElement;

    //   // if (imageInput?.files !== null) {
    //   //   formData.append("image", imageInput.files[0]);
    //   // }
    //   if (imageInput.value.length === 0) {
    //     dispatch(mainStoreSliceActions.setAPICallMessage("No image added!"));
    //     dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
    //     return;
    //   }
    // }
    if (
      sellerNewProductInputLogicObject.descriptionPostInput.inputData.trim()
        .length === 0
    ) {
      dispatch(
        mainStoreSliceActions.setAPICallMessage("Please add a description.")
      );
      dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
      return;
    }
    const productId = randomKeyGenerator(20);
    const today = new Date();
    const utc = today.toUTCString();
    const indexOfUtcComma = utc.indexOf(",");
    const utcSliced = utc.slice(indexOfUtcComma + 1).trim();

    const requestDataObject = {
      title: sellerNewProductInputLogicObject.titlePostInput.inputData,
      price: priceInputCleaner(
        sellerNewProductInputLogicObject.pricePostInput.inputData
      ),
      quantity: JSON.stringify(sellerNewProductQuantity),
      priceType: sellerNewPostPriceType,
      productType: sellerNewPostProductCategory,
      productTags: JSON.stringify(Object.values(sellerNewPostTags)),
      productId: productId,
      userId: userId,
      status: "For Sale",
      description:
        sellerNewProductInputLogicObject.descriptionPostInput.inputData,
      imageKey: newPostSelectedPhotoKey,
      date: utcSliced,
    };

    newProductCall(dispatch, requestDataObject, userToken)
      .then((data) => {
        console.log(data);
        return data?.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
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

          dispatch(sellerStoreActions.setNewPostSelectedPhotoKey(""));
          dispatch(
            sellerStoreActions.setSellerNewProductInputLogicObject({
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
            })
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

  const selectAnImageHandler = () => {
    dispatch(mainStoreSliceActions.setNewPostPopupActive(false));
    dispatch(mainStoreSliceActions.setPictureSelectionPopupActive(true));
  };

  // console.log(sellerNewPostTags);
  // console.log(Object.values(sellerNewPostTags));
  // console.log(JSON.stringify(Object.values(sellerNewPostTags)));
  return (
    <>
      {newPostPopupActive && (
        <div
          className={classes.newPostBackdrop}
          onClick={dialogBackdropClickHandler}
          id="new-post-backdrop"
          ref={backdropRef}
        >
          <form
            className={classes.newPostContentContainer}
            encType="multipart/form-data"
            onSubmit={submitHandler}
            method="POST"
            ref={mainContainerRef}
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
                  sellerNewProductInputLogicObject.titlePostInput
                    .labelMoveout && classes.activeInputLabel
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
                defaultValue={
                  sellerNewProductInputLogicObject.titlePostInput.inputData
                }
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
                  sellerNewProductInputLogicObject.pricePostInput
                    .labelMoveout && classes.activeInputLabel
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
                defaultValue={
                  sellerNewProductInputLogicObject.pricePostInput.inputData
                }
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
                defaultValue={
                  sellerNewProductInputLogicObject.descriptionPostInput
                    .inputData
                }
              />
              <p className={classes.characterRemainingText}>
                {
                  sellerNewProductInputLogicObject.descriptionPostInput
                    .inputData.length
                }
                /200
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
                className={classes.quantitySelection}
                onChange={quantityHandler}
                defaultValue={sellerNewProductQuantity}
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
              <button
                className={classes.imageSelectButton}
                onClick={selectAnImageHandler}
              >
                Select an Image
              </button>
              <div className={classes.imageDescriptionContainer}>
                {newPostSelectedPhotoKey.length !== 0 && (
                  <CheckIcon className={classes.imageSelectionCheckmark} />
                )}
                {newPostSelectedPhotoKey.length === 0 && (
                  <XMarkIcon className={classes.imageSelectionXmark} />
                )}
              </div>
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
