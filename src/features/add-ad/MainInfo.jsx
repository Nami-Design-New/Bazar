import { useEffect, useState } from "react";
import { handleChange } from "../../utils/helpers";
import useCategoriesList from "../categories/useCategoriesList";
import InputField from "./../../ui/form-elements/InputField";
import SelectField from "./../../ui/form-elements/SelectField";
import TextField from "./../../ui/form-elements/TextField";

function MainInfo({ formData, setFormData, setForm }) {
  const { data: categories } = useCategoriesList();
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (formData?.category_id) {
      setSubCategories(
        categories?.data?.find((c) => c.id === formData?.category_id)?.sub_categories
      );
    }
  }, [formData?.category_id, categories]);
  return (
    <div className="row w-100">
      {/* ** */}
      <div className="col-lg-6 col-12 p-2">
        <div className="input-field">
          <label htmlFor="ad_type">نوع الاعلان</label>
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
              <span>بيع</span>
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
              <span>شراء</span>
            </label>
          </div>
        </div>
      </div>
      {/* ** */}
      <div className="col-lg-6 col-12 p-2">
        <InputField
          required
          label="عنوان الاعلان"
          placeholder="مثال: موبايل"
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
          label="التصنيف"
          name="category_id"
          id="category_id"
          value={formData?.category_id}
          onChange={(e) => handleChange(e, setFormData)}
          disabledOption={"اختر التصنيف"}
          options={categories?.data?.map((category) => ({
            name: category.name,
            value: category.id
          }))}
        />
      </div>
      {/* ** */}
      <div className="col-lg-6 col-12 p-2">
        <SelectField
          label="التصنيف الفرعي"
          disabledOption={
            formData?.category_id ? "اختر التصنيف الفرعي" : "اختر التصنيف أولاً"
          }
          name="sub_category_id"
          id="sub_category_id"
          required
          value={formData?.sub_category_id}
          onChange={(e) => handleChange(e, setFormData)}
          options={subCategories?.map((category) => ({
            name: category.name,
            value: category.id
          }))}
        />
      </div>
      {/* ** */}
      <div className="col-12 p-2">
        <TextField
          required
          label="تفاصيل الاعلان"
          placeholder="مثال: ايفون 15 للبيع جديد 512 جيجا"
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
            onClick={(e) => {
              e.preventDefault();
              setForm("location");
            }}
          >
            التالى <i className="fa-regular fa-angle-left"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainInfo;
