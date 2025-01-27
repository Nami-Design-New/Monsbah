import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { handleChange } from "../../utils/helpers";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import PhoneInput from "../../ui/form-elements/PhoneInput";
import SubmitButton from "../../ui/form-elements/SubmitButton";

function ForgetPassword({
  setFormType,
  setOtpCode,
  formData,
  setFormData,
  userState,
}) {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/${userState}/auth/forget-password`,
        {
          phone: formData.country_code + formData.phone,
          country_code: formData.country_code,
        }
      );
      if (res.status === 200) {
        toast.success(res.data?.message);

        setOtpCode(res.data?.data.otp);

        setFormType("otp");

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
        <h2 className="head">{t("auth.resetPasswordTitle")} </h2>
        <p className="sub-head">{t("auth.resetPasswordSubtitle")}</p>
      </div>

      <PhoneInput
        label={t("auth.phone")}
        required
        type="number"
        id="phone"
        name="phone"
        placeholder={t("auth.phone")}
        value={formData.mobile_number}
        countryCode={formData.country_code}
        onChange={(e) => handleChange(e, setFormData)}
        onSelect={(code, setShow) => {
          setFormData((prev) => ({ ...prev, country_code: code }));
          setShow(false);
        }}
      />

      <div className="d-flex align-items-center gap-2">
        <button
          aria-label="Back"
          className="back_btn"
          onClick={(e) => {
            e.preventDefault();
            setFormType("login");
          }}
        >
          <i className="fal fa-arrow-right"></i>
        </button>
        <SubmitButton name={t("send")} loading={loading} />
      </div>
    </form>
  );
}

export default ForgetPassword;
