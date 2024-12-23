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

export default function AuthModal({ show, setShow, type, protectedFlag }) {
  const [formType, setFormType] = useState("login");
  const { isAuthed } = useAuth();
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

  const [otpCode, setOtpCode] = useState("");

  const navigate = useNavigate();

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
              src="/images/auth-benner.webp"
            />
          </div>

          <div className={`form_wrapper ${formType}`}>
            {formType === "login" && (
              <Login
                setFormType={setFormType}
                setShow={setShow}
                setRegisterFormData={setRegisterFormData}
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
                formData={registerFormData}
                setFormData={setRegisterFormData}
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

            {/* forget password process */}

            {formType === "forget" && (
              <ForgetPassword
                setShow={setShow}
                setFormType={setFormType}
                setOtpCode={setOtpCode}
                formData={forgetFormData}
                setFormData={setForgetFormData}
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
