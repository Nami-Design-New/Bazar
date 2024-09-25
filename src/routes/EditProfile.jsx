import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ImageUpload from "../ui/form-elements/ImageUpload";
import PhoneField from "../ui/form-elements/PhoneField";
import PasswordField from "../ui/form-elements/PasswordField";
import InputField from "../ui/form-elements/InputField";
import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form-elements/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { setUser } from "../redux/slices/authedUser";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../ui/layout/SectionHeader";

function EditProfile() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [wantChangePassword, setWantChangePassword] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authedUser.user);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setFormData({
      image: user?.image || "",
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestBody = {};

    if (formData.image && formData.image !== user?.image) {
      requestBody.image = formData.image;
    }

    if (formData.name && formData.name !== user?.name) {
      requestBody.name = formData.name;
    }

    if (formData.email && formData.email !== user?.email) {
      requestBody.email = formData.email;
    }

    if (formData.phone && formData.phone !== user?.phone) {
      requestBody.phone = formData.phone;
    }

    if (password && wantChangePassword) {
      requestBody.password = password;
    }

    try {
      const res = await axios.post("/user/update_profile", requestBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code === 200) {
        toast.success(t("auth.profileEditedSuccessfully"));
        dispatch(setUser(res.data.data));
        navigate("/profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
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
              <div className="form-title">
                <h1 className="title">{t("auth.editProfile")}</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <ImageUpload
                  type="file"
                  name="userImage"
                  id="img-upload"
                  accept="image/*"
                  formData={formData}
                  image={user?.image}
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
                    value={formData.email}
                  />
                </div>
                <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                  <PhoneField
                    label={t("auth.phone")}
                    onChange={handleChange}
                    value={formData.phone}
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={t("0XXXXXXXXXX")}
                    maxLength={9}
                    required={true}
                  />
                </div>
                <div className="question p-0 pt-2">
                  <label htmlFor="wantChangePassword" className="quest">
                    {t("auth.doYouWantChangePassword")}
                  </label>
                  <Form.Switch
                    id="wantChangePassword"
                    name="wantChangePassword"
                    checked={wantChangePassword}
                    onChange={() => setWantChangePassword(!wantChangePassword)}
                  />
                </div>
                {wantChangePassword && (
                  <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                    <PasswordField
                      label={t("auth.password")}
                      name={"password"}
                      id={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}
                <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                  <SubmitButton
                    className={"custom-btn filled"}
                    loading={loading}
                    name={t("auth.saveChanges")}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditProfile;
