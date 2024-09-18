import { useState } from "react";
import ForgetStep1 from "../components/forgetPassword/ForgetStep1";
import ForgetStep2 from "../components/forgetPassword/ForgetStep2";
import ForgetStep3 from "../components/forgetPassword/ForgetStep3";

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [otpData, setOtpData] = useState({});

  const [formData, setFormData] = useState({
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="auth-form container col-12 col-lg-6">
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
    </section>
  );
}

export default ForgetPassword;
