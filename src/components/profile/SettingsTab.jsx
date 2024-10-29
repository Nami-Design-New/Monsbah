import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { extractPhoneFromCode, handleChange } from "../../utils/helpers";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import PhoneInput from "../../ui/form-elements/PhoneInput";
import SelectField from "../../ui/form-elements/SelectField";
import InputField from "../../ui/form-elements/InputField";
import useGetCountries from "../../hooks/settings/useGetCountries";
import useGetCities from "../../hooks/settings/useGetCities";
import useGetStates from "../../hooks/settings/useGetStates";
import ChangePasswordModal from "../../ui/modals/ChangePasswordModal";
import { Form } from "react-bootstrap";
import ChangeCountryModal from "../../ui/modals/ChangeCountryModal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import ImageUpload from "../../ui/form-elements/ImageUpload";
import ChangePhoneModal from "../../ui/modals/ChangePhoneModal";
import TextField from "../../ui/form-elements/TextField";

function SettingsTab() {
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
    phone: "",
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
      image: user?.image || "",
      cover: user?.cover || "",
      name: user?.name || "",
      username: user?.username || "",
      country_code: user?.country?.country_code.toString() || "965",
      phone:
        extractPhoneFromCode(user?.phone, user?.country?.country_code) || "",
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
        `/client/auth/profile/update`,
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
    <>
      <form
        className="form col-12 p-1 w-100 p-md-3 reverse-form"
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
            label={
              <>
                {t("auth.userName")}
                <span style={{ color: "red", fontSize: "20px" }}> *</span>
              </>
            }
            placeholder={t("auth.userNamePlaceHolder")}
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) => handleChangeUserName(e, setFormData)}
          />

          <InputField
            required
            label={
              <>
                {t("auth.fullName")}
                <span style={{ color: "red", fontSize: "20px" }}> *</span>
              </>
            }
            placeholder={t("auth.fullName")}
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>

        <div className="form_group">
          <SelectField
            label={
              <>
                {t("auth.country")}
                <span style={{ color: "red", fontSize: "20px" }}> *</span>
              </>
            }
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
            disabled={true}
          />
          <SelectField
            label={t("auth.city")}
            loading={citiesLoading}
            loadingText={t("isLoading")}
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
            label={t("auth.area")}
            loading={areasLoading}
            loadingText={t("isLoading")}
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
          <InputField
            required
            label={
              <>
                {t("auth.email")}
                <span style={{ color: "red", fontSize: "20px" }}> *</span>
              </>
            }
            placeholder={t("auth.email")}
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e, setFormData)}
          />
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
            disabled={true}
            disableSelect={true}
            required
            type="number"
            id="phone"
            name="phone"
            placeholder={t("auth.phone")}
            value={formData.phone}
            countryCode={formData.country_code}
            onChange={(e) => handleChange(e, setFormData)}
            onSelect={(code, setShow) => {
              setFormData((prev) => ({ ...prev, country_code: code }));
              setShow(false);
            }}
          />
        </div>
        <div className="form_group">
          <TextField
            required
            label={t("profile.aboutMe")}
            placeholder={t("writeHere")}
            name="about_ar"
            id="about_ar"
            value={formData?.about_ar}
            onChange={(e) => {
              setFormData({
                ...formData,
                about_ar: e.target.value,
                about_en: e.target.value,
              });
            }}
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
    </>
  );
}

export default SettingsTab;
