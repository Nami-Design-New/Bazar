import { useState } from "react";
import { Form } from "react-bootstrap";
import ImageUpload from "../ui/form-elements/ImageUpload";
import PhoneField from "../ui/form-elements/PhoneField";
import PasswordField from "../ui/form-elements/PasswordField";
import InputField from "../ui/form-elements/InputField";
import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form-elements/SubmitButton";

function EditProfile() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [wantChangePassword, setWantChangePassword] = useState(false);
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
        <h1 className="title">{t("auth.editProfile")}</h1>
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="d-flex gap-2 flex-lg-row flex-column w-100">
          <SubmitButton loading={loading} name={t("auth.saveChanges")} />
        </div>
      </form>
    </section>
  );
}

export default EditProfile;
