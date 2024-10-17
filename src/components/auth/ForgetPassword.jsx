import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import PhoneInput from "../../ui/form-elements/PhoneInput";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import { handleChange } from "../../utils/helpers";

function ForgetPassword({ setFormType, setOtpCode }) {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    country_code: "965",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/client/auth/forget-password", {
        phone: formData.country_code + formData.phone,
        country_code: formData.country_code,
      });
      if (res.status === 200) {
        console.log(res.data);

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
        <h2 className="head">{t("auth.resetPasswordSubtitle")} </h2>
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

      <SubmitButton name={t("send")} loading={loading} />
    </form>
  );
}

export default ForgetPassword;
