import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

function RateCard({ rate, userId, className }) {
  const { t } = useTranslation();
  const authedUser = useSelector((state) => state.clientData.client);

  const queryClient = useQueryClient();

  const deleteRate = async (id) => {
    try {
      const res = await axiosInstance.post("/client/delete-rate", {
        id: id,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["rates", userId] });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    }
  };

  return (
    <div className="CommentWrapper">
      <div className={`CommentCard ${className}`}>
        <Link to={`/profile/${rate?.user_id}`} className="img">
          <img
            src={rate?.user_image}
            alt={rate?.user_name}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
          />
        </Link>
        <div className="content">
          <h6>{rate?.user_name}</h6>
          <div className="comment">
            <p>{rate?.comment}</p>
          </div>
          <div className="actions">
            <span>{rate?.date}</span>

            {rate?.user_id === authedUser?.id && (
              <button onClick={() => deleteRate(rate?.id)}>
                {t("delete")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RateCard;
