import { useState } from "react";
import { useTranslation } from "react-i18next";
import ChatRoom from "../components/chats/ChatRoom";
import SideBar from "../components/chats/SideBar";

import useGetChats from "../hooks/chat/useGetChats";

function Chats() {
  const { t } = useTranslation();
  const { data: chats } = useGetChats();

  console.log(chats);

  const [showChats, setShowChats] = useState(false);
  return (
    <section className="chats-section">
      <div className="container h-100 p-0">
        <div className="row m-0 h-100 d-flex align-items-center justify-content-center">
          {chats?.length > 0 && (
            <>
              <div
                className={`col-lg-4 col-12 p-2 h-100 sidebar_col ${
                  showChats ? "active" : ""
                }`}
              >
                <SideBar setShowChats={setShowChats} />
              </div>

              <div className="col-12 p-2 d-lg-none d-block">
                <button
                  className="open_chats"
                  onClick={() => setShowChats(!showChats)}
                >
                  <i className="fa-regular fa-message"></i>
                  {t("chats")}
                </button>
              </div>
            </>
          )}

          <div className="col-lg-8 col-12 p-2 h-100">
            <ChatRoom />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chats;
