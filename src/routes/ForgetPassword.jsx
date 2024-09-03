import { useState } from "react";
import ForgetStep1 from "../features/forgetPassword/ForgetStep1";
import ForgetStep2 from "../features/forgetPassword/ForgetStep2";
import ForgetStep3 from "../features/forgetPassword/ForgetStep3";

function ForgetPassword() {
  const [step, setStep] = useState(1);

  return (
    <section className="auth-form container col-12 col-lg-6">
      {step === 1 && <ForgetStep1 setStep={setStep} />}
      {step === 2 && <ForgetStep2 setStep={setStep} />}
      {step === 3 && <ForgetStep3 setStep={setStep} />}
    </section>
  );
}

export default ForgetPassword;
