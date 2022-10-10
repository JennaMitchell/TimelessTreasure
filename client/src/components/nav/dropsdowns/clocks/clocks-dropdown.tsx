import classes from "./clocks-dropdown.module.scss";
import clocksPhoto from "../../../../images/nav-dropdowns/antique-clock.jpg";

interface Props {
  mouseEnterHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ClocksDropDown = ({ mouseEnterHandler, mouseLeaveHandler }: Props) => {
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
        <button className={classes.productButton}>Wall</button>
        <button className={classes.productButton}>Pendulum</button>
        <button className={classes.productButton}>Mantel</button>
        <button className={classes.productButton}>Alarm</button>
        <button className={classes.productButton}>Cuckoo</button>
      </div>
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Size</h6>
        <button className={classes.productButton}>Small</button>
        <button className={classes.productButton}>Medium</button>
        <button className={classes.productButton}>Large</button>
        <button className={classes.productButton}>OverSized</button>
      </div>
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Style</h6>
        <button className={classes.productButton}>Digital</button>
        <button className={classes.productButton}>Analog</button>
      </div>
    </div>
  );
};

export default ClocksDropDown;
