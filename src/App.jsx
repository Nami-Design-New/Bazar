import { Route, Routes, useLocation } from "react-router-dom";
import routerConfig from "./RouterConfig";
import { useEffect, useState } from "react";
import AppLayout from "./ui/layout/AppLayout";
import { useSelector } from "react-redux";
import i18n from "./utils/i18n";
import Loader from "./ui/Loader";

export default function App() {
  const location = useLocation();
  const lang = useSelector((state) => state.language.lang);
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setPageIsLoading(false);
    });

    return () => {
      window.removeEventListener("load", () => {
        setPageIsLoading(false);
      });
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  return pageIsLoading ? (
    <Loader />
  ) : (
    <AppLayout>
      <Routes>
        {routerConfig.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </AppLayout>
  );
}
