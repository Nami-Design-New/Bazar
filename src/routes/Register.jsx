import { useState } from "react";
import ConfirmOtp from "../features/register/ConfirmOtp";
import RegisterForm from "../features/register/RegisterForm";

function Register() {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    token: 123,
  });
  const [showOtp, setShowOtp] = useState(false);
  const [otpData, setOtpData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return showOtp ? (
    <ConfirmOtp
      otpData={otpData}
      setOtpData={setOtpData}
      formData={formData}
      phone={formData?.phone}
    />
  ) : (
    <RegisterForm
      formData={formData}
      setFormData={setFormData}
      setOtpData={setOtpData}
      setShowOtp={setShowOtp}
      handleChange={handleChange}
    />
  );
}

export default Register;
