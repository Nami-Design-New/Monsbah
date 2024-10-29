import { useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function ShareBox() {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);

  const currentPageLink = window.location.href;

  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentPageLink}`,
    instagram: `https://www.instagram.com/?url=${currentPageLink}`,
    twitter: `https://twitter.com/intent/tweet?url=${currentPageLink}`,
    snapchat: `https://www.snapchat.com/share?url=${currentPageLink}`,
    whatsapp: `https://wa.me/?text=${currentPageLink}`,
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.content}
    </Tooltip>
  );

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentPageLink);
    setShowTooltip(true);
  };

  return (
    <Dropdown className="share-dropdown">
      <Dropdown.Toggle className="butn" id="dropdown-basic">
        <i className="fa-regular fa-share-nodes"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <h5>{t("services.share")}</h5>
        <ul className="social">
          <li>
            <a
              href={socialShareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            {t("services.facebook")}
          </li>
          <li>
            <a
              href={socialShareLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            {t("services.instagram")}
          </li>
          <li>
            <a
              href={socialShareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            {t("services.twitter")}
          </li>
          <li>
            <a
              href={socialShareLinks.snapchat}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-snapchat"></i>
            </a>
            {t("services.snapchat")}
          </li>
          <li>
            <a
              href={socialShareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            {t("services.whatsapp")}
          </li>
        </ul>

        <div className="link mt-4">
          <button onClick={handleCopy}>
            <i className="fa-sharp fa-regular fa-copy"></i>
          </button>
          <span onClick={handleCopy} id="url">
            <OverlayTrigger
              placement="bottom"
              show={showTooltip}
              overlay={renderTooltip({
                content: t("services.linkCopied"),
              })}
            >
              <span>{currentPageLink}</span>
            </OverlayTrigger>
          </span>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ShareBox;
