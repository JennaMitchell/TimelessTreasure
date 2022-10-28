import classes from "./electronics-dropdown.module.scss";
import cameraPhoto from "../../../../images/nav-dropdowns/antique-camera.jpg";
import { dropDownNavCategoryHandler } from "../../../../utilities/generic-hooks/generic-hooks";
import { useAppDispatch } from "../../../../store/hooks";
import { useNavigate } from "react-router-dom";

interface Props {
  mouseEnterHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ElectronicsDropDown = ({
  mouseEnterHandler,
  mouseLeaveHandler,
}: Props) => {
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
      id="electronics-dropdown"
    >
      <div className={classes.options}>
        <button
          className={classes.productButton}
          id="electronics-cameras-nav-button"
          onClick={navButtonHandler}
        >
          Cameras
        </button>
        <button
          className={classes.productButton}
          id="electronics-games-nav-button"
          onClick={navButtonHandler}
        >
          Games
        </button>
        <button
          className={classes.productButton}
          id="electronics-mediaPlayers-nav-button"
          onClick={navButtonHandler}
        >
          Media Players
        </button>
        <button
          className={classes.productButton}
          id="electronics-dvds-nav-button"
          onClick={navButtonHandler}
        >
          DvDs
        </button>
        <button
          className={classes.productButton}
          id="electronics-cds-nav-button"
          onClick={navButtonHandler}
        >
          CDs
        </button>
      </div>
      <img
        className={classes.imageContainer}
        src={cameraPhoto}
        alt="Antique Camera"
      />
    </div>
  );
};

export default ElectronicsDropDown;
