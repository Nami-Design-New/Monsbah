import ChatRoom from "../components/chats/ChatRoom";
import SideBar from "../components/chats/SideBar";

function Chats() {
  return (
    <section className="chats-section">
      <div className="container h-100">
        <div className="row m-0 h-100">
          <div className="col-lg-4 col-12 p-2 h-100">
            <SideBar />
          </div>
          <div className="col-lg-8 col-12 p-2 h-100">
            <ChatRoom />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chats;
