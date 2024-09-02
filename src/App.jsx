import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import routerConfig from "./RouterConfig";
import AppLayout from "./ui/layout/AppLayout";
import i18n from "./utils/i18n";

export default function App() {
  const location = useLocation();
  const lang = useSelector((state) => state.language.lang);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    sessionStorage.setItem("lang", lang);
    const body = document.querySelector("body");
    lang === "en" ? body.classList.add("en") : body.classList.remove("en");
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
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
