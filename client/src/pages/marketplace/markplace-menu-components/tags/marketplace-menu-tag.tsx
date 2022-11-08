import classes from "./marketplace-menu-tag.module.scss";

import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  tagName: string;
  clickHandler: (element: string) => void;
}
const MarkplaceMenuTag = ({ tagName, clickHandler }: Props) => {
  const tagClickHandler = () => {
    clickHandler(tagName);
  };

  return (
    <div className={classes.tagContainer} onClick={tagClickHandler}>
      <p className={classes.tagTitles}>{tagName}</p>
      <XMarkIcon className={classes.removeTagIcon}></XMarkIcon>
    </div>
  );
};
export default MarkplaceMenuTag;
