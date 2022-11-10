import { marketplaceStoreActions } from "../../store/marketplace";
import { mainStoreSliceActions } from "../../store/store";
import {
  lowerCaseLetters,
  numbers,
  upperCaseLettersArray,
  priceConversionObject,
} from "../constants/constants";

export const priceInputCleaner = (price: string) => {
  const firstCharacterRegexExpression = /[$€]/;
  const periodRegexExpression = /[.]/;
  let finalPrice = price.trim();
  if (firstCharacterRegexExpression.test(price)) {
    finalPrice = finalPrice.slice(1);
  }

  if (periodRegexExpression.test(price)) {
    const indexOfDecimal = price.indexOf(".");
    if (price.length - indexOfDecimal > 2) {
      finalPrice = finalPrice.slice(0, indexOfDecimal + 3);
    }
  } else {
    finalPrice = finalPrice + ".00";
  }

  return finalPrice;
};

export const convertPrice = (
  productsCurrentPriceType: string,
  newProductPriceType: string,
  price: number
) => {
  if (
    productsCurrentPriceType.toUpperCase().trim() ===
    newProductPriceType.toUpperCase().trim()
  ) {
    return price;
  }

  const objectKey =
    productsCurrentPriceType.toUpperCase().trim() +
    "to" +
    newProductPriceType.toUpperCase().trim();
  const conversion = priceConversionObject[objectKey];
  const finalPrice = conversion * price;
  return finalPrice.toFixed(2);
};
export const capitalizeFirstLetter = (input: string) => {
  return input.trim().charAt(0).toUpperCase() + input.slice(1);
};

export const dropDownNavCategoryHandler = (
  buttonId: string,
  dispatch: any,
  navigate: any
) => {
  const indexOfNav = buttonId.indexOf("nav");
  const fullCategoryString = buttonId.slice(0, indexOfNav);
  const productType = capitalizeFirstLetter(
    fullCategoryString.slice(0, fullCategoryString.indexOf("-"))
  );
  let categoryType = fullCategoryString.slice(productType.length + 1);

  const capitalLetterRegex = /[A-Z]/;
  let numberOfCaptialLetters = 0;
  const arrayOfCapitalLetterIndexs: number[] = [];
  const splitLetterArray: string[] = [];

  if (capitalLetterRegex.test(categoryType)) {
    for (
      let indexOfLetter = 0;
      indexOfLetter < categoryType.length;
      indexOfLetter++
    ) {
      if (capitalLetterRegex.test(categoryType[indexOfLetter])) {
        numberOfCaptialLetters = numberOfCaptialLetters + 1;
        arrayOfCapitalLetterIndexs.push(indexOfLetter);
      }
    }

    for (let x = 0; x < arrayOfCapitalLetterIndexs.length; x++) {
      if (x === 0) {
        splitLetterArray.push(
          categoryType.slice(0, arrayOfCapitalLetterIndexs[x])
        );
      } else {
        splitLetterArray.push(
          categoryType.slice(
            arrayOfCapitalLetterIndexs[x - 1] + 1,
            arrayOfCapitalLetterIndexs[x]
          )
        );
      }
    }
    splitLetterArray.push(
      categoryType.slice(
        arrayOfCapitalLetterIndexs[arrayOfCapitalLetterIndexs.length - 1],
        categoryType.length - 1
      )
    );
    categoryType = splitLetterArray.join(" ");
  } else {
    categoryType = categoryType.slice(0, categoryType.length - 1);
  }

  dispatch(
    marketplaceStoreActions.setActiveTags([
      capitalizeFirstLetter(categoryType),
      productType,
    ])
  );

  navigate("/marketplace");
};

export const imageUrlCreator = (url: string) => {
  return "http://localhost:5000/" + url;
};

export const tempEmailGenerator = (isSeller: boolean) => {
  const lengthOfId = 10;

  const idArray = lowerCaseLetters.concat(numbers, upperCaseLettersArray);
  let createdKey = [];
  for (let idIndex = 0; idIndex < lengthOfId; idIndex++) {
    const randomIndex = Math.floor(Math.random() * idArray.length);
    createdKey.push(idArray[randomIndex]);
  }

  if (isSeller) {
    return "testSeller" + createdKey.join("") + "@test.com";
  } else {
    return "testBuyer" + createdKey.join("") + "@test.com";
  }
};

export const randomKeyGenerator = (keyLength: number) => {
  const idArray = lowerCaseLetters.concat(numbers, upperCaseLettersArray);
  let createdKey = [];
  for (let idIndex = 0; idIndex < keyLength; idIndex++) {
    const randomIndex = Math.floor(Math.random() * idArray.length);
    createdKey.push(idArray[randomIndex]);
  }
  return createdKey.join("");
};

export const priceStringCreator = (price: string, priceType: string) => {
  let tempPrice = "";
  if (priceType === "USD" || priceType === "CAD") {
    tempPrice = "$" + price;
  } else {
    tempPrice = "€" + price;
  }
  return tempPrice;
};

export const closeApiMessageDropDown = (dispatch: any) => {
  dispatch(mainStoreSliceActions.setAPICallMessage(""));
  dispatch(mainStoreSliceActions.setAPICallMessageType(""));
  dispatch(mainStoreSliceActions.setApiCallDropdownActive(false));
  dispatch(mainStoreSliceActions.setApiCallDropDownMove(false));
};
