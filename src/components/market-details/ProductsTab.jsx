import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductMiniCard from "./../../ui/cards/ProductMiniCard";
import DataLoader from "../../ui/DataLoader";
import EmptyData from "../../ui/EmptyData";
import useMarketSections from "./../../hooks/markets/useMarketSections";
import useSectionProducts from "./../../hooks/markets/useSectionProducts";

function ProductsTab({ market }) {
  const { t } = useTranslation();
  const [productsCategory, setProductsCategory] = useState();
  const { isLoading: sectionLoading, data: sections } = useMarketSections();
  const { isLoading: productsLoading, data: products } =
    useSectionProducts(productsCategory);

  useEffect(() => {
    if (!sectionLoading) {
      setProductsCategory(sections?.data?.[0]?.id);
    }
  }, [sectionLoading, sections]);

  return (
    <div className="content-wrapper">
      {sectionLoading ? (
        <DataLoader minHeight="400px" />
      ) : sections?.data && sections?.data?.length > 0 ? (
        <>
          <div className="filter-wrapper">
            <h5 className="filter-heading">
              {" "}
              <img src="/images/categories.svg" alt="categories" />{" "}
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
            <DataLoader minHeight="400px" />
          ) : products?.data && products?.data?.length > 0 ? (
            <div className="products-wrapper">
              <div className="row m-0">
                {products?.data?.map((product) => (
                  <div
                    className="col-sm-6 col-lg-4 col-12 p-2"
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
