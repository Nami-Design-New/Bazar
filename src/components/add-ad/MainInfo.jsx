import { handleChange } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import InputField from "./../../ui/form-elements/InputField";
import TextField from "./../../ui/form-elements/TextField";
import { toast } from "react-toastify";

function MainInfo({ formData, setFormData, setForm }) {
  const { t } = useTranslation();

  const handleGetNextPage = (e) => {
    e.preventDefault();
    if (formData?.title && formData?.ad_type && formData?.description) {
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
