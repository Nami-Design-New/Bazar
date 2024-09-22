import { useState } from "react";
import ForgetStep1 from "../components/forgetPassword/ForgetStep1";
import ForgetStep2 from "../components/forgetPassword/ForgetStep2";
import ForgetStep3 from "../components/forgetPassword/ForgetStep3";
import SectionHeader from "../ui/layout/SectionHeader";

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [otpData, setOtpData] = useState({});

  const [formData, setFormData] = useState({
    phone: ""
  });

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
              {step === 1 && (
                <ForgetStep1
                  setStep={setStep}
                  setOtpData={setOtpData}
                  formData={formData}
                  handleChange={handleChange}
                />
              )}
              {step === 2 && (
                <ForgetStep2
                  setStep={setStep}
                  otpData={otpData}
                  setOtpData={setOtpData}
                  phone={formData.phone}
                  formData={formData}
                />
              )}
              {step === 3 && (
                <ForgetStep3
                  setStep={setStep}
                  code={otpData.code}
                  phone={formData?.phone}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
