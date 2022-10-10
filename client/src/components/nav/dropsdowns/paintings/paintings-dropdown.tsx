import classes from "./paintings-dropdown.module.scss";
import paintingsPhoto from "../../../../images/nav-dropdowns/antique-painting.jpg";

interface Props {
  mouseEnterHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PaintingsDropDown = ({ mouseEnterHandler, mouseLeaveHandler }: Props) => {
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
        <button className={classes.productButton}>Realism</button>
        <button className={classes.productButton}>Photorealism</button>
        <button className={classes.productButton}>Abstract</button>
        <button className={classes.productButton}>Surrealism</button>
        <button className={classes.productButton}>Pop Art</button>
        <button className={classes.productButton}>Oil</button>
      </div>
    </div>
  );
};

export default PaintingsDropDown;
