import classes from "./ceramics-dropdown.module.scss";
import ceramicsPhoto from "../../../../images/nav-dropdowns/antique-vase.jpg";

interface Props {
  mouseEnterHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CeramicsDropDown = ({ mouseEnterHandler, mouseLeaveHandler }: Props) => {
  return (
    <div
      className={classes.mainContainer}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      id="ceramics-dropdown"
    >
      <div className={classes.options}>
        <button className={classes.productButton}>Earthenware</button>
        <button className={classes.productButton}>Stoneware</button>
        <button className={classes.productButton}>Porcelian</button>
        <button className={classes.productButton}>Bone China</button>
        <button className={classes.productButton}>Fired Bricks</button>
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
