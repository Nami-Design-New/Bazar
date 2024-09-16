import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconBrandWechat } from "@tabler/icons-react";
import useGetChats from "./../features/chat/useGetChats";
import useGetChat from "../features/chat/useGetChat";
import DataLoader from "../ui/DataLoader";
import ChatSideBar from "./../features/chat/ChatSideBar";
import ChatRoom from "./../features/chat/ChatRoom";

const Chats = () => {
  const { t } = useTranslation();
  const [showChatsMenu, setShowChatsMenu] = useState(false);
  const [targetChat, setTargetChat] = useState(null);

  const { data: chats, isLoading } = useGetChats();
  const { data: chat, isLoading: isChatLoading } = useGetChat({
    buyer_id: sessionStorage.getItem("buyer_id"),
    seller_id: sessionStorage.getItem("seller_id"),
    ad_id: sessionStorage.getItem("ad_id")
  });

  useEffect(() => {
    if (chat?.id) {
      setTargetChat(chat);
    } else {
      setTargetChat(null);
    }
  }, [chat]);

  return isLoading ? (
    <DataLoader />
  ) : (
    <section className="chat-section">
      <div className="container d-block">
        <button className="openTaps" onClick={() => setShowChatsMenu(true)}>
          <IconBrandWechat stroke={2} />
          <span> {t("chat.chats")} </span>
        </button>
        <div className="row">
          {chats?.length > 0 ? (
            <>
              <div className="col-lg-4 col-12 p-2">
                <ChatSideBar
                  chats={chats}
                  setTargetChat={setTargetChat}
                  targetChat={targetChat}
                  showChatsMenu={showChatsMenu}
                  setShowChatsMenu={setShowChatsMenu}
                />
              </div>
              <div className="col-lg-8 col-12 p-2">
                {targetChat ? (
                  <>
                    {isChatLoading ? <DataLoader /> : <ChatRoom chat={chat} />}
                  </>
                ) : (
                  <div className="lottie_player_holder"></div>
                )}
              </div>
            </>
          ) : (
            <div className="lottie_player_holder"></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Chats;
