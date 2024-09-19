import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleApplyFilters } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import SectionHeader from "../ui/layout/SectionHeader";
import InputField from "../ui/form-elements/InputField";
import SelectField from "../ui/form-elements/SelectField";
import FavoriteMarketCard from "../ui/cards/FavoriteMarketCard";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import useGetAreas from "./../hooks/settings/useGetAreas";
import useGetCities from "./../hooks/settings/useGetCities";
import useCategoriesList from "./../components/categories/useCategoriesList";
import useMarketsByFilter from "./../hooks/markets/useMarketsByFilter";
import DepartmentFilterBox from "../ui/filter/DepartmentFilterBox";

function Markets() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchFilterData, setSearchFilterData] = useState({
    search: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || null,
    type: Number(searchParams.get("type")) || "",
    city_id: Number(searchParams.get("city_id")) || "",
    area_id: Number(searchParams.get("area_id")) || "",
    category_id: searchParams.get("category_id")
      ? searchParams
          .get("category_id")
          .split("-")
          .map((category) => Number(category))
      : [],
  });

  const { data: areas } = useGetAreas(
    searchFilterData.city_id,
    searchFilterData.city_id ? true : false
  );
  const { data: cities, citiesLoading } = useGetCities();
  const { data: categories, categoriesLoading } = useCategoriesList();
  const { isLoading: marketsLoading, data: markets } = useMarketsByFilter();

  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;
    const parsedValue = type === "checkbox" ? (checked ? 1 : 0) : value;

    if (name !== "category_id" && name !== "sub_category_id") {
      setSearchFilterData((prevState) => ({
        ...prevState,
        [name]: parsedValue,
      }));
      return;
    }

    const categoryValue = Number(value);
    setSearchFilterData((prevState) => {
      const updatedState = { ...prevState };

      const updateList = (list = [], value, add) => {
        return add ? [...list, value] : list.filter((id) => id !== value);
      };

      if (name === "category_id") {
        updatedState[name] = updateList(
          prevState[name],
          categoryValue,
          checked
        );
      }

      if (name === "sub_category_id") {
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
      type: Number(searchParams.get("type")) || "",
      city_id: Number(searchParams.get("city_id")) || "",
      area_id: Number(searchParams.get("area_id")) || "",
      category_id: searchParams.get("category_id")
        ? searchParams
            .get("category_id")
            .split("-")
            .map((category) => Number(category))
        : [],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters(setSearchParams, searchFilterData);
  }

  if (categoriesLoading || citiesLoading || marketsLoading) {
    return <DataLoader />;
  }

  return (
    <>
      <SectionHeader />
      <section className="ads-page search-section">
        <section className="container">
          <div className="row">
            {/* side menu filter */}
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
                    categoriesValue={searchFilterData?.category_id}
                    sub_categoriesValue={searchFilterData?.sub_category_id}
                    onChange={handleChange}
                    categoriesWithSubCategories={categories?.data}
                    viewSubCategories={false}
                  />
                  <SelectField
                    label={t("search.city")}
                    id="city_id"
                    name="city_id"
                    disabledOption={t("select")}
                    value={searchFilterData?.city_id}
                    onChange={(e) => handleChange(e)}
                    options={cities?.data?.map((city) => ({
                      name: city?.name,
                      value: city?.id,
                    }))}
                  />
                  <SelectField
                    label={t("search.area")}
                    id="area_id"
                    name="area_id"
                    disabledOption={t("select")}
                    value={searchFilterData?.area_id}
                    onChange={(e) => handleChange(e)}
                    options={areas?.data?.map((area) => ({
                      name: area?.name,
                      value: area?.id,
                    }))}
                  />
                  <div className="input-field">
                    <label>{t("search.type")}</label>
                    <Form.Check
                      type="radio"
                      name="type"
                      value="store"
                      checked={searchFilterData.type === "store"}
                      onChange={(e) => handleChange(e)}
                      label={t("search.store")}
                    />
                    <Form.Check
                      type="radio"
                      name="type"
                      value="online_store"
                      checked={searchFilterData.type === "online_store"}
                      onChange={(e) => handleChange(e)}
                      label={t("search.onlineStore")}
                    />
                    <Form.Check
                      type="radio"
                      name="type"
                      value="market"
                      checked={searchFilterData.type === "market"}
                      onChange={(e) => handleChange(e)}
                      label={t("search.market")}
                    />
                    <Form.Check
                      type="radio"
                      name="type"
                      value="coupon"
                      checked={searchFilterData.type === "coupon"}
                      onChange={(e) => handleChange(e)}
                      label={t("search.coupon")}
                    />
                  </div>
                  <div className="d-flex gap-2 w-100">
                    <button onClick={handleSubmit} className="search-btn">
                      <i className="fa-regular fa-check"></i>{" "}
                      {t("search.apply")}
                    </button>
                    <button onClick={handleClearFilters} className="search-btn">
                      <i className="fa-regular fa-xmark"></i>{" "}
                      {t("search.clear")}
                    </button>
                  </div>
                </form>
              </div>
            </aside>

            {/* small media open filter */}
            <div className="small-filter-header">
              <h6>{t("projects.title")}</h6>
              <button
                className="openfilter"
                onClick={() => setIsFilterOpen(true)}
              >
                <i className="fa-light fa-sliders"></i>
              </button>
            </div>

            {/* markets */}
            <div className="col-lg-9 col-12 p-2">
              <div className="row">
                {marketsLoading ? (
                  <>
                    {" "}
                    <DataLoader minHeight="400px" />{" "}
                  </>
                ) : markets?.data && markets?.data?.length > 0 ? (
                  markets?.data?.map((market) => (
                    <div
                      className="col-lg-4 col-md-6 col-12 p-2"
                      key={market?.id}
                    >
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
      </section>
    </>
  );
}

export default Markets;
