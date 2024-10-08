import useGetChats from "../hooks/chat/useGetChats";

function Chats() {
  const { data: chats, isLoading } = useGetChats();
  return (
    <section className="chats-section">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-4 col-12 p-2">
            <aside>
              <div className="chat_card">
                <div className="img">
                  <img src="/images/icons/ava.jpg" alt="ava" />
                </div>
                <div className="content">
                  <h6>Name</h6>
                  <p>Message</p>
                  <p>Time</p>
                </div>
              </div>
            </aside>
          </div>
          <div className="col-lg-8 col-12 p-2"></div>
        </div>
      </div>
    </section>
  );
}

export default Chats;
