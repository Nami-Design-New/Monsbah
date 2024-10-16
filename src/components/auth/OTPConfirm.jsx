import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

import SubmitButton from "../../ui/form-elements/SubmitButton";

import OtpContainer from "../../ui/form-elements/OtpContainer";

function OTPConfirm({ setFormType, otpCode }) {
  const { t } = useTranslation();
  const [otpVerifyCode, setOtpVerifyCode] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // const res = await axiosInstance.post("/client/auth/login", {
    //   phone: formData.country_code + formData.phone,
    //   country_code: formData.country_code,
    //   fcm_token: formData.fcm_token,
    // });

    if (+otpCode === +otpVerifyCode.code) {
      toast.success(t("auth.otpSuccessfullyVerified"));

      setFormType("reset");

      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete("redirect");
      setSearchParams(updatedParams);
    } else {
      toast.error(t("auth.otpFailedToVerify"));
      setLoading(false);
      throw new Error("OTP verification failed");
    }
    setLoading(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="head">{t("auth.confirmOTPTitle")} </h2>
        <p className="sub-head">{t("auth.confirmOTPSubtitle")}</p>
      </div>

      <OtpContainer formData={otpVerifyCode} setFormData={setOtpVerifyCode} />

      <SubmitButton name={t("auth.verify")} loading={loading} />
    </form>
  );
}

export default OTPConfirm;
