import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function PersonCard({ person, setPersons }) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const client = useSelector((state) => state.clientData.client);

  const handleFollow = async (type) => {
    setPersons((prevPersons) => {
      return prevPersons.map((p) => {
        if (p.id === person.id) {
          return { ...p, is_follow: type === "follow" ? 1 : 0 };
        }
        return p;
      });
    });

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
        queryClient.invalidateQueries({
          queryKey: ["persons"],
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    }
  };

  return (
    <div className="PersonCard">
      <Link
        to={`${
          +person?.id === +client?.id ? "/profile" : `/profile/${person?.id}`
        }`}
        className="img_info"
      >
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
        <button className="follow_btn" onClick={() => handleFollow("unfollow")}>
          <i className="fa-light fa-user-minus"></i>{" "}
          <span>{t("unfollow")}</span>
        </button>
      ) : (
        <button className="follow_btn" onClick={() => handleFollow("follow")}>
          <i className="fa-regular fa-user-plus"></i> <span>{t("follow")}</span>
        </button>
      )}
    </div>
  );
}

export default PersonCard;
