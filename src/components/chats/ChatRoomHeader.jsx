import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ChatRoomHeader() {
  const { t } = useTranslation();
  return (
    <div className="chat_header">
      <div className="user">
        <Link to="/profile" className="img">
          <img src="/images/icons/ava.jpg" alt="avatar" />
        </Link>
        <div className="content">
          <h6>محمد احمد</h6>
          <span>متصل</span>
        </div>
      </div>

      <Dropdown>
        <Dropdown.Toggle>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="actions_menu">
            <button>
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
    </div>
  );
}

export default ChatRoomHeader;
