import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import ConfirmationModal from "../../ui/modals/ConfirmationModal";

function ChatRoomHeader({ chat }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/client/chat/delete", {
        ids: [chat?.id],
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["chats"] });
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat_header">
      <div className="user">
        <Link to="/profile" className="img">
          <img
            src={chat?.user_image || "/images/icons/user_default.png"}
            alt="avatar"
            loading="lazy"
            onLoad={(e) => (e.target.src = "/images/icons/user_default.png")}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
          />
        </Link>
        <div className="content">
          <h6>{chat?.user_name}</h6>
          <span className={chat?.is_active ? "online" : "offline"}>
            {chat?.is_active ? t("chat.online") : t("chat.offline")}
          </span>
        </div>
      </div>

      <Dropdown>
        <Dropdown.Toggle>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="actions_menu">
            <button onClick={() => setShowModal(true)}>
              <i className="fa-regular fa-trash"></i> {t("chat.deleteChat")}
            </button>
            <button>
              <i className="fa-regular fa-flag"></i> {t("chat.report")}
            </button>
            <button>
              <i className="fa-regular fa-ban"></i> {t("chat.block")}
            </button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        eventFun={handleDelete}
        loading={loading}
        type="delete"
        buttonText={t("chat.delete")}
        text={t("chat.areYouSureYouWantDeleteThisChat")}
      />
    </div>
  );
}

export default ChatRoomHeader;
