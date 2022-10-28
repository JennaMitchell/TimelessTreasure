export const requiredValidation = (value: string) => {
  return value.trim() !== "";
};

export const emailValidator = (email: string) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let error = false;
  if (!email.match(validRegex)) {
    error = true;
  }
  return error;
};

export const signupPasswordValidator = (
  password: string,
  confirmationPassword: string
) => {
  // Assuming that all errors are inactive "false"
  // true = error present , false - no error
  const errorObject = {
    eightCharacters: false,
    lowercase: false,
    uppercase: false,
    symbol: false,
    number: false,
    noSpaces: false,
    invalidSymbols: false,
    matchingPasswords: false,
  };
  const lowercaseRegexExpression = /[a-z]/;
  const uppercaseRegexExpression = /[A-Z]/;
  const numberRegexExpression = /[0-9]/;
  const symbolRegexExpression = /[@$!%*#?&]/;
  const invalidRegexExpression = /[a-zA-Z0-9@$!%*#?&\s]/g;
  const vaildExpressions = password.match(invalidRegexExpression) || "";

  const numberOfInvalidExpressions = password.length - vaildExpressions.length;

  const spaceRegexExpression = /\s/g;

  if (password.length <= 8) {
    errorObject.eightCharacters = true;
  }
  if (!lowercaseRegexExpression.test(password)) {
    errorObject.lowercase = true;
  }
  if (!uppercaseRegexExpression.test(password)) {
    errorObject.uppercase = true;
  }
  if (!numberRegexExpression.test(password)) {
    errorObject.number = true;
  }
  if (!symbolRegexExpression.test(password)) {
    errorObject.symbol = true;
  }

  if (numberOfInvalidExpressions !== 0) {
    errorObject.invalidSymbols = true;
  }

  if (spaceRegexExpression.test(password)) {
    errorObject.noSpaces = true;
  }
  if (password.trim() !== confirmationPassword.trim()) {
    errorObject.matchingPasswords = true;
  }
  return errorObject;
};

export const loginPasswordValidator = (password: string) => {
  // Assuming that all errors are inactive "false"
  // true = error present , false - no error
  const errorObject = {
    eightCharacters: false,
    lowercase: false,
    uppercase: false,
    symbol: false,
    number: false,
    noSpaces: false,
    invalidSymbols: false,
  };
  const lowercaseRegexExpression = /[a-z]/;
  const uppercaseRegexExpression = /[A-Z]/;
  const numberRegexExpression = /[0-9]/;
  const symbolRegexExpression = /[@$!%*#?&]/;
  const invalidRegexExpression = /[a-zA-Z0-9@$!%*#?&\s]/g;
  const vaildExpressions = password.match(invalidRegexExpression) || "";

  const numberOfInvalidExpressions = password.length - vaildExpressions.length;

  const spaceRegexExpression = /\s/g;

  if (password.length <= 8) {
    errorObject.eightCharacters = true;
  }
  if (!lowercaseRegexExpression.test(password)) {
    errorObject.lowercase = true;
  }
  if (!uppercaseRegexExpression.test(password)) {
    errorObject.uppercase = true;
  }
  if (!numberRegexExpression.test(password)) {
    errorObject.number = true;
  }
  if (!symbolRegexExpression.test(password)) {
    errorObject.symbol = true;
  }

  if (numberOfInvalidExpressions !== 0) {
    errorObject.invalidSymbols = true;
  }

  if (spaceRegexExpression.test(password)) {
    errorObject.noSpaces = true;
  }

  // Checking for false values

  const errorObjectValues = Object.values(errorObject);

  const validPassword = !errorObjectValues.includes(false);

  return validPassword;
};

export const priceValidator = (price: string) => {
  const trimmedPrice = price.trim();
  const internalSpaceRegexExpression = /\s/;
  const invalidCharactersRegexExpression = /[^0-9.$€]/;
  const firstCharacterRegexExpression = /[$€]/;
  const moreThanOneAcceptedCharacterRegexExpression = /[.$€]{2,}/;
  let error = false;
  if (invalidCharactersRegexExpression.test(trimmedPrice)) {
    error = true;
  }

  if (firstCharacterRegexExpression.test(trimmedPrice)) {
    if (!firstCharacterRegexExpression.test(trimmedPrice[0])) {
      error = true;
    }
  }
  if (moreThanOneAcceptedCharacterRegexExpression.test(trimmedPrice)) {
    error = true;
  }
  if (internalSpaceRegexExpression.test(trimmedPrice)) {
    error = true;
  }

  return error;
};
