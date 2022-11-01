import classes from "./tablewear-dropdown.module.scss";
import tablewearPhoto from "../../../../images/nav-dropdowns/antique-tablewear.jpg";
import { dropDownNavCategoryHandler } from "../../../../utilities/generic-hooks/generic-hooks";
import { useAppDispatch } from "../../../../store/hooks";
import { useNavigate } from "react-router-dom";

interface Props {
  mouseEnterHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const TablewearDropDown = ({ mouseEnterHandler, mouseLeaveHandler }: Props) => {
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
      id="tablewear-dropdown"
    >
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Type</h6>
        <button
          className={classes.productButton}
          id="tablewear-serveware-nav-button"
          onClick={navButtonHandler}
        >
          Serveware
        </button>
        <button
          className={classes.productButton}
          id="tablewear-dinnerware-nav-button"
          onClick={navButtonHandler}
        >
          Dinnerware
        </button>
        <button
          className={classes.productButton}
          id="tablewear-silverware-nav-button"
          onClick={navButtonHandler}
        >
          Silverware
        </button>
        <button
          className={classes.productButton}
          id="tablewear-drinkware-nav-button"
          onClick={navButtonHandler}
        >
          Drinkware
        </button>
      </div>
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Sets</h6>
        <button
          className={classes.productButton}
          id="tablewear-4Sets-nav-button"
          onClick={navButtonHandler}
        >
          4 Sets
        </button>
        <button
          className={classes.productButton}
          id="tablewear-6Sets-nav-button"
          onClick={navButtonHandler}
        >
          6 Sets
        </button>
        <button
          className={classes.productButton}
          id="tablewear-8Sets-nav-button"
          onClick={navButtonHandler}
        >
          8 Sets
        </button>
      </div>
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Material</h6>
        <button
          className={classes.productButton}
          id="tablewear-boneChina-nav-button"
          onClick={navButtonHandler}
        >
          Bone China
        </button>
        <button
          className={classes.productButton}
          id="tablewear-silver-nav-button"
          onClick={navButtonHandler}
        >
          Silver
        </button>
        <button
          className={classes.productButton}
          id="tablewear-porcelain-nav-button"
          onClick={navButtonHandler}
        >
          Porcelain
        </button>
        <button
          className={classes.productButton}
          id="tablewear-melamine-nav-button"
          onClick={navButtonHandler}
        >
          Melamine
        </button>
        <button
          className={classes.productButton}
          id="tablewear-stoneware-nav-button"
          onClick={navButtonHandler}
        >
          Stoneware
        </button>
      </div>
      <img
        className={classes.imageContainer}
        src={tablewearPhoto}
        alt="Antique Tablewear"
      />
    </div>
  );
};

export default TablewearDropDown;
