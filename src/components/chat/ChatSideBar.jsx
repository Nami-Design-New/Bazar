import { IconPaperclip, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { formatMessageTime } from "../../utils/helpers";

const ChatSideBar = ({
  setShowChatsMenu,
  showChatsMenu,
  chats,
  targetChat,
  setTargetChat
}) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authedUser);

  function truncate(inputString) {
    let truncateStringResult;
    if (inputString.length > 35) {
      truncateStringResult = inputString.substring(0, 35) + "...";
    } else {
      truncateStringResult = inputString;
    }
    return truncateStringResult;
  }

  return (
    <div className={`side-menu p-2 pt-3 ${showChatsMenu ? "active" : ""}`}>
      <div className="colse" onClick={() => setShowChatsMenu(false)}>
        <IconX stroke={2} />
      </div>

      {chats?.map((chat) => (
        <button
          className={`nav-link ${targetChat?.id === chat?.id ? "active" : ""}`}
          key={chat?.id}
          onClick={() => {
            sessionStorage.setItem("buyer_id", chat?.buyer_id);
            sessionStorage.setItem("seller_id", chat?.seller_id);
            sessionStorage.setItem("ad_id", chat?.ad_id);
            setTargetChat(chat);
            setShowChatsMenu(false);
          }}
        >
          <img
            className="userImg"
            src={
              chat?.buyer
                ? chat?.buyer?.id === user?.id
                  ? chat?.seller?.image
                  : chat?.buyer?.image || "/images/userr.webp"
                : "/images/deleted-account.jpg"
            }
            alt="user"
          />

          <div className="text-wrap">
            <h6 className="name">
              {chat?.buyer
                ? chat?.buyer?.id === user?.id
                  ? chat?.seller?.name
                  : chat?.buyer?.name
                : t("chat.deletedAccount")}
            </h6>

            <p className="lastMessage unread">
              {chat?.last_message?.type !== "text" ? (
                <div className="icon">
                  <IconPaperclip stroke={2} />
                  <span>{t("chat.attachment")}</span>
                </div>
              ) : (
                truncate(chat?.last_message?.message)
              )}

              {chat?.last_message?.from_id === user?.id && (
                <span className="read">
                  {(chat?.buyer?.id === user?.id &&
                    chat?.last_message?.is_read_buyer === 1) ||
                  (chat?.buyer?.id !== user?.id &&
                    chat?.last_message?.is_read_seller === 1) ? (
                    <i className="fa-regular fa-check-double"></i>
                  ) : (
                    <i className="fa-regular fa-check"></i>
                  )}
                </span>
              )}
            </p>

            <span className="time" dir="ltr">
              {formatMessageTime(chat?.last_message?.created_at)}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatSideBar;
