import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function PersonCard({ person }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleFollow = async (type) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        type === "follow"
          ? "/client/store-follower"
          : "/client/delete-follower",
        {
          profile_id: person?.id,
        }
      );
      if (res.status === 200) {
        setLoading(false);
        queryClient.invalidateQueries({
          queryKey: ["persons"],
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PersonCard">
      <Link to={`/profile/${person?.id}`} className="img_info">
        <div className="img">
          <img
            src={person?.image}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
            alt="person"
          />
        </div>
        <div className="info">
          <h4>{person?.name}</h4>
          <p>{person?.city?.name}</p>
        </div>
      </Link>
      {person?.is_follow ? (
        <button
          className="follow_btn"
          onClick={() => handleFollow("unfollow")}
          disabled={loading}
        >
          <i className="fa-light fa-user-minus"></i>{" "}
          <span>{t("unfollow")}</span>
        </button>
      ) : (
        <button
          className="follow_btn"
          onClick={() => handleFollow("follow")}
          disabled={loading}
        >
          <i className="fa-regular fa-user-plus"></i> <span>{t("follow")}</span>
        </button>
      )}
    </div>
  );
}

export default PersonCard;
