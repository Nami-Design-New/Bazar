import { useState } from "react";
import PhoneField from "../ui/form-elements/PhoneField";
import PasswordField from "../ui/form-elements/PasswordField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Login() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="auth-form container col-12 col-lg-6">
      <div className="form-title">
        <h1 className="title">{t("auth.login")}</h1>
        <h5 className="sub-title">{t("auth.loginSubtitle")}</h5>
      </div>
      <form>
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

        <Link to="/forget-password" className="forgetpass gradient-text">
          {t("auth.forgetPassword")}
        </Link>

        <div className="d-flex gap-3 align-items-center flex-column w-100">
          <SubmitButton loading={loading} name={t("auth.login")} />
          <Link to="/" className="custom-btn stroke">
            <span>{t("auth.loginAsGuest")}</span>
          </Link>
        </div>
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <Link to="/register" className="noAccount">
            {t("auth.don'tHaveAccount")}{" "}
            <span className="gradient-text">{t("auth.createAccount")}</span>
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
