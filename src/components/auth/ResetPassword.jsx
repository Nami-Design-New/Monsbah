import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helpers";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";

function ResetPassword({ setFormType, setShow, userState }) {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/${userState}/auth/change-password`,
        {
          phone: formData.country_code + formData.phone,
          password: formData.password,
          country_code: formData.country_code,
          fcm_token: formData.fcm_token,
        }
      );
      if (res.status === 200) {
        toast.success(res.data?.message);

        setFormType("login");

        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete("redirect");
        setSearchParams(updatedParams);
        setShow(false);
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
        <h2 className="head">{t("auth.changePasswordTitle")} </h2>
        <p className="sub-head">{t("auth.changePasswordSubtitle")}</p>
      </div>

      <PasswordField
        label={t("auth.password")}
        placeholder={t("auth.password")}
        required
        id="password"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <PasswordField
        label={t("auth.passwordConfirmation")}
        placeholder={t("auth.passwordConfirmation")}
        required
        id="password_confirmation"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={(e) => handleChange(e, setFormData)}
      />

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

        <SubmitButton name={t("save")} loading={loading} />
      </div>
    </form>
  );
}

export default ResetPassword;
