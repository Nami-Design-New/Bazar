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

const cities = [
  {
    id: 1,
    name: "الرياض",
  },
  {
    id: 2,
    name: "جدة",
  },
  {
    id: 3,
    name: "مكة",
  },
];

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

function Ads() {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading: adsLoading, data: ads } = useAdsByFilter();
  const { isLoading: categoriesLoading, data: categories } =
    useCategoriesList();

  const { isLoading: filtersLoading, data: filters } = useGetFilters();

  console.log("filters", filters?.data);

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
      price_from: Number(searchParams.get("price_from")) || null,
      price_to: Number(searchParams.get("price_to")) || null,
      duration_from: Number(searchParams.get("duration_from")) || null,
      duration_to: Number(searchParams.get("duration_to")) || null,
      page: Number(searchParams.get("page")) || null,
      ad_type: Number(searchParams.get("ad_type")) || "sell",
      city_id: Number(searchParams.get("city_id")) || "",
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

  // const handleSliderChange = (name, value) => {
  //   if (name === "duration") {
  //     setSearchFilterData((prevState) => ({
  //       ...prevState,
  //       duration_from: value[0],
  //       duration_to: value[1],
  //     }));
  //   } else if (name === "price") {
  //     setSearchFilterData((prevState) => ({
  //       ...prevState,
  //       price_from: value[0],
  //       price_to: value[1],
  //     }));
  //   }
  // };

  function handleSubmit(e) {
    e.preventDefault();
    handleApplyFilters(setSearchParams, searchFilterData);
  }

  if (categoriesLoading || filtersLoading || adsLoading) {
    return <DataLoader />;
  }

  return (
    <div className="ads-page">
      <SectionHeader />
      <section className="content-wrapper container search-section col-lg-10 col-12">
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
                    options={cities?.map((city) => ({
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
                    options={areas?.map((area) => ({
                      name: area.name,
                      value: area.id,
                    }))}
                  />
                  {/* <div className="w-100 mb-4 px-4">
                    <h6 className="mb-2">{t("search.deliveryTime")}</h6>
                    <RangeSlider
                      min={1}
                      steps={1}
                      max={360}
                      value={[
                        searchFilterData.duration_from,
                        searchFilterData.duration_to,
                      ]}
                      handleSlide={(value) =>
                        handleSliderChange("duration", value)
                      }
                      minType={t("search.days")}
                      maxType={t("search.days")}
                    />
                  </div> */}
                  {/* <div className="w-100 mb-4 px-4">
                    <h6 className="mb-2">{t("search.budget")}</h6>
                    <RangeSlider
                      min={5}
                      max={2000}
                      steps={5}
                      value={[
                        searchFilterData.price_from,
                        searchFilterData.price_to,
                      ]}
                      handleSlide={(value) =>
                        handleSliderChange("price", value)
                      }
                      minType="$"
                      maxType="$"
                    />
                  </div> */}
                  <div className="d-flex gap-2 w-100">
                    <div className="search-btn">
                      <button onClick={handleSubmit}>
                        {t("search.apply")}
                      </button>
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
          </>

          <div className="col-lg-9 col-12 p-2">
            <div className="row">
              {ads && ads?.data?.length > 0 ? (
                ads?.data?.map((ad) => (
                  <div className="col-lg-4 col-md-6 col-12 p-2" key={ad.id}>
                    <Post post={ad} />
                  </div>
                ))
              ) : (
                <EmptyData minHeight={"300px"}>{t("ads.noAds")}</EmptyData>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ads;
