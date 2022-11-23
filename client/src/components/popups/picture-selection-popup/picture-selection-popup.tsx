import classes from "./picture-selection-popup.module.scss";
import decor from "../../../images/homepage/decor/decor.png";
import { pictureSelectionTestData } from "./picture-selection-data";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useRef, useEffect, useState } from "react";
import { mainStoreSliceActions } from "../../../store/store";
import { sellerStoreActions } from "../../../store/seller";
import { XMarkIcon } from "@heroicons/react/24/outline";
const PictureSelectionPopup = () => {
  const pictureSelectionPopupActive = useAppSelector(
    (state) => state.mainStore.pictureSelectionPopupActive
  );
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>();
  const popupMainContainerRef = useRef(null);

  const backdropRef = useRef(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (popupMainContainerRef.current != null && backdropRef.current != null) {
      const windowHeight = window.innerHeight;
      const mainContainerPopupCurrent =
        popupMainContainerRef.current as HTMLFormElement;
      const currentbackDrop = backdropRef.current as HTMLDivElement;

      const popupHeight = mainContainerPopupCurrent.clientHeight;

      if (popupHeight > windowHeight) {
        dispatch(mainStoreSliceActions.setLockScreenHeight(popupHeight));
        currentbackDrop.style.height = `${popupHeight}`;
        currentbackDrop.style.overflowY = `scroll`;
      } else {
        dispatch(mainStoreSliceActions.setLockScreenHeight(0));
      }
    }
  }, [dispatch]);

  const resizeLockedHeightHandler = () => {
    if (popupMainContainerRef.current != null) {
      const windowHeight = window.innerHeight;
      const mainContainerPopupCurrent =
        popupMainContainerRef.current as HTMLDivElement;
      const popupHeight = mainContainerPopupCurrent.clientHeight;
      if (backdropRef.current != null) {
        const currentbackDrop = backdropRef.current as HTMLDivElement;

        if (popupHeight > windowHeight) {
          dispatch(mainStoreSliceActions.setLockScreenHeight(popupHeight));
          currentbackDrop.style.height = `${popupHeight}`;
          currentbackDrop.style.overflowY = `scroll`;
        }
      }
    }
  };
  window.addEventListener("resize", resizeLockedHeightHandler);

  const renderReadySelectionImages = pictureSelectionTestData.map(
    (picData, index) => {
      const imageContainerClickHandler = () => {
        setActivePhotoIndex(index);
      };
      return (
        <div
          className={`${classes.imageContainer} ${
            activePhotoIndex === index && classes.activeImageContainer
          }`}
          key={`${picData.description}-${index}`}
        >
          <img
            className={`${classes.selectionImage} ${
              activePhotoIndex === index && classes.selectionImageActive
            }`}
            alt={picData.description}
            src={picData.photo}
            onClick={imageContainerClickHandler}
          />
        </div>
      );
    }
  );

  const closingIconHandler = () => {
    dispatch(mainStoreSliceActions.setPictureSelectionPopupActive(false));
  };

  const submitButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLockScreenHeight(""));

    if (activePhotoIndex !== undefined) {
      dispatch(
        sellerStoreActions.setNewPostSelectedPhotoLink(activePhotoIndex)
      );
    } else {
      dispatch(sellerStoreActions.setNewPostSelectedPhotoLink(-1));
    }
  };
  return (
    <>
      {pictureSelectionPopupActive && (
        <div className={classes.popupBackdrop} ref={backdropRef}>
          <div
            className={classes.popupMainContainer}
            ref={popupMainContainerRef}
          >
            <div
              className={classes.closingIconContainer}
              onClick={closingIconHandler}
            >
              <XMarkIcon className={classes.closingIcon} />
            </div>
            <h6 className={classes.loginTitle}>Select a Picture</h6>
            <img src={decor} alt="text-decor" className={classes.textDecor} />

            <div className={classes.pictureSelectionSection}>
              {renderReadySelectionImages}
            </div>
            <button
              className={classes.submitButton}
              onClick={submitButtonHandler}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default PictureSelectionPopup;
