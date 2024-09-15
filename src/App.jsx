import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { useJwt } from "react-jwt";
import { useCookies } from "react-cookie";
import { setIsLogged, setUser } from "./redux/slices/authedUser";
import routerConfig from "./RouterConfig";
import AppLayout from "./ui/layout/AppLayout";
import i18n from "./utils/i18n";
import axios from "./utils/axios";
import useGetProfile from "./features/profile/useGetProfile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loader from "./ui/Loader";
import useGetCart from "./features/cart/useGetCart";
import { setCart } from "./redux/slices/cart";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);

  const [cookies] = useCookies(["token", "id"]);
  const token = cookies?.token;
  const id = cookies?.id;
  const { decodedToken, isExpired } = useJwt(token);
  axios.defaults.headers.common["Authorization"] = `${token}`;

  const { data: cart } = useGetCart();
  const {
    data: profile,
    isLoading,
    isFetched,
    refetch
  } = useGetProfile(id, Boolean(token && id && !isExpired));

  useEffect(() => {
    if (Number(decodedToken?.sub) === id && !isExpired) {
      if (isFetched) {
        dispatch(setUser(profile));
        dispatch(setIsLogged(true));
      } else {
        refetch();
      }
    } else {
      dispatch(setIsLogged(false));
      dispatch(setUser({}));
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [decodedToken?.sub, id, isExpired, profile, isFetched, refetch, dispatch]);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    if (cart) {
      dispatch(setCart(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return isLoading ? (
    <Loader />
  ) : (
    <AppLayout>
      <Routes>
        {routerConfig.map(
          ({ path, element, index, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute profile={profile}>{element}</ProtectedRoute>
                ) : (
                  element
                )
              }
              index={index}
            />
          )
        )}
      </Routes>
    </AppLayout>
  );
}
