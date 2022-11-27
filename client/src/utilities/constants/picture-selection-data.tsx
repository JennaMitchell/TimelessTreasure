import antiqueVase from "../../images/product-photos/antique-vase.jpg";
import antiqueClock from "../../images/product-photos/antique-clock.jpg";

import antiqueTablewear from "../../images/product-photos/antique-tablewear.jpg";
import antiquePainting from "../../images/product-photos/antique-painting.jpg";
import antiqueCamera from "../../images/product-photos/antique-camera.jpg";
import blueJar from "../../images/product-photos/blue-jar.png";
import blueJug from "../../images/product-photos/blue-jug.png";
import blueLongPlate from "../../images/product-photos/blue-long-plate.png";
import blueLongVase from "../../images/product-photos/blue-long-vase.png";
import bluePlate from "../../images/product-photos/blue-plate.jpg";
import blueTeaPot from "../../images/product-photos/blue-tea-pot.png";
import blueVase from "../../images/product-photos/blue-vase.png";
import oilPainting from "../../images/product-photos/oil-painting.jpg";
import vintageLandscape from "../../images/product-photos/vintage-landscape-with-gondolas.jpg";

export interface PictureTestDataInterface {
  [key: string]: {
    photo: string;
    description: string;
    photoUrl: string;
  };
}

export const pictureSelectionTestData: PictureTestDataInterface = {
  vintageLandscape: {
    photo: vintageLandscape,
    description: "Vintage Landscape",
    photoUrl: "../../images/product-photos/vintage-landscape-with-gondolas.jpg",
  },
  oilPainting: {
    photo: oilPainting,
    description: "Oil Painting",
    photoUrl: "../../images/product-photos/oil-painting.jpg",
  },
  blueVase: {
    photo: blueVase,
    description: "Blue Vase",
    photoUrl: "../../images/product-photos/blue-vase.png",
  },
  blueTeaPot: {
    photo: blueTeaPot,
    description: "Blue Tea Pot",
    photoUrl: "../../images/product-photos/blue-tea-pot.png",
  },
  bluePlate: {
    photo: bluePlate,
    description: "Blue Plate",
    photoUrl: "../../images/product-photos/blue-plate.jpg",
  },

  blueLongVase: {
    photo: blueLongVase,
    description: "Blue Long Vase",
    photoUrl: "../../images/product-photos/blue-plate.jpg",
  },
  blueLongPlate: {
    photo: blueLongPlate,
    description: "Blue Jug",
    photoUrl: "../../images/product-photos/blue-long-plate.png",
  },

  blueJug: {
    photo: blueJug,
    description: "Blue Jug",
    photoUrl: "../../images/product-photos/blue-jug.png",
  },

  blueJar: {
    photo: blueJar,
    description: "Blue Jar",
    photoUrl: "../../images/product-photos/blue-jar.png",
  },
  antiqueClock: {
    photo: antiqueClock,
    description: "Antique Clock",
    photoUrl: "../../../images/product-photos/antique-clock.jpg",
  },
  antiqueVase: {
    photo: antiqueVase,
    description: "Antique Vase",
    photoUrl: "../../../images/product-photos/antique-vase.jpg",
  },
  antiqueTablewear: {
    photo: antiqueTablewear,
    description: "Antique Tablewear",
    photoUrl: "../../../images/product-photos/antique-tablewear.jpg",
  },
  antiquePainting: {
    photo: antiquePainting,
    description: "Antique Painting",
    photoUrl: "../../../images/product-photos/antique-painting.jpg",
  },
  antiqueCamera: {
    photo: antiqueCamera,
    description: "Antique Camera",
    photoUrl: "../../../images/product-photos/antique-camera.jpg",
  },
};
