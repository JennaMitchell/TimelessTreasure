import classes from "./item-for-sale-container.module.scss";
import { randomKeyGenerator } from "../../../utilities/generic-hooks/generic-hooks";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeletePostPopup from "../../../components/popups/delete-post/delete-post-popup";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { mainStoreSliceActions } from "../../../store/store";
import EditPostPopup from "../../../components/popups/edit-post/edit-post-popup";
import { pictureSelectionTestData } from "../../../utilities/constants/picture-selection-data";
import {
  priceStringCreator,
  priceInputCleaner,
  closeApiMessageDropDown,
} from "../../../utilities/generic-hooks/generic-hooks";
interface Props {
  imageKey: string;
  productTitle: string;
  productPrice: string;
  productPriceType: string;
  productQty: string;
  productId: string;
  index: number;
  productTags: string[];
  productDescription: string;
}

const ItemForSaleContainer = ({
  imageKey,
  productTitle,
  productPrice,
  productQty,
  productPriceType,
  productId,
  productTags,
  productDescription,
}: Props) => {
  const keyId = randomKeyGenerator(20);
  // const productImageUrl = imageUrlCreator(productImage);

  const dispatch = useAppDispatch();
  const deletePostPopup = useAppSelector(
    (state) => state.mainStore.deletePostPopup
  );

  const activeEditPostPopupId = useAppSelector(
    (state) => state.mainStore.activeEditPostPopupId
  );
  let tempPrice = priceStringCreator(
    priceInputCleaner(`${productPrice}`),
    productPriceType
  );

  const renderReadyTags = productTags.map((tag: string) => {
    return (
      <p
        className={classes.tagText}
        key={`tag-${tag}-${productTitle}-${productId}`}
      >
        {tag}
      </p>
    );
  });

  const productImageUrl = pictureSelectionTestData[imageKey].photo;
  console.log(productImageUrl);
  const deleteButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(true));
    dispatch(mainStoreSliceActions.setDeletePostPopup(true));
    closeApiMessageDropDown(dispatch);
  };

  const editButtonHandler = () => {
    dispatch(mainStoreSliceActions.setLockViewPort(true));
    dispatch(mainStoreSliceActions.setEditPostPopup(true));
    dispatch(mainStoreSliceActions.setActiveEditPostPopupId(productId));
    closeApiMessageDropDown(dispatch);
  };

  return (
    <div className={classes.productDetailsContainer} key={`${keyId}`}>
      <img
        className={classes.productImage}
        alt="product"
        src={productImageUrl}
      />
      <p className={classes.productTitle}>{productTitle}</p>
      <div className={classes.selectedTagsContainer}>{renderReadyTags}</div>
      <p className={classes.productPrice}>{tempPrice}</p>

      <p className={classes.quantity}>Qty. {productQty}</p>

      <div className={classes.buttonControlsContainer}>
        <button className={classes.actionButton} onClick={editButtonHandler}>
          <PencilSquareIcon className={classes.buttonIcon} />
          Edit
        </button>
        <button className={classes.actionButton} onClick={deleteButtonHandler}>
          <TrashIcon className={classes.buttonIcon} />
          Delete
        </button>
        {deletePostPopup && <DeletePostPopup productId={productId} />}
        {activeEditPostPopupId === productId && (
          <EditPostPopup
            productImage={productImageUrl}
            productTitle={productTitle}
            productPrice={productPrice}
            productQty={productQty}
            productPriceType={productPriceType}
            productId={productId}
            productDescription={productDescription}
          />
        )}
      </div>
    </div>
  );
};
export default ItemForSaleContainer;
