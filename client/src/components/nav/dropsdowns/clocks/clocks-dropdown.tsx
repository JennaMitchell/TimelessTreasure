import classes from "./clocks-dropdown.module.scss";
import clocksPhoto from "../../../../images/nav-dropdowns/antique-clock.jpg";
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

const ClocksDropDown = ({ mouseEnterHandler, mouseLeaveHandler }: Props) => {
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
      id="clocks-dropdown"
    >
      <img
        className={classes.imageContainer}
        src={clocksPhoto}
        alt="Antique Clock"
      />
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Type</h6>
        <button
          className={classes.productButton}
          id="clocks-wall-nav-button"
          onClick={navButtonHandler}
        >
          Wall
        </button>
        <button
          className={classes.productButton}
          id="clocks-pendulum-nav-button"
        >
          Pendulum
        </button>
        <button
          className={classes.productButton}
          id="clocks-mantel-nav-button"
          onClick={navButtonHandler}
        >
          Mantel
        </button>
        <button
          className={classes.productButton}
          id="clocks-alarm-nav-button"
          onClick={navButtonHandler}
        >
          Alarm
        </button>
        <button
          className={classes.productButton}
          id="clocks-cuckoo-nav-button"
          onClick={navButtonHandler}
        >
          Cuckoo
        </button>
      </div>
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Size</h6>
        <button
          className={classes.productButton}
          id="clocks-small-nav-button"
          onClick={navButtonHandler}
        >
          Small
        </button>
        <button
          className={classes.productButton}
          id="clocks-medium-nav-button"
          onClick={navButtonHandler}
        >
          Medium
        </button>
        <button
          className={classes.productButton}
          id="clocks-large-nav-button"
          onClick={navButtonHandler}
        >
          Large
        </button>
        <button
          className={classes.productButton}
          id="clocks-overSized-nav-button"
          onClick={navButtonHandler}
        >
          OverSized
        </button>
      </div>
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Style</h6>
        <button
          className={classes.productButton}
          id="clocks-digital-nav-button"
          onClick={navButtonHandler}
        >
          Digital
        </button>
        <button
          className={classes.productButton}
          id="clocks-analog-nav-button"
          onClick={navButtonHandler}
        >
          Analog
        </button>
      </div>
    </div>
  );
};

export default ClocksDropDown;
