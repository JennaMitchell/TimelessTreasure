import classes from "./ceramics-dropdown.module.scss";
import ceramicsPhoto from "../../../../images/nav-dropdowns/antique-vase.jpg";
import { dropDownNavCategoryHandler } from "../../../../utilities/generic-hooks/generic-hooks";
import { useAppDispatch } from "../../../../store/hooks";
import { useNavigate } from "react-router-dom";
import {
  getTagDataHandler,
  dropdownIdSpliter,
} from "../../../../utilities/product-react-hooks/product-react-hooks";
interface Props {
  mouseEnterHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CeramicsDropDown = ({ mouseEnterHandler, mouseLeaveHandler }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLButtonElement;
    dropDownNavCategoryHandler(targetElement.id, dispatch, navigate);
    const activeTags = dropdownIdSpliter(targetElement.id);
    getTagDataHandler(dispatch, activeTags);
  };

  return (
    <div
      className={classes.mainContainer}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      id="ceramics-dropdown"
    >
      <div className={classes.options}>
        <button
          className={classes.productButton}
          id={"ceramics-earthenware-nav-button"}
          onClick={navButtonHandler}
        >
          Earthenware
        </button>
        <button
          className={classes.productButton}
          id={"ceramics-stoneware-nav-button"}
          onClick={navButtonHandler}
        >
          Stoneware
        </button>
        <button
          className={classes.productButton}
          id={"ceramics-porcelian-nav-button"}
          onClick={navButtonHandler}
        >
          Porcelian
        </button>
        <button
          className={classes.productButton}
          id={"ceramics-boneChina-nav-button"}
          onClick={navButtonHandler}
        >
          Bone China
        </button>
        <button
          className={classes.productButton}
          id={"ceramics-firedBricks-nav-button"}
          onClick={navButtonHandler}
        >
          Fired Bricks
        </button>
      </div>
      <img
        className={classes.imageContainer}
        src={ceramicsPhoto}
        alt="Ceramics Jars"
      />
    </div>
  );
};

export default CeramicsDropDown;
