import classes from "./delete-post-popup.module.scss";
import { XMarkIcon } from "@heroicons/react/24/outline";
import decor from "../../../images/homepage/decor/decor.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import { deleteItemForSaleCall } from "../../../utilities/product-api-hooks/seller-product-hooks";
interface Props {
  productId: string;
}
const DeletePostPopup = ({ productId }: Props) => {
  const dispatch = useAppDispatch();
  const userToken = useAppSelector((state) => state.userStore.userToken);
  const userId = useAppSelector((state) => state.userStore.userId);
  const closingHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(false));
    dispatch(mainStoreSliceActions.setDeletePostPopup(false));
  };
  const dialogBackdropClickHandler = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.id === "delete-post-backdrop") {
      closingHandler();
    }
  };

  const confirmButtonHandler = () => {
    deleteItemForSaleCall(
      dispatch,
      { productId: productId, userId: userId },
      userToken
    )
      .then((data) => {
        return data?.json();
      })
      .then((jsonData) => {
        if ("error" in jsonData) {
          if (jsonData.error.length !== 0) {
            dispatch(mainStoreSliceActions.setAPICallMessage(jsonData.message));
            dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
          }
        } else {
          dispatch(mainStoreSliceActions.setAPICallMessage("Product Uploaded"));
          dispatch(mainStoreSliceActions.setAPICallMessageType("SUCCESS"));
          closingHandler();
        }
      });
  };

  return (
    <div
      className={classes.backdrop}
      onClick={dialogBackdropClickHandler}
      id="delete-post-backdrop"
    >
      <div className={classes.popupContainer}>
        <div className={classes.closingContainer} onClick={closingHandler}>
          <XMarkIcon className={classes.closingIcon} />
        </div>
        <h6 className={classes.popupTitle}>Warning</h6>
        <img src={decor} alt="text-decor" className={classes.textDecor} />
        <p className={classes.warningText}>
          Once this product is deleted, there is no way to retrieve it
        </p>
        <div className={classes.actionButtonsContainer}>
          <button
            className={classes.actionButton}
            onClick={confirmButtonHandler}
          >
            Confirm
          </button>
          <button className={classes.actionButton} onClick={closingHandler}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeletePostPopup;
