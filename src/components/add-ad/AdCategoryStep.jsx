import { useTranslation } from "react-i18next";
import SelectField from "../../ui/form-elements/SelectField";
import { handleChange } from "../../utils/helpers";
import { useEffect, useState } from "react";
import useCategoriesList from "../categories/useCategoriesList";
import { toast } from "react-toastify";
import useGetFilters from "../../hooks/settings/useGetFilters";
import AdFormFiltersGenerator from "./AdFormFiltersGenerator";

function AdCategoryStep({
  ad,
  formData,
  setForm,
  setFormData,
  filterData,
  setFilterData,
}) {
  const { t } = useTranslation();
  const { data: categories } = useCategoriesList();
  const [subCategories, setSubCategories] = useState([]);
  const { data: filters } = useGetFilters(formData?.sub_category_id);

  useEffect(() => {
    if (formData?.category_id) {
      setSubCategories(
        categories?.data?.find((c) => c.id === Number(formData?.category_id))
          ?.sub_categories
      );
    }
    setForm;
  }, [formData?.category_id, categories, setForm]);

  const handleGetNextPage = (e) => {
    e.preventDefault();
    if (formData?.category_id && formData?.sub_category_id) {
      setForm("location");
    } else {
      toast.error(t("ads.selectCategoryAndSubcategory"));
    }
  };

  return (
    <div className="row w-100">
      {/* ** */}
      <div className="col-lg-6 col-12 p-2">
        <SelectField
          required
          label={t("ads.category")}
          name="category_id"
          id="category_id"
          value={formData?.category_id}
          onChange={(e) => handleChange(e, setFormData)}
          disabledOption={t("ads.selectCategory")}
          options={categories?.data?.map((category) => ({
            name: category.name,
            value: category.id,
          }))}
        />
      </div>
      {/* ** */}
      <div className="col-lg-6 col-12 p-2">
        <SelectField
          label={t("ads.subCategory")}
          disabledOption={
            formData?.category_id
              ? t("ads.selectSubCategory")
              : t("ads.selectCategoryFirst")
          }
          name="sub_category_id"
          id="sub_category_id"
          required
          value={formData?.sub_category_id}
          onChange={(e) => handleChange(e, setFormData)}
          options={subCategories?.map((category) => ({
            name: category.name,
            value: category.id,
          }))}
        />
      </div>

      <div className="col-12 p-2 d-flex flex-wrap">
        <AdFormFiltersGenerator
          ad={ad}
          filters={filters}
          setDynamicFilterData={setFilterData}
          dynamicFilterData={filterData}
        />
      </div>

      <div className="col-12 p-2">
        <div className="btns">
          <button
            className="wizard_btn prev"
            onClick={(e) => {
              e.preventDefault();
              setForm("main-info");
            }}
          >
            <i className="fa-regular fa-angle-right"></i> {t("ads.previous")}
          </button>
          <button className="wizard_btn next" onClick={handleGetNextPage}>
            {t("ads.next")} <i className="fa-regular fa-angle-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdCategoryStep;
