interface SelectedTypes {
  [key: string]: {
    [key: string]: string[];
  };
}

const productTypeSubSelection: SelectedTypes = {
  Ceramics: {
    Types: ["Earthware", "Stoneware", "Porcelian", "Bone China", "Fire Bricks"],
  },
  Clocks: {
    Type: ["Wall", "Pendulum", "Mantel", "Alarm", "Cuckoo"],
    Size: ["Small", "Medium", "Large", "Oversized"],
    Style: ["Digital", "Analog"],
  },
  Tablewear: {
    Type: ["Serveware", "Dinnerware", "Silverware", "Drinkware"],
    Sets: ["4 Sets", "6 Sets", "8 Sets"],
    Material: [
      "Bone China",
      "Silver",
      "Earthenware",
      "Porcelain",
      "Melamine",
      "Stoneware",
    ],
  },
  Paintings: {
    Type: [
      "Realism",
      "Photorealism",
      "Abstract",
      "Surrealism",
      "Pop Art",
      "Oil",
    ],
  },
  Electronics: {
    Type: ["Cameras", "Games", "Media Players", "DvDs", "CDs"],
  },
};
export default productTypeSubSelection;
