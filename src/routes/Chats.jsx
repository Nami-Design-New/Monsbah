import { useState } from "react";
import ChatRoom from "../components/chats/ChatRoom";
import SideBar from "../components/chats/SideBar";

import useGetChats from "../hooks/chat/useGetChats";
import PageLoader from "../ui/loaders/PageLoader";

function Chats() {
  const { data: chats, isLoading } = useGetChats();
  const [showChats, setShowChats] = useState(false);

  return isLoading ? (
    <PageLoader />
  ) : (
    <section className="chats-section">
      <div className="container h-100 p-0 ">
        <div className="row m-0 h-100">
          {chats?.length > 0 && (
            <>
              <div
                className={`chatssidebar col-lg-4 col-12 p-2 h-100 sidebar_col ${
                  showChats ? "active" : ""
                }`}
              >
                <SideBar setShowChats={setShowChats} />
              </div>
            </>
          )}

          <div className="chat-room-wrapper col-lg-8 col-12 p-2 h-100 ">
            <ChatRoom />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chats;
