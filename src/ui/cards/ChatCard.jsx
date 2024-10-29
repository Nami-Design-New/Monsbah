import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export default function ChatCard({
  chat,
  checkedState,
  selectedChats,
  setSelectedChats,
  setShowChats,
}) {
  const { t } = useTranslation();
  const [lastMessage, setLastMessage] = useState();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (chat?.lastMessageType === "contact") {
      setLastMessage(t("chat.contact"));
    } else if (chat?.lastMessageType === "voice") {
      setLastMessage(t("chat.voice"));
    } else if (chat?.lastMessageType === "image") {
      setLastMessage(t("chat.image"));
    } else if (chat?.lastMessageType === "video") {
      setLastMessage(t("chat.video"));
    } else if (chat?.lastMessageType === "location") {
      setLastMessage(t("chat.location"));
    } else {
      setLastMessage(chat?.lastMessage);
    }
  }, [chat, t]);

  const handleOpenChat = () => {
    if (!checkedState) {
      setSearchParams({ user_id: chat?.user_id, product_id: chat?.product_id });
      setShowChats(false);
    }
  };

  return (
    <div className="chat_card" onClick={handleOpenChat}>
      {checkedState && (
        <Form.Check
          className="select-chat"
          type="checkbox"
          checked={selectedChats.includes(chat?.id)}
          onChange={() =>
            setSelectedChats(
              selectedChats.includes(chat?.id)
                ? selectedChats.filter((id) => id !== chat?.id)
                : [...selectedChats, chat?.id]
            )
          }
        />
      )}
      <div className="img">
        <img
          src={chat?.user_image}
          loading="lazy"
          onError={(e) => (e.target.src = "/images/icons/user_default.png")}
          alt={chat?.user_name}
        />
        <span className={chat?.is_active === 0 ? "status" : " status online"} />
      </div>
      <div className="content">
        <h6>{chat?.user_name}</h6>
        <p>{lastMessage}</p>
        <span className={chat?.is_active === 0 ? "" : "online"}>
          {chat?.is_active === 0 ? t("chat.offline") : t("chat.online")}
        </span>
      </div>
    </div>
  );
}
