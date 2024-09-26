import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helpers";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import PhoneInput from "../../ui/form-elements/PhoneInput";

function Login({ setFormType }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    country_code: "965",
    fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi"
  });

  return (
    <form className="form">
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

      <SubmitButton name={t("auth.login")} />

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
