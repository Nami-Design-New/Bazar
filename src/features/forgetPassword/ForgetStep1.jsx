import PhoneField from "../../ui/form-elements/PhoneField";
import headerImg from "../../assets/images/forget-1.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "../../ui/form-elements/SubmitButton";

function ForgetStep1({ setStep }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
  });

  return (
    <>
      <div className="form-header-image">
        <img src={headerImg} alt="forget password" />
      </div>
      <div className="form-title">
        <h5 className="sub-title">{t("auth.forgetPasswordSubtitle")}</h5>
      </div>
      <form>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <PhoneField
            formData={formData}
            setFormData={setFormData}
            id="phone"
          />
        </div>
        <SubmitButton
          onClick={() => setStep(2)}
          name={t("auth.next")}
          loading={loading}
        />
      </form>
    </>
  );
}

export default ForgetStep1;
