import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function UserCard({ product }) {
  const { t } = useTranslation();

  const whatsappMessage = `${t("whatsappMessage")} ${product?.name} ${t(
    "onMonsbah"
  )}`;

  const encodedWhatsappMessage = encodeURIComponent(whatsappMessage);

  return (
    <div className="advertiserDetails">
      <div className="advertiser">
        <Link to={`/profile/${product?.user?.id}`} className="image_wrapper">
          <img src={product?.user?.image} loading="lazy" alt="" />
          <button className="follow_btn">
            <i className="fa-light fa-plus"></i>
          </button>
        </Link>
        <div className="content">
          <Link to={`/profile/${product?.user?.id}`}>
            <h3 className="name"> {product?.user?.name}</h3>
          </Link>
          <ul>
            <li>
              <h6>{product?.user?.["ads-count"]}</h6>
              <span>{t("posts")}</span>
            </li>
            <li>
              <h6>{product?.user?.["followers-count"]}</h6>
              <span>{t("followers")}</span>
            </li>
            <li>
              <h6>{product?.user?.["following-count"]}</h6>
              <span>{t("following")}</span>
            </li>
            <li>
              <h6>{product?.user?.["rate-count"]}</h6>
              <span>{t("rate")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="contact">
        {product?.active_chat && (
          <button>
            <img src="/images/icons/chat.svg" alt="chat" />
            <span> {t("chating")} </span>
          </button>
        )}

        {product?.active_call && (
          <Link
            target="_blank"
            to={`tel:${product?.user?.phone}`}
            className="call"
          >
            <img src="/images/icons/phone.svg" alt="call" />
            <span> {t("calling")} </span>
          </Link>
        )}

        {product?.active_whatsapp && (
          <Link
            target="_blank"
            to={`https://wa.me/${product?.user?.phone}?text=${encodedWhatsappMessage}`}
          >
            <img src="/images/icons/whatsapp.svg" alt="whatsapp" />
            <span> {t("whatsapp")} </span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default UserCard;