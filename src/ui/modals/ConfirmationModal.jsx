import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitButton from "../form-elements/SubmitButton";

const ConfirmationModal = ({
  showModal,
  setShowModal,
  text,
  target,
  buttonText,
  eventFun,
  loading,
  type = "delete",
}) => {
  const { t } = useTranslation();
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body
        className={`confirm-delete ${
          type === "delete" || type === "logout" ? "" : "other"
        }`}
      >
        <p>
          {text} <span>{target}</span>
        </p>
        <div className="d-flex justify-content-end gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
            className="cancel-btn"
          >
            {t("cancel")}
          </button>
          <SubmitButton
            className={"delete-btn"}
            name={buttonText}
            event={eventFun}
            loading={loading}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
