import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import ConfirmationModal from "../../ui/modals/ConfirmationModal";
import ReportChatModal from "../../ui/modals/ReportChatModal";

function ChatRoomHeader({ chat, isBlocked, setIsBlocked }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blockLoading, setBlockLoading] = useState(false);
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

  const handleBlock = async () => {
    setBlockLoading(true);
    try {
      const res = await axiosInstance.post("/client/chat/block", {
        chat_id: +chat?.id,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["chats"] });
        setShowBlockModal(false);
        setIsBlocked(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setBlockLoading(false);
    }
  };

  return (
    <div className="chat_header">
      <div className="user">
        <Link
          aria-label="Profile"
          to={`/profile/${chat?.user_id}`}
          className="img"
        >
          <img
            src={chat?.user_image}
            alt="avatar"
            loading="lazy"
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
          />
        </Link>
        <Link
          aria-label="Profile"
          to={`/profile/${chat?.user_id}`}
          className="content"
        >
          <h6>{chat?.user_name}</h6>
          <span className={chat?.is_active ? "online" : "offline"}>
            {chat?.is_active ? t("chat.online") : t("chat.offline")}
          </span>
        </Link>
      </div>

      <Dropdown>
        <Dropdown.Toggle aria-label="Chat Actions">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="actions_menu">
            <button
              onClick={() => setShowModal(true)}
              aria-label={t("chat.delete")}
            >
              <i className="fa-regular fa-trash"></i> {t("chat.deleteChat")}
            </button>
            <button
              onClick={() => setShowReportModal(true)}
              aria-label={t("chat.report")}
            >
              <i className="fa-regular fa-flag"></i> {t("chat.report")}
            </button>
            {isBlocked ? null : (
              <button
                onClick={() => setShowBlockModal(true)}
                aria-label={t("chat.block")}
              >
                <i className="fa-regular fa-ban"></i> {t("chat.block")}
              </button>
            )}
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
      <ConfirmationModal
        showModal={showBlockModal}
        setShowModal={setShowBlockModal}
        eventFun={handleBlock}
        loading={blockLoading}
        type="delete"
        buttonText={t("chat.block")}
        text={`${t("chat.areYouSureYouWantblockThisChat")} ${chat?.user_name}`}
      />

      <ReportChatModal
        id={chat?.id}
        showModal={showReportModal}
        setShowModal={setShowReportModal}
      />
    </div>
  );
}

export default ChatRoomHeader;
