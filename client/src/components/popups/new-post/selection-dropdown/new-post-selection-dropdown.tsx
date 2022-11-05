import productTypeSubSelection from "../../../../utilities/product-type-sub-selection";
import classes from "./new-post-selection-dropdown.module.scss";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { userStoreSliceActions } from "../../../../store/user-store";
import { sellerStoreActions } from "../../../../store/seller";

interface SelectedItem {
  [key: string]: string;
}
interface Props {
  productType: string;
  returnFunction: (typeObject: SelectedItem) => void;
}

const NewPostSelectionDropdrop = ({ productType, returnFunction }: Props) => {
  const [activeDropdowns, setActiveDropdowns] = useState<boolean[]>([]);

  const sellerNewPostTags = useAppSelector(
    (state) => state.sellerStore.sellerNewPostTags
  );
  const dispatch = useAppDispatch();

  const [savedProductType, setSavedProductType] = useState(productType);
  const [initialRender, setInitialRender] = useState(false);
  const productTypes = Object.keys(productTypeSubSelection);
  const productData = Object.values(productTypeSubSelection);
  const indexOfProductType = productTypes.indexOf(productType);

  const selectedProductData = productData[indexOfProductType];

  const selectedDataTypes = Object.keys(selectedProductData);
  const selectedDataData = Object.values(selectedProductData);

  const renderReadySelectionData: any[] = [[], [], [], [], []];

  const checkBoxHandler = (
    e: React.MouseEvent<HTMLElement | SVGSVGElement>
  ) => {
    e.preventDefault();
    const targetElement = e.target as HTMLElement;
    let targetId = targetElement.id;
    if (targetId.length === 0 && targetElement.parentElement != null) {
      targetId = targetElement.parentElement.id;
    }
    const indexOfDash = targetId.indexOf("-");
    const selectedItem = targetId.slice(0, indexOfDash);
    const cutArray = targetId.slice(indexOfDash + 1);

    const indexOfSecondDash = cutArray.indexOf("-");
    const type = cutArray.slice(0, indexOfSecondDash);

    let copyOfSelectedTags = JSON.parse(JSON.stringify(sellerNewPostTags));

    if (copyOfSelectedTags[type] === selectedItem) {
      copyOfSelectedTags[type] = "";
    } else {
      copyOfSelectedTags[type] = selectedItem;
    }
    dispatch(sellerStoreActions.setSellerNewPostTags(copyOfSelectedTags));

    returnFunction(copyOfSelectedTags);
  };

  for (let i = 0; i < selectedDataData.length; i++) {
    const dataArray = selectedDataData[i];
    const typeTitle = selectedDataTypes[i];
    for (let q = 0; q < dataArray.length; q++) {
      renderReadySelectionData[i].push(
        <div
          className={classes.checkBoxContainer}
          key={`${dataArray[q]}-${q}-key`}
          onClick={checkBoxHandler}
          id={`${dataArray[q]}-${typeTitle}-${q}`}
        >
          <div
            className={classes.checkMarkContainer}
            id={`${dataArray[q]}-${typeTitle}-${q}-checkmark-container`}
            onClick={checkBoxHandler}
          >
            {sellerNewPostTags[typeTitle] === dataArray[q] && (
              <CheckIcon
                className={classes.checkIcon}
                id={`${dataArray[q]}-${typeTitle}-${q}-checkmark`}
                onClick={checkBoxHandler}
              />
            )}
          </div>
          {dataArray[q]}
        </div>
      );
    }
  }
  const renderReadyDropDowns = [];

  let tempInitialLogicObject = [];
  let tempLogicObject: SelectedItem = {};

  if (productType !== savedProductType) {
    setActiveDropdowns([]);

    if (!initialRender) {
      setInitialRender(true);
    } else {
      dispatch(sellerStoreActions.setSellerNewPostTags({}));
    }

    setSavedProductType(productType);
  }

  if (activeDropdowns.length === 0) {
    for (let r = 0; r < selectedDataTypes.length; r++) {
      tempInitialLogicObject.push(false);
      tempLogicObject[selectedDataTypes[r]] = "";

      if (r === selectedDataTypes.length - 1) {
        setActiveDropdowns(tempInitialLogicObject);
        if (!initialRender) {
          setInitialRender(true);
        } else {
          dispatch(sellerStoreActions.setSellerNewPostTags(tempLogicObject));
        }
        setSavedProductType(productType);
      }
    }
  }
  const dropdownButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = e.target as HTMLButtonElement;
    const buttonId = targetElement.id;
    const buttonIndexStart = buttonId.indexOf("-");
    const buttonIndex = +buttonId.slice(buttonIndexStart + 1, buttonId.length);

    const copyOfLogicObject = activeDropdowns.slice();
    copyOfLogicObject[buttonIndex] = !copyOfLogicObject[buttonIndex];
    setActiveDropdowns(copyOfLogicObject);
  };

  if (activeDropdowns.length !== 0) {
    for (let index = 0; index < selectedDataTypes.length; index++) {
      renderReadyDropDowns.push(
        <div
          className={classes.dropDownHeaderButton}
          key={`${selectedDataTypes[index]}-${index}`}
        >
          <button
            className={classes.buttonTitle}
            id={`button-${index}`}
            onClick={dropdownButtonHandler}
          >
            {selectedDataTypes[index]}
            {!activeDropdowns[index] && (
              <ChevronDownIcon className={classes.buttonActiveIcon} />
            )}
            {activeDropdowns[index] && (
              <ChevronUpIcon className={classes.buttonActiveIcon} />
            )}
          </button>
          {activeDropdowns[index] && (
            <div className={classes.dropdownSelectionContainer}>
              {renderReadySelectionData[index]}
            </div>
          )}
        </div>
      );
    }
  }
  if (renderReadyDropDowns.length === 0) {
    return <div></div>;
  } else {
    return <>{renderReadyDropDowns} </>;
  }
};
export default NewPostSelectionDropdrop;
