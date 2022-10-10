import classes from "./tablewear-dropdown.module.scss";
import tablewearPhoto from "../../../../images/nav-dropdowns/antique-tablewear.jpg";

interface Props {
  mouseEnterHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  mouseLeaveHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const TablewearDropDown = ({ mouseEnterHandler, mouseLeaveHandler }: Props) => {
  return (
    <div
      className={classes.mainContainer}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      id="tablewear-dropdown"
    >
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Type</h6>
        <button className={classes.productButton}>Serveware</button>
        <button className={classes.productButton}>Dinnerware</button>
        <button className={classes.productButton}>Silverware</button>
        <button className={classes.productButton}>Drinkware</button>
      </div>
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Sets</h6>
        <button className={classes.productButton}>4 sets</button>
        <button className={classes.productButton}>6 sets</button>
        <button className={classes.productButton}>8 sets</button>
      </div>
      <div className={classes.options}>
        <h6 className={classes.optionsTitle}>Material</h6>
        <button className={classes.productButton}>Bone China</button>
        <button className={classes.productButton}>Silver</button>
        <button className={classes.productButton}>Earthenware</button>
        <button className={classes.productButton}>Porcelain</button>
        <button className={classes.productButton}>Melamine</button>
        <button className={classes.productButton}>Stoneware</button>
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
