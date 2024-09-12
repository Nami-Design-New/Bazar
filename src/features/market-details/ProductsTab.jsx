import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProductMiniCard from "./../../ui/cards/ProductMiniCard";
import useSectionProducts from "../markets/useSectionProducts";
import useMarketSections from "../markets/useMarketSections";
import DataLoader from "../../ui/DataLoader";
import EmptyData from "../../ui/EmptyData";
import categories from "../../assets/images/categories.svg";

function ProductsTab({ market }) {
  const { t } = useTranslation();
  const [productsCategory, setProductsCategory] = useState();
  const { isLoading: sectionLoading, data: sections } = useMarketSections();
  const { isLoading: productsLoading, data: products } =
    useSectionProducts(productsCategory);

  return (
    <div className="content-wrapper">
      {sectionLoading ? (
        <DataLoader minHeight="200px" />
      ) : sections?.data && sections?.data?.length > 0 ? (
        <>
          <div className="filter-wrapper">
            <h5 className="filter-heading">
              {" "}
              <img src={categories} alt="categories" />{" "}
              {t("categories.categories")}
            </h5>
            <ul className="filter-list">
              {sections?.data?.map((section) => (
                <li
                  className={`filter-item ${
                    productsCategory === section?.id ? "active" : ""
                  }`}
                  key={section?.id}
                  onClick={() => setProductsCategory(section?.id)}
                >
                  {section?.name}
                </li>
              ))}
            </ul>
          </div>

          {productsLoading ? (
            <DataLoader minHeight="200px" />
          ) : products?.data && products?.data?.length > 0 ? (
            <div className="products-wrapper">
              <div className="row m-0">
                {products?.data?.map((product) => (
                  <div
                    className="col-lg-3 col-md-4 col-12 p-2"
                    key={product?.id}
                  >
                    <ProductMiniCard
                      product={product}
                      marketId={market?.data?.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyData minHeight={"300px"}>
              {t("markets.noSectionProducts")}
            </EmptyData>
          )}
        </>
      ) : (
        <EmptyData minHeight={"300px"}>{t("markets.noProducts")}</EmptyData>
      )}
    </div>
  );
}

export default ProductsTab;
