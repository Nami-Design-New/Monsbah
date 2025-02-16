import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handleChange, handleChangeUserName } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import InputField from "../../ui/form-elements/InputField";
import SelectField from "../../ui/form-elements/SelectField";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import useGetCountries from "../../hooks/settings/useGetCountries";
import useGetCities from "../../hooks/settings/useGetCities";
import useGetStates from "../../hooks/settings/useGetStates";
import PhoneInput from "../../ui/form-elements/PhoneInput";
import ImageUpload from "../../ui/form-elements/ImageUpload";
import useGetCompanyCategories from "../../hooks/settings/useGetCompanyCategories";
import axiosInstance from "../../utils/axiosInstance";

export default function RegisterCompany({
  setShow,
  setFormType,
  formData,
  setFormData,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const { data: countries } = useGetCountries();
  const { data: categories } = useGetCompanyCategories();
  const { data: cities, isLoading: citiesLoading } = useGetCities(
    formData?.country_id,
    formData?.country_id ? true : false
  );
  const { data: states, isLoading: areasLoading } = useGetStates(
    formData?.city_id,
    formData?.city_id ? true : false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { ...formData, new_version: 1 };
    payload.phone = formData.country_code + formData.phone;
    payload.whats_number = formData.whats_country_code + formData.whats_number;

    try {
      const res = await axiosInstance.post("/company/auth/sign-up", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success(res.data?.message);
        setFormType("companyOtp");
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-1">
        <p className="sub-head">{t("auth.registerSubtitle")}</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <ImageUpload
          type="file"
          name="userImage"
          id="img-upload"
          accept="image/*"
          uploadOnly={true}
          formData={formData}
          setFormData={setFormData}
        />

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
            label={t("auth.companyName")}
            placeholder={t("auth.companyName")}
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData)}
          />

          <SelectField
            required
            label={t("auth.category")}
            id="category_id"
            name="category_id"
            value={formData.category_id}
            options={categories?.map((c) => ({
              name: c?.name,
              value: c?.id,
            }))}
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

          <PhoneInput
            label={t("auth.whatsapp")}
            required
            type="number"
            id="whats_number"
            name="whats_number"
            placeholder={t("auth.whatsapp")}
            value={formData.whats_number}
            countryCode={formData.whats_country_code}
            onChange={(e) => handleChange(e, setFormData)}
            onSelect={(code, setShow) => {
              setFormData((prev) => ({ ...prev, whats_country_code: code }));
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

        <div className="form_group">
          <InputField
            as={"textarea"}
            id="about"
            name="about"
            value={formData.about}
            label={t("auth.companyDec")}
            placeholder={t("auth.enterDescription")}
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

        <div className="d-flex gap-2">
          <button
            className="back_btn"
            onClick={() => setFormType("register-type")}
          >
            <i className="fal fa-arrow-right"></i>
          </button>
          <SubmitButton name={t("auth.register")} loading={loading} />
        </div>
      </form>
    </>
  );
}
