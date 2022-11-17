import classes from "./credits.module.scss";
import { creditsData } from "./credits-data";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

interface CreditsDataEntry {
  author: string;
  photo: string;
  description: string;
  link: string;
}

const Credits = () => {
  const renderReadyCreditsData = creditsData.map((data: CreditsDataEntry) => {
    return (
      <a
        href={data.link}
        className={classes.creditsContainer}
        key={`${data.description}-${data.author}`}
      >
        <img
          className={classes.creditPhoto}
          src={data.photo}
          alt={data.description}
        />
        <p className={classes.authorText}>By. {data.author}</p>
        <p className={classes.descriptionText}>{data.description}</p>
      </a>
    );
  });

  renderReadyCreditsData.push(
    <a
      href={"https://heroicons.com/"}
      className={classes.creditsContainer}
      key={"hero-icons-credits"}
    >
      <ShoppingBagIcon className={classes.creditPhoto} />
      <p className={classes.authorText}>By. Heroicons</p>
      <p className={classes.descriptionText}>Icons from Heroicons</p>
    </a>
  );

  return (
    <div className={classes.mainContainer}>
      <div className={classes.bannerBox}>Photo Credits</div>
      <div className={classes.creditsDataContainer}>
        {renderReadyCreditsData}
      </div>
    </div>
  );
};

export default Credits;
