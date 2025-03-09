import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useGetCurrentLocation from "../../hooks/settings/useGetCurrentLocation";
import useAuth from "../../hooks/useAuth";
import ChooseRegisterType from "./ChooseRegisterType";
import CompanyOTPConfirm from "./CompanyOTPConfirm";
import ForgetPassword from "./ForgetPassword";
import Login from "./Login";
import OTPConfirm from "./OTPConfirm";
import Register from "./Register";
import RegisterCompany from "./RegisterCompany";
import RegisterOTPConfirm from "./RegisterOTPConfirm";
import ResetPassword from "./ResetPassword";

export default function AuthModal({ show, setShow, protectedFlag }) {
  const navigate = useNavigate();
  const { isAuthed } = useAuth();
  const { data } = useGetCurrentLocation();

  const [userState, setUserState] = useState("client");
  const [formType, setFormType] = useState("login");
  const [otpCode, setOtpCode] = useState("");

  const [forgetFormData, setForgetFormData] = useState({
    phone: "",
    country_code: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    username: "",
    country_code: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    country_id: "",
    city_id: "",
    state_id: "",
    fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
    gender: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    name_ar: "",
    name_en: "",
    phone: "",
    email: "",
    password: "",
    city_id: "",
    state_id: "",
    about_ar: "",
    about_en: "",
    country_id: "",
    category_id: "",
    whats_number: "",
    country_code: "",
    whats_country_code: "",
    password_confirmation: "",
    fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
  });

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        country_code: data?.country_code,
        whats_country_code: data?.country_code,
      }));

      setRegisterFormData((prev) => ({
        ...prev,
        country_code: data?.country_code,
      }));

      setForgetFormData((prev) => ({
        ...prev,
        country_code: data?.country_code,
      }));
    }
  }, [data]);

  const handleClose = () => {
    if (!isAuthed && protectedFlag) {
      navigate("/");
    } else {
      setShow(false);
    }
    setFormType("login");

    setForgetFormData({
      name: "",
      username: "",
      country_code: data?.country_code,
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
      country_id: "",
      city_id: "",
      state_id: "",
      fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
      gender: "",
    });

    setForgetFormData({
      phone: "",
      country_code: data?.country_code,
    });
  };

  return (
    <Modal
      centered
      show={show}
      className="authModal"
      backdrop="static"
      size="xl"
    >
      <Modal.Body>
        <button
          aria-label="Close modal"
          className="closeModal"
          onClick={handleClose}
        >
          <i className="fa-regular fa-x"></i>
        </button>
        <section className="auth_section">
          <div className={`img_wrapper ${formType}`}>
            <img
              loading="lazy"
              className="bg-img"
              alt="auth-banner"
              src="/images/auth-benner.png"
            />
          </div>

          <div className={`form_wrapper ${formType}`}>
            {formType === "login" && (
              <Login
                setFormType={setFormType}
                setShow={setShow}
                setRegisterFormData={setRegisterFormData}
                userState={userState}
                setUserState={setUserState}
              />
            )}

            {/* register process */}
            {formType === "register-type" && (
              <ChooseRegisterType
                setFormType={setFormType}
                setUserState={setUserState}
              />
            )}

            {formType === "register" && (
              <Register
                setShow={setShow}
                setFormType={setFormType}
                formData={registerFormData}
                setFormData={setRegisterFormData}
              />
            )}

            {formType === "register-company" && (
              <RegisterCompany
                setShow={setShow}
                setFormType={setFormType}
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {formType === "registerOtp" && (
              <RegisterOTPConfirm
                setShow={setShow}
                userState={userState}
                setFormType={setFormType}
                formData={registerFormData}
                setFormData={setRegisterFormData}
              />
            )}

            {formType === "companyOtp" && (
              <CompanyOTPConfirm
                setShow={setShow}
                setFormType={setFormType}
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* forget password process */}
            {formType === "forget" && (
              <ForgetPassword
                setShow={setShow}
                setFormType={setFormType}
                setOtpCode={setOtpCode}
                formData={forgetFormData}
                setFormData={setForgetFormData}
                userState={userState}
              />
            )}

            {formType === "otp" && (
              <OTPConfirm
                setShow={setShow}
                otpCode={otpCode}
                setFormType={setFormType}
                formData={forgetFormData}
                userState={userState}
              />
            )}

            {formType === "reset" && (
              <ResetPassword
                setFormType={setFormType}
                setShow={setShow}
                userState={userState}
              />
            )}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
