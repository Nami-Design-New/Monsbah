import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

export default function AuthModal({ show, setShow, type }) {
  const [formType, setFormType] = useState("login");

  useEffect(() => {
    setFormType(type);
  }, [type]);

  return (
    <Modal
      centered
      show={show}
      className="authModal"
      backdrop="static"
      size="xl"
      onHide={() => setShow(false)}
    >
      <Modal.Body>
        <button className="closeModal" onClick={() => setShow(false)}>
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
