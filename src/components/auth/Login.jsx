import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helpers";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setClientData } from "../../redux/slices/clientData";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import PhoneInput from "../../ui/form-elements/PhoneInput";
import axiosInstance from "../../utils/axiosInstance";
import useGetCurrentLocation from "../../hooks/settings/useGetCurrentLocation";

function Login({
  setFormType,
  setShow,
  setRegisterFormData,
  userState,
  setUserState,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, setCookie] = useCookies(["token", "id"]);
  const { data } = useGetCurrentLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    country_code: "965",
    fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        country_code: data?.country_code,
      }));
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/${userState === "company" ? "company" : "client"}/auth/login`,
        {
          phone: formData.country_code + formData.phone,
          password: formData.password,
          country_code: formData.country_code,
          fcm_token: formData.fcm_token,
        }
      );
      if (res.status === 200) {
        dispatch(setClientData(res.data?.data.client_data));

        setCookie("token", res.data?.data.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        setCookie("id", res.data?.data.client_data.id, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });

        toast.success(res.data?.message);
        queryClient.invalidateQueries();
        navigate(userState === "client" ? "/profile" : "company-profile");
        setShow(false);
        localStorage.setItem("userType", userState);
      }
    } catch (error) {
      if (error.response.status == 403) {
        setFormType("registerOtp");
        setRegisterFormData((prev) => ({
          ...prev,
          country_code: formData.country_code,
          phone: formData.phone,
        }));
      } else {
        toast.error(error.response.data.message);
      }
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="head">
          {t("auth.loginTitle")}{" "}
          <img src="/images/icons/waving-hand.svg" alt="hand-wave" />
        </h2>
        <p className="sub-head">{t("auth.loginSubtitle")}</p>
      </div>
      <div className="input-field mb-4">
        <div className="radios">
          <label htmlFor="client">
            <input
              type="radio"
              name="userState"
              id="client"
              value="client"
              checked={userState === "client"}
              onChange={(e) => setUserState(e.target.value)}
            />
            <span>{t("auth.client")}</span>
          </label>
          <label htmlFor="company">
            <input
              type="radio"
              name="userState"
              id="company"
              value="company"
              checked={userState === "company"}
              onChange={(e) => setUserState(e.target.value)}
            />
            <span>{t("auth.company")}</span>
          </label>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
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
        <span
          className="forgetpass"
          style={{ cursor: "pointer" }}
          onClick={() => setFormType("forget")}
        >
          {t("auth.forgetPassword")}
        </span>
        <SubmitButton name={t("auth.login")} loading={loading} />
        <span className="noAccount text-center">
          {t("auth.noAccount")}{" "}
          <button
            className="btn-register mt-2"
            type="button"
            onClick={() => setFormType("register-type")}
          >
            {t("auth.register")}
          </button>
        </span>
      </form>
    </>
  );
}
export default Login;
