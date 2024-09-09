import { useState } from "react";
import ConfirmOtp from "../features/register/ConfirmOtp";
import RegisterForm from "../features/register/RegisterForm";

function Register() {
  const [formData, setFormData] = useState({
    userImage: "",
    name: "",
    email: "",
    phone: "",
    password: "",
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
    <ConfirmOtp otpData={otpData} setOtpData={setOtpData} formData={formData} />
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
