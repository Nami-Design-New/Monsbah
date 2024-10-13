import { useTranslation } from "react-i18next";
import { useReactMediaRecorder } from "react-media-recorder";

function ChatForm() {
  const { t } = useTranslation();

  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });

  return (
    <form className="chat_form">
      <div className="input_field">
        {mediaBlobUrl ? (
          <div className="audio_player">
            <audio src={mediaBlobUrl} controls />
            <button onClick={clearBlobUrl}>
              <i className="fa-regular fa-xmark"></i>
            </button>
          </div>
        ) : (
          <input
            type="text"
            className="text_input"
            placeholder={t("typeHere")}
          />
        )}
        {status !== "recording" && (
          <span className="record_btn" onClick={startRecording}>
            <img src="/images/icons/record.svg" alt="record" />
          </span>
        )}
        {status === "recording" && (
          <span className="record_btn" onClick={stopRecording}>
            <img src="/images/icons/stop.svg" alt="record" />
          </span>
        )}
      </div>
      <button type="submit">
        <i className="fa-solid fa-paper-plane-top"></i>
      </button>
    </form>
  );
}

export default ChatForm;
