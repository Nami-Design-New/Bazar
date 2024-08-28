import { Route, Routes, useLocation } from "react-router-dom";
import routerConfig from "./RouterConfig";
import Footer from "./ui/layout/Footer";
import Header from "./ui/layout/Header";
import { useEffect } from "react";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <main className="root">
        <Routes>
          {routerConfig.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Routes>
      </main>
      <Footer />
    </>
  );
}
