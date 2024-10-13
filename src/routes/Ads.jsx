import { useTranslation } from "react-i18next";
import { useState } from "react";
import { handleApplyFilters } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";
import SectionHeader from "../ui/layout/SectionHeader";
import InputField from "../ui/form-elements/InputField";
// import RangeSlider from "../ui/form-elements/RangeSlider";
import SelectField from "../ui/form-elements/SelectField";
import DepartmentFilterBox from "../ui/filter/DepartmentFilterBox";
import DataLoader from "../ui/DataLoader";
import EmptyData from "../ui/EmptyData";
import useCategoriesList from "../components/categories/useCategoriesList";
import useAdsByFilter from "../hooks/ads/useAdsByFilter";
import useGetFilters from "./../hooks/settings/useGetFilters";
import Post from "../ui/cards/Post";
import FiltersGenerator from "../ui/filter/FiltersGenerator";
import useGetAreas from "../hooks/settings/useGetAreas";
import useGetCities from "../hooks/settings/useGetCities";
import CustomPagination from "../ui/CustomPagination";

function Ads() {
  const { t } = useTranslation();
  const [dynamicFilterData, setDynamicFilterData] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [requestBody, setRequestBody] = useState({});
  const { isLoading: adsLoading, data: ads } = useAdsByFilter(requestBody);
  const { isLoading: categoriesLoading, data: categories } =
    useCategoriesList();

  const { isLoading: filtersLoading, data: filters } = useGetFilters();

  console.log(filters?.data);

  const [searchFilterData, setSearchFilterData] = useState({
    search: searchParams.get("search") || "",
    price_from: Number(searchParams.get("price_from")) || null,
    price_to: Number(searchParams.get("price_to")) || null,
    duration_from: Number(searchParams.get("duration_from")) || null,
    duration_to: Number(searchParams.get("duration_to")) || null,
    page: Number(searchParams.get("page")) || null,
    ad_type: Number(searchParams.get("ad_type")) || "sell",
    city_id: Number(searchParams.get("city_id")) || "",
    area_id: Number(searchParams.get("area_id")) || "",
    category_id: searchParams.get("category_id")
      ? Number(searchParams.get("category_id"))
      : "",
    sub_category_id: searchParams.get("sub_category_id")
      ? Number(searchParams.get("sub_category_id"))
      : "",
  });

  const { data: areas } = useGetAreas(
    searchFilterData.city_id,
    searchFilterData.city_id ? true : false
  );
  const { data: cities, citiesLoading } = useGetCities();

  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;
    const parsedValue = type === "checkbox" ? (checked ? 1 : 0) : value;

    if (name === "category_id") {
      if (searchFilterData?.sub_category_id) {
        setSearchFilterData((prevState) => ({
          ...prevState,
          [name]: parsedValue,
          sub_category_id: "",
        }));
      } else {
        setSearchFilterData((prevState) => ({
          ...prevState,
          [name]: parsedValue,
        }));
      }
    } else if (name === "sub_category_id") {
      if (searchFilterData?.category_id) {
        setSearchFilterData((prevState) => ({
          ...prevState,
          [name]: parsedValue,
          category_id: "",
        }));
      } else {
        setSearchFilterData((prevState) => ({
          ...prevState,
          [name]: parsedValue,
        }));
      }
    } else {
      setSearchFilterData((prevState) => ({
        ...prevState,
        [name]: parsedValue,
      }));
    }
  };

  function handleClearFilters() {
    setSearchParams({});
    setSearchFilterData({
      search: "",
      price_from: null,
      price_to: null,
      duration_from: null,
      duration_to: null,
      ad_type: "sell",
      city_id: "",
      area_id: "",
      category_id: "",
      sub_category_id: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setRequestBody({ ...dynamicFilterData });

    handleApplyFilters(setSearchParams, {
      ...searchFilterData,
      ...dynamicFilterData,
    });
  }

  if (categoriesLoading || filtersLoading || adsLoading || citiesLoading) {
    return <DataLoader />;
  }

  return (
    <div className="ads-page">
      <SectionHeader />
      <section className="content-wrapper search-section">
        <div className="container">
          <div className="row">
            <>
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
                    />
                    <SelectField
                      label={t("search.city")}
                      id="city_id"
                      name="city_id"
                      disabledOption={t("select")}
                      value={searchFilterData?.city_id}
                      onChange={(e) => handleChange(e)}
                      options={cities?.data?.map((city) => ({
                        name: city.name,
                        value: city.id,
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
                        name: area.name,
                        value: area.id,
                      }))}
                    />
                    <FiltersGenerator
                      filters={filters}
                      setDynamicFilterData={setDynamicFilterData}
                      dynamicFilterData={dynamicFilterData}
                    />
                    <div className="d-flex gap-2 w-100">
                      <button
                        onClick={handleClearFilters}
                        className="search-btn clear"
                      >
                        <i className="fa-regular fa-xmark"></i>{" "}
                        {t("search.clear")}
                      </button>
                      <button onClick={handleSubmit} className="search-btn">
                        <i className="fa-regular fa-check"></i>{" "}
                        {t("search.apply")}
                      </button>
                    </div>
                  </form>
                </div>
              </aside>
              <div className="small-filter-header">
                <h6></h6>
                <button
                  className="openfilter"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <i className="fa-light fa-sliders"></i>
                </button>
              </div>
            </>

            <div className="col-lg-9 col-12 p-2">
              <div className="row px-2">
                {ads && ads?.data?.length > 0 ? (
                  <>
                    {ads?.data?.map((ad) => (
                      <div className="col-lg-4 col-md-6 col-12 p-2" key={ad.id}>
                        <Post post={ad} />
                      </div>
                    ))}{" "}
                    {ads?.data && ads?.total > 10 && (
                      <CustomPagination count={ads?.total} pageSize={10} />
                    )}
                  </>
                ) : (
                  <EmptyData minHeight={"300px"}>{t("ads.noAds")}</EmptyData>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ads;
