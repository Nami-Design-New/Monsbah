import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import useAuth from "../../hooks/useAuth";
import ResetPassword from "./ResetPassword";
import OTPConfirm from "./OTPConfirm";
import ForgetPassword from "./ForgetPassword";
import RegisterOTPConfirm from "./RegisterOTPConfirm";
import ChooseRegisterType from "./ChooseRegisterType";
import RegisterCompany from "./RegisterCompany";
import CompanyOTPConfirm from "./CompanyOTPConfirm";

export default function AuthModal({ show, setShow, type, protectedFlag }) {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
  const [userState, setUserState] = useState("client");
  const [formType, setFormType] = useState("companyOtp");
  const [otpCode, setOtpCode] = useState("");
  const [forgetFormData, setForgetFormData] = useState({
    phone: "",
    country_code: "965",
  });
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    username: "",
    country_code: "965",
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
    about_en: "",
    about_ar: "",
    country_id: "",
    category_id: "",
    whats_number: "",
    country_code: "965",
    whats_country_code: "965",
    password_confirmation: "",
    fcm_token: "eyJ0eXAiOiJKV1QiLCJhbGciOi",
  });

  useEffect(() => {
    setFormType(type);
  }, [type]);

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
      country_code: "965",
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
      country_code: "965",
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
              <ChooseRegisterType setFormType={setFormType} />
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
              />
            )}

            {formType === "reset" && (
              <ResetPassword setFormType={setFormType} setShow={setShow} />
            )}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
