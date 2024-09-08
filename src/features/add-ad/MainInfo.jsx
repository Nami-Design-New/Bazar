import { handleChange } from "../../utils/helpers";
import InputField from "./../../ui/form-elements/InputField";
import SelectField from "./../../ui/form-elements/SelectField";
import TextField from "./../../ui/form-elements/TextField";

function MainInfo({ formData, setFormData, setForm }) {
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
          options={[
            {
              name: "تصنيف 1",
              value: 1
            },
            {
              name: "تصنيف 2",
              value: 2
            }
          ]}
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
          value={formData?.sub_category_id}
          onChange={(e) => handleChange(e, setFormData)}
          options={[
            {
              name: "تصنيف فرعي 1",
              value: 1
            },
            {
              name: "تصنيف فرعي 2",
              value: 2
            }
          ]}
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
