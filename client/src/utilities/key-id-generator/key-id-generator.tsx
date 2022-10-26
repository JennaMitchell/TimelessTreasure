const keyIdGenerator = () => {
  const lengthOfId = 20;

  const lowerCaseLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const upperCaseLettersArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const idArray = lowerCaseLetters.concat(numbers, upperCaseLettersArray);

  let createdKey = [];
  for (let idIndex = 0; idIndex < lengthOfId; idIndex++) {
    const randomIndex = Math.floor(Math.random() * idArray.length);
    createdKey.push(idArray[randomIndex]);
  }

  return createdKey.join("");
};
export default keyIdGenerator;
