import classes from "./electronics-dropdown.module.scss";
import cameraPhoto from "../../../../images/nav-dropdowns/antique-camera.jpg";

interface Props {
  mouseEnterHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ElectronicsDropDown = ({
  mouseEnterHandler,
  mouseLeaveHandler,
}: Props) => {
  return (
    <div
      className={classes.mainContainer}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      id="camera-dropdown"
    >
      <div className={classes.options}>
        <button className={classes.productButton}>Cameras</button>
        <button className={classes.productButton}>Games</button>
        <button className={classes.productButton}>Media Players</button>
        <button className={classes.productButton}>DvDs</button>
        <button className={classes.productButton}>CDs</button>
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
