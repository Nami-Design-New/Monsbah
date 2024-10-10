import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import useAuth from "../../hooks/useAuth";

export default function AuthModal({ show, setShow, type, protectedFlag }) {
  const [formType, setFormType] = useState("login");
  const { isAuthed } = useAuth();

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
              <Login setFormType={setFormType} setShow={setShow} />
            )}
            {formType === "register" && (
              <Register setFormType={setFormType} setShow={setShow} />
            )}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
