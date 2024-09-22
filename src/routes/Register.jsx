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
    token: 123
  });
  const [showOtp, setShowOtp] = useState(false);
  const [otpData, setOtpData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <SectionHeader />
      <section className="container">
        <div className="row m-0 justify-content-center">
          <div className="col-lg-8 col-12 p-2">
            <div className="auth-form">
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
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
