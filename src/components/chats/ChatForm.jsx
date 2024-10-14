import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReactMediaRecorder } from "react-media-recorder";
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axiosInstance from "../../utils/axiosInstance";

function ChatForm({ chat, setMessages }) {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY;

  const formRef = useRef(null);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [messageContent, setMessageContent] = useState({
    message: "",
    type: "",
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("type", messageContent.type);

    if (chat?.id) {
      payload.append("chat_id", chat?.id);
    }

    if (messageContent.type === "voice") {
      try {
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();
        const file = new File([blob], "voice_message.wav", {
          type: "audio/wav",
        });
        payload.append("voice", file);
      } catch (error) {
        console.error("Error converting blob URL to file:", error);
        return;
      }
    }

    if (messageContent.message) {
      payload.append("message", messageContent.message);
    }

    if (messageContent.type === "image") {
      payload.append("images", messageContent.image);
    }

    if (messageContent.type === "file") {
      payload.append("file", messageContent.file);
    }

    if (messageContent.type === "location") {
      payload.append("lat", messageContent.lat);
      payload.append("lng", messageContent.lng);
    }

    try {
      const res = await axiosInstance.post("/client/chat/send", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        setMessages((prev) => [...prev, res.data.data]);
        setMessageContent({ message: "", type: "" });
        setRecordingTime(0);
        clearBlobUrl();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartRecording = () => {
    startTimer();
    startRecording();
    setRecordingTime(0);
    setMessageContent({ ...messageContent, type: "voice" });
  };

  const handleStopRecording = () => {
    stopRecording();
    stopTimer();
  };

  const startTimer = () => {
    setTimerInterval(
      setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const formatRecordingTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleSelectLocation = () => {
    document.querySelector(".dropdown-menu").classList.remove("show");
    navigator.geolocation.getCurrentPosition((position) => {
      setMessageContent({
        type: "location",
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return (
    <form className="chat_form" onSubmit={handleSendMessage} ref={formRef}>
      {(messageContent?.image ||
        messageContent.file ||
        messageContent?.type === "location") && (
        <div className="priview_img">
          <button
            disabled={loading}
            onClick={() => {
              setMessageContent({
                ...messageContent,
                image: "",
                file: "",
                lat: "",
                lng: "",
                type: "",
              });
              formRef.current.reset();
            }}
          >
            <i className="fa-regular fa-xmark"></i>
          </button>
          {messageContent.file && (
            <video src={URL.createObjectURL(messageContent.file)} controls />
          )}
          {messageContent.image && (
            <img
              src={URL.createObjectURL(messageContent.image)}
              alt="preview"
            />
          )}
          {messageContent.type === "location" &&
            messageContent?.lat &&
            messageContent?.lng && (
              <LoadScript googleMapsApiKey={GOOGLE_KEY}>
                <GoogleMap
                  options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    disableDefaultUI: true,
                    clickableIcons: false,
                  }}
                  zoom={15}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={{
                    lat: messageContent?.lat,
                    lng: messageContent?.lng,
                  }}
                >
                  {messageContent?.lat && messageContent?.lng && (
                    <Marker
                      icon="/images/icons/map-pin.svg"
                      position={{
                        lat: messageContent?.lat,
                        lng: messageContent?.lng,
                      }}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
            )}
        </div>
      )}
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
            value={messageContent.message}
            placeholder={t("typeHere")}
            onChange={(e) =>
              setMessageContent({
                ...messageContent,
                message: e.target.value,
                type: "text",
              })
            }
          />
        )}
        {status !== "recording" && (
          <span className="record_btn" onClick={handleStartRecording}>
            <img src="/images/icons/record.svg" alt="record" />
          </span>
        )}
        {status === "recording" && (
          <span className="record_btn" onClick={handleStopRecording}>
            <img src="/images/icons/stop.svg" alt="stop" />
          </span>
        )}
        {status === "recording" && (
          <span className="recording_timer">
            {formatRecordingTime(recordingTime)}
          </span>
        )}
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="link">
            <img src="/images/icons/paperclip.svg" alt="" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="content">
              <label htmlFor="video">
                <input
                  type="file"
                  name="video"
                  id="video"
                  accept="video/*"
                  onChange={(e) => {
                    setMessageContent({
                      ...messageContent,
                      type: "file",
                      file: e.target.files[0],
                    });
                    document
                      .querySelector(".dropdown-menu")
                      .classList.remove("show");
                  }}
                />
                <span>
                  <i className="fa-solid fa-video"></i> {t("sendVideo")}
                </span>
              </label>

              <label htmlFor="image">
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={(e) => {
                    setMessageContent({
                      ...messageContent,
                      type: "image",
                      image: e.target.files[0],
                    });
                    document
                      .querySelector(".dropdown-menu")
                      .classList.remove("show");
                  }}
                />
                <span>
                  <i className="fa-solid fa-image"></i> {t("sendImage")}
                </span>
              </label>

              <label htmlFor="location" onClick={handleSelectLocation}>
                <span>
                  <i className="fa-solid fa-location-dot"></i>{" "}
                  {t("sendLocation")}
                </span>
              </label>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <button type="submit" style={{ opacity: loading ? 0.7 : 1, zIndex: 2 }}>
        {loading ? (
          <i className="fa-solid fa-spinner fa-pulse fa-spin"></i>
        ) : (
          <i className="fa-solid fa-paper-plane-top"></i>
        )}
      </button>
    </form>
  );
}

export default ChatForm;
