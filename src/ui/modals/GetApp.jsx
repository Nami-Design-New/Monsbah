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
            to="https://apps.apple.com/kw/app/%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A9/id1589937521?l=ar"
            target="_blank"
          >
            <img src="/images/icons/appStore.svg" alt="" />
          </Link>
          <Link
            target="_blank"
            to="https://play.google.com/store/apps/details?id=com.app.monasba&pcampaignid=web_share"
          >
            <img src="/images/icons/playStore.svg" alt="" />
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
