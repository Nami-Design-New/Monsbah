import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helpers";
import { toast } from "react-toastify";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import PhoneInput from "../../ui/form-elements/PhoneInput";
import axiosInstance from "../../utils/axiosInstance";

function Login({ setFormType }) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    country_code: "965",
    fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/client/auth/login", formData);
      if (res.status === 200) {
        console.log(res.data);
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
        <h2 className="head">
          {t("auth.loginTitle")}{" "}
          <img src="/images/icons/waving-hand.svg" alt="hand-wave" />
        </h2>
        <p className="sub-head">{t("auth.loginSubtitle")}</p>
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

      <PasswordField
        label={t("auth.password")}
        placeholder={t("auth.password")}
        required
        id="password"
        name="password"
        value={formData.password}
        onChange={(e) => handleChange(e, setFormData)}
      />

      <span className="forgetpass">{t("auth.forgetPassword")}</span>

      <SubmitButton name={t("auth.login")} loading={loading} />

      <span className="noAccount">
        {t("auth.noAccount")}{" "}
        <span onClick={() => setFormType("register")}>
          {t("auth.register")}
        </span>
      </span>
    </form>
  );
}

export default Login;
