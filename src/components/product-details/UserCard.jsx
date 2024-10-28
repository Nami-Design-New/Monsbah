import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

function UserCard({ product, setProduct }) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { client } = useSelector((state) => state.clientData);

  const whatsappMessage = `${t("whatsappMessage")} ${product?.name} ${t(
    "onMonsbah"
  )}`;

  const encodedWhatsappMessage = encodeURIComponent(whatsappMessage);

  const handleFollow = async () => {
    setProduct((prev) => ({
      ...prev,
      user: {
        ...prev?.user,
        is_follow: prev?.user?.is_follow === 1 ? 0 : 1,
        ["followers-count"]: prev?.user?.["followers-count"] + 1,
      },
    }));
    try {
      const res = await axiosInstance.post(
        `/client/${product?.user?.is_follow ? "delete" : "store"}-follower`,
        {
          profile_id: product?.user?.id,
        }
      );
      if (res.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["product"],
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    }
  };

  return (
    <div className="advertiserDetails">
      <div className="advertiser">
        <Link
          to={`${
            +product?.user?.id === +client?.id
              ? "/profile"
              : `/profile/${product?.user?.id}`
          }`}
          className="image_wrapper"
        >
          <img
            src={product?.user?.image}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
            loading="lazy"
            alt=""
          />
          {product?.user?.id !== client?.id && (
            <Link className="follow_btn" onClick={handleFollow}>
              <i
                className={`fa-light fa-${
                  product?.user?.is_follow ? "check" : "plus"
                }`}
              ></i>
            </Link>
          )}
        </Link>
        <div className="content">
          <Link
            to={`${
              +product?.user?.id === +client?.id
                ? "/profile"
                : `/profile/${product?.user?.id}`
            }`}
          >
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
          </ul>
        </div>
      </div>
      {product?.user?.id !== client?.id && (
        <div className="contact">
          {product?.active_chat && (
            <Link to={`/chats?user_id=${product?.user?.id}`}>
              <img src="/images/icons/chat.svg" alt="chat" />
              <span> {t("chating")} </span>
            </Link>
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
      )}
    </div>
  );
}

export default UserCard;
