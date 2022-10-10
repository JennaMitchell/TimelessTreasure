import { useAppDispatch } from "../../store/hooks";
import { mainStoreSliceActions } from "../../store/store";
interface ReturnedLoginData {
  token: string;
  userId: string;
}
interface ReturnedSignupData {
  message: string;
  userId: string;
}

export const LogoutHandler = () => {
  const dispatch = useAppDispatch();
  dispatch(mainStoreSliceActions.setUserAuthenticated(false));
  dispatch(mainStoreSliceActions.setUserToken(""));
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  localStorage.removeItem("userId");
};

export async function LoginHandler(email: string, password: string) {
  const dispatch = useAppDispatch();
  dispatch(mainStoreSliceActions.setAuthenticationLoading(true));

  try {
    const fetchedRequest = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (fetchedRequest.status === 422) {
      throw new Error("Validation failed");
    }
    if (fetchedRequest.status !== 200 && fetchedRequest.status !== 201) {
      throw new Error("Could not authenticate you!");
    }
    // const jsonedFetchedRequest: ReturnedLoginData = await fetchedRequest.json();
  } catch (err) {
    console.log(err);
    dispatch(mainStoreSliceActions.setUserAuthenticated(false));
    dispatch(mainStoreSliceActions.setAuthenticationLoading(false));
  }
}

export async function SignupHandler(email: string, password: string) {
  const dispatch = useAppDispatch();

  dispatch(mainStoreSliceActions.setAuthenticationLoading(true));

  try {
    const fetchedResponse = await fetch("http://localhost:3000/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // need to change the varaibale names
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (fetchedResponse.status === 422) {
      throw new Error(
        "Validation failed. Make sure the email address isn't used yet!"
      );
    }
    if (fetchedResponse.status !== 200 && fetchedResponse.status !== 201) {
      console.log("Error!");
      throw new Error("Creating a user failed!");
    }
    const jsonedFetchedRequest: ReturnedSignupData =
      await fetchedResponse.json();
    if (fetchedResponse.status === 200 || fetchedResponse.status === 201) {
      dispatch(
        mainStoreSliceActions.setDropdownMessage(jsonedFetchedRequest.message)
      );
      dispatch(mainStoreSliceActions.setDropdownMessageType("Success"));
      console.log("SUCCESS");
      // jsonedFetchedRequest.message
      LoginHandler(email, password);
    }
    //
  } catch (err) {
    console.log(err);
    dispatch(mainStoreSliceActions.setUserAuthenticated(false));
    dispatch(mainStoreSliceActions.setAuthenticationLoading(false));
  }
}

export function AutoLogout(milliseconds: number) {
  setTimeout(() => {
    LogoutHandler();
  }, milliseconds);
}
