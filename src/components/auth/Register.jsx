import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneInput from "../../ui/form-elements/PhoneInput";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import InputField from "./../../ui/form-elements/InputField";
import SelectField from "../../ui/form-elements/SelectField";
import useGetCountries from "./../../hooks/settings/useGetCountries";
import useGetCities from "../../hooks/settings/useGetCities";
import useGetStates from "../../hooks/settings/useGetStates";
import axiosInstance from "../../utils/axiosInstance";
function Register({ setFormType, formData, setFormData, setShow }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { data: countries } = useGetCountries();
  const { data: cities, isLoading: citiesLoading } = useGetCities(
    formData?.country_id,
    formData?.country_id ? true : false
  );
  const { data: states, isLoading: areasLoading } = useGetStates(
    formData?.city_id,
    formData?.city_id ? true : false
  );
  const handleChangeUserName = (e) => {
    const { value } = e.target;
    const validInput = /^[a-zA-Z]*$/;
    if (validInput.test(value)) {
      setFormData((prev) => ({
        ...prev,
        username: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData };
    payload.phone = formData.country_code + formData.phone;

    try {
      const res = await axiosInstance.post("/client/auth/sign-up", payload);
      if (res.status === 200) {
        toast.success(res.data?.message);
        setFormType("registerOtp");
      }
    } catch (error) {
      console.log(error.response?.data?.data);
      if (error.response?.data?.data) {
        const message = error.response?.data?.data
          ?.map((item) => `${item}<br />`)
          .join(" ");
        toast.error(
          <div
            style={{ textAlign: "start !important" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        );
      } else {
        toast.error(error.response.data.message);
      }
      // throw new Error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mb-4">
        <h2 className="head">
          {t("auth.registerTitle")}{" "}
          <img src="/images/icons/waving-hand.svg" alt="hand-wave" />
        </h2>
        <p className="sub-head">{t("auth.registerSubtitle")}</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form_group">
          <InputField
            required
            label={t("auth.userName")}
            placeholder={t("auth.userNamePlaceHolder")}
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) => handleChangeUserName(e, setFormData)}
          />
          <InputField
            required
            label={t("auth.fullName")}
            placeholder={t("auth.fullName")}
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="form_group">
          <SelectField
            required
            label={t("auth.country")}
            id="country_id"
            name="country_id"
            value={formData.country_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                country_id: e.target.value,
                city_id: "",
                state_id: "",
              })
            }
            options={countries?.map((country) => ({
              name: country?.name,
              value: country?.id,
            }))}
          />
          <SelectField
            required
            loading={citiesLoading}
            loadingText={t("isLoading")}
            label={t("auth.city")}
            id="city_id"
            name="city_id"
            value={formData.city_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                city_id: e.target.value,
                state_id: "",
              })
            }
            options={cities?.map((city) => ({
              name: city?.name,
              value: city?.id,
            }))}
          />
          <SelectField
            required
            loading={areasLoading}
            loadingText={t("isLoading")}
            label={t("auth.area")}
            id="state_id"
            name="state_id"
            value={formData.state_id}
            onChange={(e) => handleChange(e, setFormData)}
            options={states?.map((state) => ({
              name: state?.name,
              value: state?.id,
            }))}
          />
        </div>
        <div className="input-field">
          <label htmlFor="type">{t("auth.gender")}</label>
          <div className="radios">
            <label htmlFor="male">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={formData?.gender === "male"}
                onChange={(e) => handleChange(e, setFormData)}
              />
              <span>{t("auth.male")}</span>
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={formData?.gender === "female"}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    gender: e.target.value,
                  });
                }}
              />
              <span>{t("auth.female")}</span>
            </label>
          </div>
        </div>
        <div className="form_group">
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
          <InputField
            required
            label={t("auth.email")}
            placeholder={t("auth.email")}
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
        <div className="form_group">
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
        </div>
        <span className="noAccount mt-2">
          {t("auth.byContinueYouAccept")}{" "}
          <Link
            aria-label="Terms and Conditions"
            to="/terms-and-conditions"
            onClick={() => setShow(false)}
          >
            {t("tearmsAndConditions")}
          </Link>
        </span>
        <SubmitButton name={t("auth.register")} loading={loading} />
        <span className="noAccount">
          {t("auth.haveAccount")}{" "}
          <span onClick={() => setFormType("login")}>{t("auth.login")}</span>
        </span>
      </form>
    </>
  );
}
export default Register;
