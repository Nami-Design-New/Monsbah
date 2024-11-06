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
          <Link
            aria-label="Apple App"
            to="https://apps.apple.com/eg/app/%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A9/id1589937521"
            target="_blank"
          >
            <img src="/images/icons/appStore.svg" alt="" />
          </Link>
          <Link
            aria-label="Andorid App"
            to="https://play.google.com/store/apps/details?id=com.app.monasba&pcampaignid=web_share"
            target="_blank"
          >
            <img src="/images/icons/playStore.svg" alt="" />
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
