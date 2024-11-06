import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

import SubmitButton from "../../ui/form-elements/SubmitButton";

import OtpContainer from "../../ui/form-elements/OtpContainer";
import axiosInstance from "../../utils/axiosInstance";

function OTPConfirm({ formData, setFormType }) {
  const { t } = useTranslation();
  const [otpVerifyCode, setOtpVerifyCode] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/client/auth/reset-password", {
        phone: formData.country_code + formData.phone,
        country_code: formData.country_code,
        token: otpVerifyCode.code,
      });
      if (res.status === 200) {
        toast.success(res.data?.message);

        setFormType("reset");

        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete("redirect");
        setSearchParams(updatedParams);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="head">{t("auth.confirmOTPTitle")} </h2>
        <p className="sub-head">{t("auth.confirmOTPSubtitle")}</p>
      </div>

      <OtpContainer formData={otpVerifyCode} setFormData={setOtpVerifyCode} />

      <div className="d-flex align-items-center gap-2">
        <button
          aria-label="Back"
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            setFormType("forget");
          }}
        >
          <i className="fal fa-arrow-right"></i>
        </button>
        <SubmitButton name={t("auth.verify")} loading={loading} />
      </div>
    </form>
  );
}

export default OTPConfirm;
