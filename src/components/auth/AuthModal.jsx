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
        <button className="closeModal" onClick={handleClose}>
          <i className="fa-regular fa-x"></i>
        </button>
        <section className="auth_section">
          <div className="img_wrapper">
            <img
              loading="lazy"
              className="bg-img"
              alt="auth-banner"
              src="/images/auth-benner.png"
            />
          </div>
          <div className="form_wrapper">
            {formType === "login" && (
              <Login
                setFormType={setFormType}
                setShow={setShow}
                setRegisterFormData={setRegisterFormData}
              />
            )}

            {formType === "register" && (
              <Register
                setFormType={setFormType}
                setShow={setShow}
                formData={registerFormData}
                setFormData={setRegisterFormData}
              />
            )}

            {formType === "registerOtp" && (
              <RegisterOTPConfirm
                setFormType={setFormType}
                setShow={setShow}
                formData={registerFormData}
                setFormData={setRegisterFormData}
              />
            )}

            {formType === "forget" && (
              <ForgetPassword
                setFormType={setFormType}
                setShow={setShow}
                setOtpCode={setOtpCode}
                formData={forgetFormData}
                setFormData={setForgetFormData}
              />
            )}

            {formType === "otp" && (
              <OTPConfirm
                setFormType={setFormType}
                setShow={setShow}
                otpCode={otpCode}
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
