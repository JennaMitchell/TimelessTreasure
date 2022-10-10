import classes from "./footer.module.scss";
import { HomeIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import facebookIcon from "../../images/icons/social-media/facebook.png";
import instagramIcon from "../../images/icons/social-media/instagram.png";
import pinterestIcon from "../../images/icons/social-media/pinterest.png";
import tiktokIcon from "../../images/icons/social-media/tiktok.png";
import twitterIcon from "../../images/icons/social-media/twitter-sign.png";
const Footer = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.contentContainer}>
        <div className={classes.addressBlock}>
          <h6 className={classes.sectionTitle}>Contact Us</h6>
          <div className={classes.addressLine}>
            <HomeIcon className={classes.addressIcon} />
            <p className={classes.addressText}> 123 Address St., USA</p>
          </div>
          <div className={classes.addressLine}>
            <PhoneIcon className={classes.addressIcon} />
            <p className={classes.addressText}> +(123) 456-7890</p>
          </div>
          <div className={classes.addressLine}>
            <EnvelopeIcon className={classes.addressIcon} />
            <p className={classes.addressText}> timelessTreasures@domian.com</p>
          </div>
          <div className={classes.socialMediaBar}>
            <img
              src={facebookIcon}
              alt="facebook icon"
              className={classes.socialIcon}
            />
            <img
              src={twitterIcon}
              alt="twitter icon"
              className={classes.socialIcon}
            />
            <img
              src={instagramIcon}
              alt="instagram icon"
              className={classes.socialIcon}
            />
            <img
              src={pinterestIcon}
              alt="pinterest icon"
              className={classes.socialIcon}
            />
            <img
              src={tiktokIcon}
              alt="tiktok icon"
              className={classes.socialIcon}
            />
          </div>
        </div>
        <div className={classes.collectionBlock}>
          <h6 className={classes.sectionTitle}> Our Collection</h6>
          <button className={classes.footerButton}>Ceramics</button>
          <button className={classes.footerButton}>Clocks</button>
          <button className={classes.footerButton}>Tablewear</button>
          <button className={classes.footerButton}>Paintings</button>
          <button className={classes.footerButton}>Electronics</button>
        </div>
        <div className={classes.infoBlock}>
          <h6 className={classes.sectionTitle}>Help {"&"} Info</h6>
          <button className={classes.footerButton}>My Account</button>
          <button className={classes.footerButton}>
            Frequently Asked Questions
          </button>
          <button className={classes.footerButton}>Shipping Policy</button>
          <button className={classes.footerButton}>Returns Policy</button>
          <button className={classes.footerButton}>Careers</button>
        </div>
      </div>
    </div>
  );
};
export default Footer;
