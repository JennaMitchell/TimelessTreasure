interface ButtonLogic {
  [key: string]: {
    [key: string]: boolean;
  };
}

export const buttonLogicObject: ButtonLogic = {
  Ceramics: { buttonHover: false, dropDownHover: false },
  Clocks: { buttonHover: false, dropDownHover: false },
  Tablewear: { buttonHover: false, dropDownHover: false },
  Paintings: { buttonHover: false, dropDownHover: false },
  Electronics: { buttonHover: false, dropDownHover: false },
  Credits: { buttonHover: false, dropDownHover: false },
};
