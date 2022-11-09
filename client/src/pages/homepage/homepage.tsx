import PhotoCarousel from "./photo-carousel/photo-carousel";
import NewProducts from "./new-products/new-products";
import ProcessSteps from "./process-steps/process-steps";
import SubCategoryMenu from "./sub-category-buttons/sub-category-menu";
import BestSellers from "./best-sellers/best-sellers";
import Reviews from "./reviews/review";
import classes from "./homepage.module.scss";
import decor from "../../images/homepage/decor/decor.png";

const Homepage = () => {
  return (
    <div className={classes.homepageMainContainer}>
      <PhotoCarousel />
      <div className={classes.sectionTitleContainer}>
        <h6 className={classes.sectionTitle}>New Arrivals</h6>
        <img src={decor} alt="text decoration" className={classes.decorPhoto} />
      </div>
      <NewProducts />

      <SubCategoryMenu />
      <div className={classes.sectionTitleContainer}>
        <h6 className={classes.sectionTitle}>Become A Seller</h6>
        <img src={decor} alt="text decoration" className={classes.decorPhoto} />
      </div>
      <ProcessSteps />
      <div className={classes.sectionTitleContainer}>
        <h6 className={classes.sectionTitle}>Best Sellers</h6>
        <img src={decor} alt="text decoration" className={classes.decorPhoto} />
      </div>
      <BestSellers />
      <div className={classes.sectionTitleContainer}>
        <h6 className={classes.sectionTitle}>Reviews</h6>
        <img src={decor} alt="text decoration" className={classes.decorPhoto} />
      </div>
      <Reviews />
    </div>
  );
};

export default Homepage;
