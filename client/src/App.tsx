import { Route, Routes, Navigate } from "react-router-dom";
import Nav from "./components/nav/nav";
import Homepage from "./pages/homepage/homepage";
import Footer from "./components/footer/footer";
import { useAppSelector } from "./store/hooks";
import LoginPopup from "./components/popups/login/login-popup";
import SignupPopup from "./components/popups/signup/signup-popup";
import Marketplace from "./pages/marketplace/marketplace";
import PageNotFound from "./components/page-not-found/page-not-found";
import ApiCallDropdown from "./components/api-call-dropdown/api-call-dropdown";
import LoadingPage from "./components/loading-page/loading-page";
import Cart from "./pages/cart/cart";
import UserSettingsPage from "./pages/user-settings/user-settings-page";

function App() {
  const lockViewport = useAppSelector((state) => state.mainStore.lockViewport);
  const loadingPageActive = useAppSelector(
    (state) => state.mainStore.authenticationLoading
  );
  if (lockViewport) {
    document.body.classList.add("lockscreen");
  } else {
    if (document.body.classList.contains("lockscreen")) {
      document.body.classList.remove("lockscreen");
    }
  }

  return (
    <div className="App">
      {loadingPageActive && <LoadingPage />}
      <LoginPopup />
      <SignupPopup />
      <ApiCallDropdown />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route
          path="/home"
          element={
            <>
              <Nav />

              <Homepage />
              <Footer />
            </>
          }
        />
        <Route
          path="/marketplace"
          element={
            <>
              <Nav />
              <Marketplace />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Nav />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/user-settings"
          element={
            <>
              <Nav />
              <UserSettingsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Nav />
              <PageNotFound />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
