import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function GetApp({ show, setShow }) {
  const { t } = useTranslation();
  return (
    <Modal
      centered
      show={show}
      onHide={() => setShow(false)}
      className="getAppModal"
    >
      <Modal.Body>
        <h4 className="modalTitle">
          {t("getApp.title")} <span> {t("appName")} </span>
        </h4>
        <h6 className="subtitle"> {t("getApp.subtitle")} </h6>
        <img className="qrcode" src="/images/icons/qr.svg" alt="" />
        <div className="btns">
          <Link to="" target="_blank">
            <img src="/images/icons/appStore.svg" alt="" />
          </Link>
          <Link target="_blank">
            <img src="/images/icons/playStore.svg" alt="" />
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
