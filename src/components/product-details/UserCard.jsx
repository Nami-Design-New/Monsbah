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
        `/${localStorage.getItem("userType")}/${
          product?.user?.is_follow ? "delete" : "store"
        }-follower`,
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
    <div className="mulen_user">
      <div className="mulen_user_info">
        <Link
          aria-label="Profile"
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
            alt="user"
          />
          {product?.user?.id !== client?.id && (
            <Link
              aria-label="Toggle following"
              className="follow_btn"
              onClick={handleFollow}
            >
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
            aria-label="Profile"
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
          {product?.active_call === "active" && (
            <Link
              aria-label="Call"
              target="_blank"
              to={`tel:${product?.phone}`}
              className="call"
            >
              <span> {t("calling")} </span>
            </Link>
          )}

          {product?.active_chat === "active" && (
            <Link aria-label="Chat" to={`/chats?user_id=${product?.user?.id}`}>
              <img
                src="/images/icons/chat.svg"
                alt="chat"
                style={{ width: "24px", height: "32px" }}
              />
              {product?.active_call === "inactive" && (
                <span> {t("chating")} </span>
              )}
            </Link>
          )}

          {product?.active_whatsapp === "active" && (
            <Link
              aria-label="Whatsapp"
              target="_blank"
              to={`https://wa.me/${product?.user?.phone}?text=${encodedWhatsappMessage}`}
            >
              <img src="/images/icons/whats.svg" alt="whatsapp" />
              {product?.active_call === "inactive" && (
                <span> {t("whatsapp")} </span>
              )}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default UserCard;
