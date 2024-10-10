import useGetChat from "../../hooks/chat/useGetChat";
import ChatContainer from "./ChatContainer";
import ChatForm from "./ChatForm";
import ChatRoomHeader from "./ChatRoomHeader";

export default function ChatRoom() {
  const { data: chat } = useGetChat();

  return (
    <div className="chat_room">
      <ChatRoomHeader />
      <ChatContainer />
      <ChatForm />
    </div>
  );
}
