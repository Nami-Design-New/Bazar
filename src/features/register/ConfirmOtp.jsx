import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { setIsLogged, setUser } from "../../redux/slices/authedUser";
import Otpcontainer from "./../../ui/form-elements/OtpContainer";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axios from "../../utils/axios";
import headerImg from "../../assets/images/forget-2.svg";

const ConfirmOtp = ({ otpData, setOtpData, formData }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);

  const headers = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  };

  const checkCodeRequest = {
    method: "POST",
    headers: headers,
    data: {
      ...otpData,
      ...formData,
      type: "register",
    },
    url: "/user/check_code",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.request(checkCodeRequest);
      console.log("otp", res);

      if (res.data.code === 200) {
        // toast.success(t("auth.registerSuccess"));
        console.log(formData);

        const login = await axios.post("/user/register", formData);
        console.log("login", login);
        if (login.data.code === 200) {
          toast.success(t("auth.registerSuccess"));
          navigate("/");
          dispatch(setUser(login.data.data));
          dispatch(setIsLogged(true));
          setCookie("token", login.data.data.token, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          setCookie("id", login.data.data.id, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
          axios.defaults.headers.common[
            "Authorization"
          ] = `${login.data.data.token}`;
        } else {
          toast.error(login.data.message);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Forget password error:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="auth-form container col-12 col-lg-6">
      <div className="form-header-image">
        <img src={headerImg} alt="forget password" />
      </div>
      <div className="form-title">
        <h5 className="sub-title">{t("auth.enterOTP")}</h5>
      </div>
      <form
        className="form forgetpasswordForm otp-small"
        onSubmit={handleSubmit}
      >
        <Otpcontainer formData={otpData} setFormData={setOtpData} />
        <SubmitButton
          loading={loading}
          name={t("auth.createAccount")}
          className={"mt-3"}
        />
      </form>
    </section>
  );
};

export default ConfirmOtp;
