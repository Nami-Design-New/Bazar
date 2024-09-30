import { useState } from "react";
import ConfirmOtp from "../components/register/ConfirmOtp";
import RegisterForm from "../components/register/RegisterForm";
import SectionHeader from "../ui/layout/SectionHeader";

function Register() {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    token: 123,
  });
  const [showOtp, setShowOtp] = useState(true);
  const [otpData, setOtpData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <SectionHeader />
      <section className="auth-form">
        <div className="container">
          {showOtp ? (
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
          )}
        </div>
      </section>
    </>
  );
}

export default Register;
