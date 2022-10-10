import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { signupPasswordValidator } from "../../../../utilities/validation-hooks/validation-hooks";
import classes from "./signup-requirements.module.scss";

interface Props {
  password: string;
  confirmationPassword: string;
}
interface Requirements {
  active: boolean;
  text: string;
}

const SignupRequirements = ({ password, confirmationPassword }: Props) => {
  const passwordValidationObject = signupPasswordValidator(
    password,
    confirmationPassword
  );
  const passwordRequirements = [
    {
      active: passwordValidationObject.eightCharacters,
      text: "At least 8 characters",
    },
    {
      active: passwordValidationObject.lowercase,
      text: "At least one lowercase letter",
    },
    {
      active: passwordValidationObject.uppercase,
      text: "At least one capital letter",
    },
    { active: passwordValidationObject.number, text: "At least one number" },
    {
      active: passwordValidationObject.symbol,
      text: "At least one @$!%*#?& symbol",
    },
    {
      active: passwordValidationObject.invalidSymbols,
      text: "No Invalid Symbols",
    },
    { active: passwordValidationObject.noSpaces, text: "No Spaces" },
    {
      active: passwordValidationObject.matchingPasswords,
      text: "Matching Passwords",
    },
  ];

  const renderReadyRowData = passwordRequirements.map(
    (object: Requirements) => {
      return (
        <div className={classes.requirementsContainer} key={`${object.text}`}>
          {object.active && <XMarkIcon className={classes.incorrectIcon} />}
          {!object.active && <CheckIcon className={classes.correctIcon} />}
          <p className={classes.requirementText}>{object.text}</p>
        </div>
      );
    }
  );

  return (
    <>
      <div className={classes.mainContainer}>
        <h6 className={classes.requirementsTitle}>Password Requirements</h6>
        {renderReadyRowData}
      </div>
    </>
  );
};
export default SignupRequirements;
