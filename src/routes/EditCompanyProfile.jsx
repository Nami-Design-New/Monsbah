import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { extractPhoneFromCode, handleChange } from "../utils/helpers";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import ImageUpload from "../ui/form-elements/ImageUpload";
import InputField from "../ui/form-elements/InputField";
import SelectField from "../ui/form-elements/SelectField";
import ChangeCountryModal from "../ui/modals/ChangeCountryModal";
import ChangePasswordModal from "../ui/modals/ChangePasswordModal";
import ChangePhoneModal from "../ui/modals/ChangePhoneModal";
import SubmitButton from "../ui/form-elements/SubmitButton";
import useGetCountries from "../hooks/settings/useGetCountries";
import useGetCities from "../hooks/settings/useGetCities";
import useGetStates from "../hooks/settings/useGetStates";
import axiosInstance from "../utils/axiosInstance";
import PhoneInput from "../ui/form-elements/PhoneInput";
import useGetCompanyCategories from "../hooks/settings/useGetCompanyCategories";

export default function EditCompanyProfile() {
  const { t } = useTranslation();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.clientData.client);

  const [formData, setFormData] = useState({
    image: "",
    cover: "",
    name: "",
    username: "",
    mobile_number: "",
    country_code: "965",
    email: "",
    country_id: "",
    city_id: "",
    state_id: "",
    about_ar: "",
    about_en: "",
    fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
  });

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name_ar: user?.name_ar || "",
      name_en: user?.name_en || "",
      image: user?.image || "",
      cover: user?.cover || "",
      username: user?.username || "",
      country_code: user?.country?.country_code.toString() || "965",
      mobile_number:
        extractPhoneFromCode(user?.phone, user?.country?.country_code) || "",
      whats_number: user?.whats_number.slice(3) || "",
      whats_country_code: user?.whats_number.slice(0, 3) || "965",
      email: user?.email || "",
      country_id: user?.country?.id || "",
      city_id: user?.city?.id || "",
      state_id: user?.state?.id || "",
      about_ar: user?.about_ar || "",
      about_en: user?.about_en || "",
      fcm_token: user?.fcm_token || "",
    }));
  }, [user]);

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

    const requestBody = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      country_code: formData.country_code,
      fcm_token: formData.fcm_token,
      country_id: user?.country?.id,
      city_id: user?.city?.id,
      state_id: user?.state?.id,
      about_ar: formData.about_ar,
      about_en: formData.about_en,
    };

    if (String(formData?.image?.type)?.startsWith("image")) {
      requestBody.image = formData.image;
    }

    if (String(formData?.cover?.type)?.startsWith("image")) {
      requestBody.cover = formData.cover;
    }

    try {
      const res = await axiosInstance.post(
        `/company/auth/profile/update`,
        requestBody,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.status === 200) {
        toast.success(t("profile.profileSuccessfullyUpdated"));
      } else {
        toast.error(t("someThingWentWrong"));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t("someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <form
          className="form col-lg-10 col-12 p-2 reverse-form"
          onSubmit={handleSubmit}
        >
          <ImageUpload
            type="file"
            name="userImage"
            id="img-upload"
            accept="image/*"
            formData={formData}
            image={user?.image}
            cover={user?.cover}
            setFormData={setFormData}
          />

          <div className="form_group">
            <InputField
              required
              label={t("auth.companyName")}
              placeholder={t("auth.companyName")}
              id="name_ar"
              name="name_ar"
              hint={"( عربى )"}
              value={formData.name_ar}
              onChange={(e) => handleChange(e, setFormData)}
            />

            <InputField
              required
              label={t("auth.companyName")}
              placeholder={t("auth.companyName")}
              id="name_en"
              name="name_en"
              hint={"( English )"}
              value={formData.name_en}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>

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
              label={
                <div className=" w-100 d-flex align-items-center justify-content-between gap-2">
                  <div>
                    {t("auth.phone")}
                    <span style={{ color: "red", fontSize: "20px" }}> *</span>
                  </div>
                  <span
                    className="d-flex align-items-center justify-content-end"
                    style={{ cursor: "pointer", color: "#1abc9c" }}
                    onClick={() => setShowPhoneModal(true)}
                  >
                    {t("auth.doYouWantToChangePhone")}
                  </span>
                </div>
              }
              required
              type="number"
              id="mobile_number"
              name="mobile_number"
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
            <InputField
              hint="( عربى )"
              as={"textarea"}
              id="about_ar"
              name="about_ar"
              value={formData.about_ar}
              label={t("auth.companyDec")}
              placeholder={t("auth.enterDescription")}
              onChange={(e) => handleChange(e, setFormData)}
            />

            <InputField
              as={"textarea"}
              hint="( English )"
              id="about_en"
              name="about_en"
              value={formData.about_en}
              label={t("auth.companyDec")}
              placeholder={t("auth.enterDescription")}
              onChange={(e) => handleChange(e, setFormData)}
            />
          </div>

          <div className="question p-0 pt-2">
            <label htmlFor="wantChangePassword" className="quest">
              {t("auth.doYouWantChangePassword")}
            </label>
            <Form.Switch
              id="wantChangePassword"
              name="wantChangePassword"
              checked={showPasswordModal}
              onChange={() => setShowPasswordModal(!showPasswordModal)}
            />
          </div>

          <SubmitButton name={t("save")} loading={loading} />
        </form>
      </div>

      <ChangePasswordModal
        showModal={showPasswordModal}
        setShowModal={setShowPasswordModal}
      />

      <ChangeCountryModal
        country_id={formData.country_id}
        countries={countries}
        showModal={showCountryModal}
        setShowModal={setShowCountryModal}
        setGeneralFormData={setFormData}
      />

      <ChangePhoneModal
        country_code={formData.country_code}
        phone={formData.phone}
        showModal={showPhoneModal}
        setShowModal={setShowPhoneModal}
      />
    </div>
  );
}
