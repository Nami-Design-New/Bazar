import { useState } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";

const PhoneField = ({ formData, setFormData, id, value, icon }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const { t } = useTranslation();

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="input-field">
      <label htmlFor="phone">
        {icon} {t("auth.phone")}
      </label>
      <div className="phone-group">
        <PhoneInput
          placeholder="0XXXXXXXXXX"
          value={value || phoneNumber}
          onChange={handlePhoneNumberChange}
          countryOptionsOrder={["SA", "AE"]}
          defaultCountry="SA"
          id={id}
          name="phone"
        />
      </div>
    </div>
  );
};

export default PhoneField;
