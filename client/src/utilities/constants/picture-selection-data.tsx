import antiqueVase from "../../images/product-photos/antique-vase.jpg";
import antiqueClock from "../../images/product-photos/antique-clock.jpg";

import antiqueTablewear from "../../images/product-photos/antique-tablewear.jpg";
import antiquePainting from "../../images/product-photos/antique-painting.jpg";
import antiqueCamera from "../../images/product-photos/antique-camera.jpg";

export interface PictureTestDataInterface {
  [key: string]: {
    photo: string;
    description: string;
    photoUrl: string;
  };
}

export const pictureSelectionTestData: PictureTestDataInterface = {
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
