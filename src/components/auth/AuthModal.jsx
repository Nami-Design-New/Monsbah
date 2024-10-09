import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import { useSearchParams } from "react-router-dom";

export default function AuthModal({ show, setShow, type }) {
  const [formType, setFormType] = useState("login");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setFormType(type);
  }, [type]);

  const handleClose = () => {
    setShow(false);

    if (searchParams.get("redirect") === "true") {
      const updatedSearchParams = new URLSearchParams(searchParams);
      updatedSearchParams.delete("redirect");
      setSearchParams(updatedSearchParams);
    }
  };

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
