import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetChat from "../../hooks/chat/useGetChat";
import ChatContainer from "./ChatContainer";
import ChatForm from "./ChatForm";
import ChatRoomHeader from "./ChatRoomHeader";
import Pusher from "pusher-js";
import PageLoader from "../../ui/loaders/PageLoader";
import lottieChat from "../../assets/lotties/chat.json";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: lottieChat,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function ChatRoom() {
  const { data: chat, isLoading } = useGetChat();
  const { client } = useSelector((state) => state.clientData);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(chat?.message?.reverse());
  }, [chat?.message]);

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: "eu",
    });

    const channel = pusher.subscribe(`chat_${chat?.id}`);

    channel.bind("new_message", function (data) {
      pushMessage(data?.message);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat?.id]);

  function pushMessage(message) {
    if (message?.sender_id === client?.id) {
      return;
    }
    setMessages((prevMessages) => {
      return [...prevMessages, message];
    });
  }

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {chat ? (
            <div className="chat_room">
              <ChatRoomHeader chat={chat?.chat} />
              <ChatContainer messages={messages} />
              <ChatForm chat={chat?.chat} setMessages={setMessages} />
            </div>
          ) : (
            <div className="lottie_player_holder">
              <Lottie options={defaultOptions} height={250} width={250} />
            </div>
          )}
        </>
      )}
    </>
  );
}
