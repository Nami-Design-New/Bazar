import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { createMessage } from "../../services/apiChats";
import { formatMessageTime } from "../../utils/helpers";
import {
  IconFileFilled,
  IconMicrophone,
  IconPaperclip,
  IconPlayerPause,
  IconSend,
  IconTrash,
} from "@tabler/icons-react";

const ChatRoom = ({ chat }) => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const chatContainerRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const { user } = useSelector((state) => state.authedUser);

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState({
    from_id: user?.id,
    chat_id: chat?.id,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (chat) {
      setMessages(chat?.messages.slice() || []);
    }
  }, [chat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isRecording) {
      stopRecording();
      setIsRecording(false);
    }

    if (!message?.message) return;

    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          ...message,
          message:
            message.type !== "text"
              ? URL.createObjectURL(message.message)
              : message.message,
          id: Date.now(),
          created_at: Date.now(),
        },
      ];
    });
    formRef.current.reset();
    setMessage({
      from_id: user?.id,
      chat_id: chat?.id,
      message: "",
      type: "",
    });

    try {
      await createMessage(message);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setRecordingTime(0);
      setLoading(false);
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0);
    const audioChunks = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorderInstance = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderInstance.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorderInstance.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/m4a" });

        setMessage((prevMessage) => ({
          ...prevMessage,
          message: audioBlob,
          type: "audio",
        }));

        mediaRecorderInstance.stream.getTracks().forEach((track) => {
          track.stop();
        });

        setIsRecording(false);
        clearInterval(recordingIntervalRef.current);
      };

      mediaRecorderInstance.start();
      setMediaRecorder(mediaRecorderInstance);
      startRecordingTimer();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    clearInterval(recordingIntervalRef.current);
  };

  const startRecordingTimer = () => {
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const formatRecordingTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const extractTextAfterMessages = (url) => {
    const regex = /_messages\.(.*)/;
    const match = url.match(regex);
    return match ? match[1] : fileName;
  };

  return (
    <div className="chat-container">
      <div className="chat-head">
        <Link
          to={`/profile/${
            chat?.buyer
              ? user?.id === chat?.buyer?.id
                ? chat?.seller?.id
                : chat?.buyer?.id
              : chat?.buyer?.id
          }`}
          className="user"
        >
          <img
            src={
              chat?.buyer
                ? user?.id === chat?.buyer?.id
                  ? chat?.seller?.image
                  : chat?.buyer?.image
                : "/images/deleted-account.jpg"
            }
            alt="user"
          />
          <h6 className="name">
            {chat?.buyer
              ? user?.id === chat?.buyer?.id
                ? chat?.seller?.name
                : chat?.buyer?.name
              : t("chat.deletedAccount")}
          </h6>
        </Link>
      </div>

      {chat?.ad && (
        <Link to={`/ad-details/${chat?.ad?.id}`} className="adItem">
          <img src={chat?.ad?.image?.image} alt="" />
          <p>{chat?.ad?.title}</p>
        </Link>
      )}

      <div className="inner-container" ref={chatContainerRef}>
        {messages.map((message) => (
          <div
            className={`message ${
              message?.from_id === user?.id
                ? "sent-message"
                : "received-message"
            }`}
            key={message?.id}
          >
            <div className="d-flex flex-column">
              <div className="message-content">
                {message?.type === "text" && <p>{message?.message}</p>}
                {message?.type === "audio" && (
                  <audio controls src={message?.message} />
                )}
                {message?.type === "image" && (
                  <img
                    style={{
                      aspectRatio: 1 / 1,
                      width: "300px",
                      objectFit: "contain",
                    }}
                    src={message?.message}
                    alt=""
                  />
                )}
                {message?.type === "file" && (
                  <Link to={message?.message} target="_blank">
                    <div className="doc_message">
                      <p>{extractTextAfterMessages(message?.message)}</p>
                      <div className="icon">
                        <IconFileFilled />
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <span
                dir="ltr"
                className={message?.from_id === user?.id ? "sen" : "rec"}
              >
                {formatMessageTime(message?.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-send">
        <form onSubmit={handleSendMessage} ref={formRef}>
          <div className="input-field">
            {message?.type === "text" || message?.type === "" ? (
              <input
                type="text"
                placeholder={t("chat.writeHere")}
                value={message?.type === "text" ? message?.message : ""}
                onChange={(e) =>
                  setMessage({
                    ...message,
                    message: e.target.value,
                    type: "text",
                  })
                }
              />
            ) : (
              <div className="file_place">
                <IconTrash
                  style={{ cursor: "pointer" }}
                  stroke={1}
                  onClick={() => {
                    setMessage({ ...message, message: "", type: "" });
                    setRecordingTime(0);
                  }}
                />
                {message.type === "audio" ? (
                  <audio controls src={URL.createObjectURL(message?.message)} />
                ) : (
                  <p className="m-0">
                    {message?.message?.name || message?.message}
                  </p>
                )}
              </div>
            )}

            <label className="files-input">
              <IconPaperclip stroke={2} />
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFileName(file.name);
                  setMessage({
                    ...message,
                    message: file,
                    type: file.type.startsWith("image/")
                      ? "image"
                      : file.type.startsWith("audio/")
                      ? "audio"
                      : "file",
                  });
                }}
                type="file"
                name="userImage"
                id="img-upload"
              />
            </label>
            {isRecording ? (
              <label className="files-input" onClick={stopRecording}>
                <IconPlayerPause stroke={2} />
                <input type="" />
              </label>
            ) : (
              <label className="files-input" onClick={startRecording}>
                <IconMicrophone stroke={2} />
                <input type="" />
              </label>
            )}
            {recordingTime > 0 && (
              <span>{formatRecordingTime(recordingTime)}</span>
            )}
          </div>
          <button disabled={loading}>
            <IconSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
