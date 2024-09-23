import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/layout/SectionHeader";
import { useState } from "react";
import FavoriteMarketCard from "../ui/cards/FavoriteMarketCard";

function Coupons() {
  const { t } = useTranslation();
  const [couponsCategory, setCouponsCategory] = useState("all");

  return (
    <div className="coupons-page">
      <SectionHeader />
      <div className="content-wrapper container col-lg-10 col-12">
        <div className="filter-wrapper">
          <h5 className="filter-heading">{t("categories.categories")}</h5>
          <ul className="filter-list">
            <li
              className={`filter-item ${
                couponsCategory === "all" ? "active" : ""
              }`}
              onClick={() => setCouponsCategory("all")}
            >
              {t("categories.all")}
            </li>
            <li
              className={`filter-item ${
                couponsCategory === "food" ? "active" : ""
              }`}
              onClick={() => setCouponsCategory("food")}
            >
              {t("categories.food")}
            </li>
            <li
              className={`filter-item ${
                couponsCategory === "clothes" ? "active" : ""
              }`}
              onClick={() => setCouponsCategory("clothes")}
            >
              {t("categories.clothes")}
            </li>
            <li
              className={`filter-item ${
                couponsCategory === "painting" ? "active" : ""
              }`}
              onClick={() => setCouponsCategory("painting")}
            >
              {t("categories.paintingProducts")}
            </li>
            <li
              className={`filter-item ${
                couponsCategory === "electronics" ? "active" : "electronics"
              }`}
              onClick={() => setCouponsCategory("")}
            >
              {t("categories.electronics")}
            </li>
            <li
              className={`filter-item ${
                couponsCategory === "carpentry" ? "active" : ""
              }`}
              onClick={() => setCouponsCategory("carpentry")}
            >
              {t("categories.carpentryTools")}
            </li>
          </ul>
        </div>
        <div className="cards-wrapper d-flex flex-wrap">
          <div className="col-lg-4 col-md-6 col-12 p-2">
            <FavoriteMarketCard type="coupon"/>
          </div>
          <div className="col-lg-4 col-md-6 col-12 p-2">
            <FavoriteMarketCard type="coupon"/>
          </div>
          <div className="col-lg-4 col-md-6 col-12 p-2">
            <FavoriteMarketCard type="coupon"/>
          </div>
          <div className="col-lg-4 col-md-6 col-12 p-2">
            <FavoriteMarketCard type="coupon"/>
          </div>
          <div className="col-lg-4 col-md-6 col-12 p-2">
            <FavoriteMarketCard type="coupon"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coupons;
