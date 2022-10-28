import classes from "./paintings-dropdown.module.scss";
import paintingsPhoto from "../../../../images/nav-dropdowns/antique-painting.jpg";
import { dropDownNavCategoryHandler } from "../../../../utilities/generic-hooks/generic-hooks";
import { useAppDispatch } from "../../../../store/hooks";
import { useNavigate } from "react-router-dom";

interface Props {
  mouseEnterHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PaintingsDropDown = ({ mouseEnterHandler, mouseLeaveHandler }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetElement = e.target as HTMLButtonElement;
    dropDownNavCategoryHandler(targetElement.id, dispatch, navigate);
  };
  return (
    <div
      className={classes.mainContainer}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      id="paintings-dropdown"
    >
      <img
        className={classes.imageContainer}
        src={paintingsPhoto}
        alt="Antique Paintings"
      />
      <div className={classes.options}>
        <button
          className={classes.productButton}
          id="paintings-realism-nav-button"
          onClick={navButtonHandler}
        >
          Realism
        </button>
        <button
          className={classes.productButton}
          id="paintings-photorealism-nav-button"
          onClick={navButtonHandler}
        >
          Photorealism
        </button>
        <button
          className={classes.productButton}
          id="paintings-abstract-nav-button"
          onClick={navButtonHandler}
        >
          Abstract
        </button>
        <button
          className={classes.productButton}
          id="paintings-surrealism-nav-button"
          onClick={navButtonHandler}
        >
          Surrealism
        </button>
        <button
          className={classes.productButton}
          id="paintings-popArt-nav-button"
          onClick={navButtonHandler}
        >
          Pop Art
        </button>
        <button
          className={classes.productButton}
          id="paintings-oil-nav-button"
          onClick={navButtonHandler}
        >
          Oil
        </button>
      </div>
    </div>
  );
};

export default PaintingsDropDown;
