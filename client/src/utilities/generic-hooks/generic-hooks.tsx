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
