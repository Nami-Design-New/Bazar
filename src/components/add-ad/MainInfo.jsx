import { useEffect, useState } from "react";
import { handleChange } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import useCategoriesList from "../categories/useCategoriesList";
import InputField from "./../../ui/form-elements/InputField";
import SelectField from "./../../ui/form-elements/SelectField";
import TextField from "./../../ui/form-elements/TextField";
import { toast } from "react-toastify";

function MainInfo({ formData, setFormData, setForm }) {
  const { data: categories } = useCategoriesList();
  const { t } = useTranslation();
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (formData?.category_id) {
      setSubCategories(
        categories?.data?.find((c) => c.id === Number(formData?.category_id))
          ?.sub_categories
      );
    }
  }, [formData?.category_id, categories]);

  const handleGetNextPage = (e) => {
    e.preventDefault();
    if (
      formData?.title &&
      formData?.ad_type &&
      formData?.category_id &&
      formData?.sub_category_id &&
      formData?.description
    ) {
      setForm("location");
    } else {
      toast.error(t("fillAllRequiredFields"));
    }
  };

  return (
    <div className="row w-100">
      {/* ** */}
      <div className="col-lg-6 col-12 p-2">
        <div className="input-field">
          <label htmlFor="ad_type">{t("ads.ad_type")}</label>
          <div className="radios">
            <label htmlFor="sell">
              <input
                type="radio"
                name="ad_type"
                id="sell"
                value="sell"
                checked={formData?.ad_type === "sell"}
                onChange={(e) => handleChange(e, setFormData)}
              />
              <span>{t("ads.sell")}</span>
            </label>
            <label htmlFor="buy">
              <input
                type="radio"
                name="ad_type"
                id="buy"
                value="buy"
                checked={formData?.ad_type === "buy"}
                onChange={(e) => handleChange(e, setFormData)}
              />
              <span>{t("ads.buy")}</span>
            </label>
          </div>
        </div>
      </div>
      {/* ** */}
      <div className="col-lg-6 col-12 p-2">
        <InputField
          required
          label={t("ads.title")}
          placeholder={t("ads.titlePlaceholder")}
          name="title"
          id="title"
          value={formData?.title}
          onChange={(e) => {
            handleChange(e, setFormData);
          }}
        />
      </div>
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
      {/* ** */}
      <div className="col-12 p-2">
        <TextField
          required
          label={t("ads.description")}
          placeholder={t("ads.descriptionPlaceholder")}
          name="description"
          id="description"
          value={formData?.description}
          onChange={(e) => {
            handleChange(e, setFormData);
          }}
        />
      </div>
      <div className="col-12 p-2">
        <div className="btns">
          <button
            type="submit"
            className="wizard_btn next"
            onClick={handleGetNextPage}
          >
            {t("ads.next")} <i className="fa-regular fa-angle-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
