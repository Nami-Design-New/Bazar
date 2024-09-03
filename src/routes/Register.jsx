import { useState } from "react";
import ImageUpload from "../ui/form-elements/ImageUpload";
import PhoneField from "../ui/form-elements/PhoneField";
import PasswordField from "../ui/form-elements/PasswordField";
import InputField from "../ui/form-elements/InputField";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SubmitButton from "../ui/form-elements/SubmitButton";

function Register() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userImage: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="auth-form container col-12 col-lg-6">
      <div className="form-title">
        <h1 className="title">{t("auth.register")}</h1>
        <h5 className="sub-title">{t("auth.registerSubtitle")}</h5>
      </div>
      <form>
        <ImageUpload
          type="file"
          name="userImage"
          id="img-upload"
          accept="image/*"
          formData={formData}
          setFormData={setFormData}
        />
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <InputField
            label={t("auth.name")}
            placeholder={t("auth.name")}
            name="name"
            type="text"
            id="name"
            required={true}
            value={formData.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <InputField
            label={t("auth.email")}
            placeholder="example@example.com"
            type="email"
            name="email"
            id="email"
            required={true}
            formData={formData}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <PhoneField
            formData={formData}
            setFormData={setFormData}
            id="phone"
          />
        </div>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <PasswordField
            label={t("auth.password")}
            name={"password"}
            id={"password"}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <p className="d-flex w-100 gap-2 terms-condition-alert">
          {t("auth.acceptingTermsByContinue1")}
          <Link to="/terms" className="gradient-text">
            {t("auth.terms")}
          </Link>
          {t("auth.acceptingTermsByContinueAnd")}
          <Link to="/privacy" className="gradient-text">
            {t("auth.privacy")}
          </Link>
          {t("auth.acceptingTermsByContinue2")}
        </p>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <SubmitButton loading={loading} name={t("auth.createAccount")} />
        </div>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <Link to="/login" className="noAccount">
            {t("auth.alreadyHaveAccount")}{" "}
            <span className=" gradient-text">{t("auth.login")}</span>
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
