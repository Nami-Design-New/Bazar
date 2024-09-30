import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setIsLogged, setUser } from "../redux/slices/authedUser";
import { useCookies } from "react-cookie";
import PhoneField from "../ui/form-elements/PhoneField";
import PasswordField from "../ui/form-elements/PasswordField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import axios from "../utils/axios";
import SectionHeader from "../ui/layout/SectionHeader";

function Login() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    token: 123234,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token", "id"]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    formData.phone = Number(formData.phone);
    formData.password = Number(formData.password);

    try {
      const res = await axios.post("/user/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code === 200) {
        toast.success(t("auth.loginSuccess"));
        dispatch(setUser(res.data.data));
        dispatch(setIsLogged(true));
        navigate("/");
        setCookie("token", res.data.data.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        setCookie("id", res.data.data.id, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        axios.defaults.headers.common[
          "Authorization"
        ] = `${res.data.data.token}`;
      } else {
        toast.error(t("auth.phoneOrPasswordWrong"));
      }
    } catch (error) {
      toast.error(t("auth.loginErorr"));
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SectionHeader />
      <section className="container">
        <div className="row m-0 justify-content-center">
          <div className="col-lg-8 col-12 p-2">
            <div className="auth-form">
              {/* form title */}
              <div className="form-title">
                <h1 className="title">{t("auth.login")}</h1>
                <h5 className="sub-title">{t("auth.loginSubtitle")}</h5>
              </div>

              {/* form */}
              <form onSubmit={handleSubmit}>
                <PhoneField
                  onChange={handleChange}
                  value={formData.phone}
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("5xxxXXXXXXX")}
                />

                <PasswordField
                  label={t("auth.password")}
                  name={"password"}
                  id={"password"}
                  value={formData.password}
                  onChange={handleChange}
                />

                <Link to="/forget-password" className="forgetpass ">
                  {t("auth.forgetPassword")}
                </Link>

                <div className="d-flex gap-3 align-items-center flex-column w-100">
                  <SubmitButton
                    loading={loading}
                    name={t("auth.login")}
                    className={"custom-btn filled"}
                  />
                </div>
                <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                  <Link to="/register" className="noAccount">
                    {t("auth.don'tHaveAccount")}{" "}
                    <span className="">{t("auth.createAccount")}</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
