import classes from "./review.module.scss";
import { StarIcon } from "@heroicons/react/24/solid";
import antiqueVase from "../../../images/homepage/photo-carousel/antique-vase.jpg";
import antiqueCamera from "../../../images/homepage/photo-carousel/antique-camera.jpg";
import { useState, useEffect } from "react";
const Reviews = () => {
  const [stackReviews, setStackReviews] = useState(false);
  const navBarSeperatedEnablerHandler = () => {
    const match = window.matchMedia(`(max-width:1050px)`);

    if (match.matches) {
      setStackReviews(true);
    }
    if (!stackReviews && !match.matches) {
      setStackReviews(false);
    }
  };
  useEffect(() => {
    const stackReviewsWindowMatch = window.matchMedia("(max-width:1050px)");

    if (stackReviewsWindowMatch) {
      setStackReviews(true);
    }
  }, []);

  window.addEventListener("resize", navBarSeperatedEnablerHandler);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.reviewContainer}>
        <img
          alt="antiqueVase"
          src={antiqueVase}
          className={classes.reviewPhoto}
        />
        <div className={classes.reviewTextContainer}>
          <p className={classes.reviewName}>Jacob Smith</p>
          <div className={classes.starsContainer}>
            <StarIcon
              className={`${classes.starIcon} ${classes.activeStarIcon}`}
            />
            <StarIcon
              className={`${classes.starIcon} ${classes.activeStarIcon}`}
            />
            <StarIcon
              className={`${classes.starIcon} ${classes.activeStarIcon}`}
            />
            <StarIcon
              className={`${classes.starIcon} ${classes.activeStarIcon}`}
            />
            <StarIcon
              className={`${classes.starIcon} ${classes.activeStarIcon}`}
            />
          </div>
          <p className={classes.reviewDescripition}>
            This is the best place to buy and sell antiques. I've already made
            hundreds{" "}
          </p>
        </div>
      </div>
      {!stackReviews && (
        <div className={classes.reviewContainer}>
          <div className={classes.reviewTextContainer}>
            <p className={classes.reviewName}>Kelly Miller</p>
            <div className={classes.starsContainer}>
              <StarIcon
                className={`${classes.starIcon} ${classes.activeStarIcon}`}
              />
              <StarIcon
                className={`${classes.starIcon} ${classes.activeStarIcon}`}
              />
              <StarIcon
                className={`${classes.starIcon} ${classes.activeStarIcon}`}
              />
              <StarIcon
                className={`${classes.starIcon} ${classes.activeStarIcon}`}
              />
              <StarIcon
                className={`${classes.starIcon} ${classes.activeStarIcon}`}
              />
            </div>
            <p className={classes.reviewDescripition}>
              I've found countless new treasures that my family loves
            </p>
          </div>
          <img
            alt="antiqueCamera"
            src={antiqueCamera}
            className={classes.reviewPhoto}
          />
        </div>
      )}
      {stackReviews && (
        <div className={classes.reviewContainer}>
          <img
            alt="antiqueCamera"
            src={antiqueCamera}
            className={classes.reviewPhoto}
          />
          <div className={classes.reviewTextContainer}>
            <p className={classes.reviewName}>Kelly Miller</p>
            <div className={classes.starsContainer}>
              <StarIcon
                className={`${classes.starIcon} ${classes.activeStarIcon}`}
              />
              <StarIcon
                className={`${classes.starIcon} ${classes.activeStarIcon}`}
              />
              <StarIcon
                className={`${classes.starIcon} ${classes.activeStarIcon}`}
              />
              <StarIcon
                className={`${classes.starIcon} ${classes.activeStarIcon}`}
              />
              <StarIcon
                className={`${classes.starIcon} ${classes.activeStarIcon}`}
              />
            </div>
            <p className={classes.reviewDescripition}>
              I've found countless new treasures that my family loves
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
