import { useTranslation } from "react-i18next";
import SectionHeader from "../ui/layout/SectionHeader";
import { useState } from "react";
import { handleApplyFilters } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";
import InputField from "../ui/form-elements/InputField";
import SelectField from "../ui/form-elements/SelectField";
import FavoriteMarketCard from "../ui/cards/FavoriteMarketCard";
import DepartmentFilterBox from "../ui/filter/DepartmentFilterBox";
import useMarketsByFilter from "../features/markets/useMarketsByFilter";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";

const areas = [
  {
    id: 1,
    name: "المنطقة الأولى",
  },
  {
    id: 2,
    name: "المنطقة الثانية",
  },
  {
    id: 3,
    name: "المنطقة الثالثة",
  },
];

function Markets() {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading: marketsLoading, data: markets } = useMarketsByFilter();

  const [searchFilterData, setSearchFilterData] = useState({
    search: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || null,
    type: Number(searchParams.get("ad_type")) || "",
    area_id: Number(searchParams.get("area_id")) || "",
    category_id: searchParams.get("category_id")
      ? searchParams
          .get("category_id")
          .split("-")
          .map((category) => Number(category))
      : [],
    sub_category_id: searchParams.get("sub_category_id")
      ? searchParams
          .get("sub_category_id")
          .split("-")
          .map((subcategory) => Number(subcategory))
      : [],
  });

  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;
    const parsedValue = type === "checkbox" ? (checked ? 1 : 0) : value;
    if (name !== "categories" && name !== "sub_categories") {
      setSearchFilterData((prevState) => ({
        ...prevState,
        [name]: parsedValue,
      }));
      return;
    }
    const categoryValue = Number(value);
    setSearchFilterData((prevState) => {
      const updatedState = { ...prevState };
      const updateList = (list, value, add) => {
        return add ? [...list, value] : list.filter((id) => id !== value);
      };
      if (name === "categories") {
        updatedState[name] = updateList(
          prevState[name],
          categoryValue,
          checked
        );
      }
      return updatedState;
    });
  };

  function handleClearFilters() {
    setSearchParams({});
    setSearchFilterData({
      search: searchParams.get("search") || "",
      page: Number(searchParams.get("page")) || null,
      type: Number(searchParams.get("ad_type")) || "",
      area_id: Number(searchParams.get("area_id")) || "",
      category_id: searchParams.get("category_id")
        ? searchParams
            .get("category_id")
            .split("-")
            .map((category) => Number(category))
        : [],
      sub_category_id: searchParams.get("sub_category_id")
        ? searchParams
            .get("sub_category_id")
            .split("-")
            .map((subcategory) => Number(subcategory))
        : [],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters(setSearchParams, searchFilterData);
  }

  return (
    <div className="ads-page">
      <SectionHeader />
      <section className="content-wrapper container search-section col-lg-10 col-12">
        <div className="row">
          <aside
            className={`col-lg-3 p-2 pt-3 side-menu ${
              isFilterOpen ? "active" : ""
            }`}
          >
            <div className="filter-wrap">
              <div className="colse" onClick={() => setIsFilterOpen(false)}>
                <i className="fa-light fa-xmark"></i>
              </div>
              <form className="form" onSubmit={handleSubmit}>
                <InputField
                  id="search"
                  name="search"
                  value={searchFilterData.search}
                  onChange={handleChange}
                  label={t("search.search")}
                  placeholder={t("search.searchFor")}
                />
                <DepartmentFilterBox
                  categoriesValue={searchFilterData.categories}
                  sub_categoriesValue={searchFilterData.sub_category_id}
                  onChange={handleChange}
                  // categoriesWithSubCategories={categoriesWithSubCategories}
                />
                <SelectField
                  label={t("search.area")}
                  id="area_id"
                  name="area_id"
                  disabledOption={t("select")}
                  value={searchFilterData?.area_id}
                  onChange={(e) => handleChange(e)}
                  options={areas?.map((area) => ({
                    name: area.name,
                    value: area.id,
                  }))}
                />
                <div className="d-flex gap-2 w-100">
                  <div className="search-btn">
                    <button onClick={handleSubmit}>{t("search.apply")}</button>
                  </div>
                  <div className="search-btn">
                    <span onClick={handleClearFilters}>
                      {t("search.clear")}
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </aside>
          <div className="small-filter-header">
            <h6>{t("projects.title")}</h6>
            <button
              className="openfilter"
              onClick={() => setIsFilterOpen(true)}
            >
              <i className="fa-light fa-sliders"></i>
            </button>
          </div>
          <div className="col-lg-9 col-12 p-2">
            <div className="row">
              {marketsLoading ? (
                <>
                  {" "}
                  <DataLoader minHeight="200px" />{" "}
                </>
              ) : markets?.data && markets?.data?.length > 0 ? (
                markets?.data?.map((market) => (
                  <div className="col-lg-6 col-12 p-3" key={market?.id}>
                    <FavoriteMarketCard market={market} />
                  </div>
                ))
              ) : (
                <EmptyData minHeight={"300px"}>
                  {t("markets.noMarkets")}
                </EmptyData>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Markets;
