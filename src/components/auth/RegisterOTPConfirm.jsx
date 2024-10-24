import { toast } from "react-toastify";
import OtpContainer from "../../ui/form-elements/OtpContainer";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function RegisterOTPConfirm({ formData, setFormData, setFormType }) {
  const { t } = useTranslation();
  const [otpVerifyCode, setOtpVerifyCode] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleResend = async (e) => {
    e.preventDefault();
    setResendDisabled(true);
    setLoading(true);

    try {
      const res = await axiosInstance.post(
        "/client/auth/sign-up/resend-verify-phone",
        {
          phone: formData.phone,
          country_code: formData.country_code,
        }
      );

      if (res.status === 200) {
        toast.success(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error);
    } finally {
      setLoading(false);
      setTimer(60);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post(
        "/client/auth/sign-up/verify-phone",
        {
          phone: formData.country_code + formData.phone,
          country_code: formData.country_code,
          otp: otpVerifyCode.code,
        }
      );
      if (res.status === 200) {
        toast.success(res.data?.message);

        setFormType("login");

        setFormData({
          name: "",
          username: "",
          country_code: "965",
          phone: "",
          email: "",
          password: "",
          password_confirmation: "",
          country_id: "",
          city_id: "",
          state_id: "",
          fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
          gender: "",
        });

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

      <div className="resend-code">
        <span className={`resend_link ${resendDisabled ? "disabled" : ""}`}>
          {t("auth.didnotReceiveCode")}
          <span
            className=""
            style={{ cursor: "pointer" }}
            onClick={handleResend}
          >
            {t("auth.resendCode")}
          </span>
        </span>
        <div
          className="timer flex-row-reverse"
          style={{ justifyContent: "end !important" }}
        >
          <span>
            {Math.floor(timer / 60)
              .toString()
              .padStart(2, "0")}
          </span>
          :<span>{(timer % 60).toString().padStart(2, "0")}</span>
        </div>
      </div>

      <SubmitButton name={t("auth.verify")} loading={loading} />
    </form>
  );
}

export default RegisterOTPConfirm;
