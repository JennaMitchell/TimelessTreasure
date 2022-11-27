import classes from "./user-info.module.scss";
import decorImage from "../../../../../images/homepage/decor/decor.png";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { useEffect, useState } from "react";
import {
  getBuyerUserData,
  getSellerUserData,
} from "../../../../../utilities/user-settings-api-hooks/api-calls-user-setting-hooks";
import { mainStoreSliceActions } from "../../../../../store/store";

const UserInfo = () => {
  const userEmail = useAppSelector((state) => state.userStore.userEmail);
  const username = useAppSelector((state) => state.userStore.username);

  const isSeller = useAppSelector((state) => state.sellerStore.isSeller);
  const userType = isSeller ? "Seller" : "Buyer";

  const [lastOrderDate, setLastOrderDate] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const [totalBuyOrders, setTotalBuyOrders] = useState("");
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userStore.userId);
  const userToken = useAppSelector((state) => state.userStore.userToken);
  const [initialRender, setInitialRender] = useState(false);

  useEffect(() => {
    if (!initialRender) {
      if (isSeller) {
        getSellerUserData(dispatch, userId, userToken)
          .then((response) => {
            return response?.json();
          })
          .then((jsonData) => {
            if (jsonData !== undefined) {
              if ("error" in jsonData) {
                if (jsonData.error.length !== 0) {
                  dispatch(
                    mainStoreSliceActions.setAPICallMessage(jsonData.message)
                  );
                  dispatch(
                    mainStoreSliceActions.setAPICallMessageType("ERROR")
                  );
                }
              } else {
                dispatch(
                  mainStoreSliceActions.setAPICallMessage("Data Retrieved")
                );
                const latestDate = jsonData.retrievedData.latestDate;

                let date = "N/A";
                if (latestDate.length !== 0) {
                  const indexOfFirstTimeStamp = latestDate.trim().indexOf(":");
                  date = latestDate.trim().slice(0, indexOfFirstTimeStamp - 2);
                }

                setLastOrderDate(date);
                setTotalBuyOrders(
                  jsonData.retrievedData.totalNumberOfBuyOrders
                );
                dispatch(
                  mainStoreSliceActions.setAPICallMessageType("SUCCESS")
                );
                setTotalSales(jsonData.retrievedData.totalNumberOfSellerOrders);
              }
            } else {
              dispatch(
                mainStoreSliceActions.setAPICallMessage("Undefined Returned")
              );
              dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
            }
          });
      } else {
        getBuyerUserData(dispatch, userId, userToken)
          .then((response) => {
            return response?.json();
          })
          .then((jsonData) => {
            if (jsonData !== undefined) {
              if ("error" in jsonData) {
                if (jsonData.error.length !== 0) {
                  dispatch(
                    mainStoreSliceActions.setAPICallMessage(jsonData.message)
                  );
                  dispatch(
                    mainStoreSliceActions.setAPICallMessageType("ERROR")
                  );
                }
              } else {
                dispatch(
                  mainStoreSliceActions.setAPICallMessage("Data Retrieved")
                );
                const latestDate = jsonData.retrievedData.latestDate;

                let date = "N/A";
                if (latestDate.length !== 0) {
                  const indexOfFirstTimeStamp = latestDate.trim().indexOf(":");
                  date = latestDate.trim().slice(0, indexOfFirstTimeStamp - 2);
                }

                setLastOrderDate(date);
                setTotalBuyOrders(
                  jsonData.retrievedData.totalNumberOfBuyOrders
                );
                dispatch(
                  mainStoreSliceActions.setAPICallMessageType("SUCCESS")
                );
              }
            } else {
              dispatch(
                mainStoreSliceActions.setAPICallMessage("Undefined Returned")
              );
              dispatch(mainStoreSliceActions.setAPICallMessageType("ERROR"));
            }
          });
      }
      setInitialRender(true);
    }
  }, [isSeller, dispatch, userId, userToken, initialRender]);

  return (
    <>
      <h6 className={classes.sectionTitle}>Current Info</h6>
      <img
        className={classes.sectionImage}
        alt="section-img"
        src={decorImage}
      />
      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Email:&nbsp; </p>
        <p className={classes.infoText}>{userEmail}</p>
      </div>
      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Username:&nbsp; </p>
        <p className={classes.infoText}>{username}</p>
      </div>
      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Type:&nbsp; </p>
        <p className={classes.infoText}>{userType}</p>
      </div>

      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Last Order:&nbsp; </p>
        <p className={classes.infoText}>{lastOrderDate}</p>
      </div>
      {userType === "Seller" && (
        <div className={classes.infoContainer}>
          <p className={classes.infoTitle}>Total Sales:&nbsp; </p>
          <p className={classes.infoText}>{totalSales}</p>
        </div>
      )}
      <div className={classes.infoContainer}>
        <p className={classes.infoTitle}>Total Buy Orders:&nbsp;</p>
        <p className={classes.infoText}>{totalBuyOrders}</p>
      </div>
    </>
  );
};
export default UserInfo;
