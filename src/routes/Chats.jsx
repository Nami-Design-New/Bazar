import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconBrandWechat } from "@tabler/icons-react";
import DataLoader from "../ui/DataLoader";
import ChatSideBar from "./../components/chat/ChatSideBar";
import ChatRoom from "./../components/chat/ChatRoom";
import useGetChat from "./../hooks/chats/useGetChat";
import useGetChats from "./../hooks/chats/useGetChats";

const Chats = () => {
  const { t } = useTranslation();
  const [showChatsMenu, setShowChatsMenu] = useState(false);
  const [targetChat, setTargetChat] = useState(null);

  const { data: chats, isLoading } = useGetChats();

  const {
    data: chat,
    isLoading: isChatLoading,
    refetch,
  } = useGetChat({
    buyer_id: sessionStorage.getItem("buyer_id"),
    seller_id: sessionStorage.getItem("seller_id"),
    ad_id: sessionStorage.getItem("ad_id"),
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
                  refetch={refetch}
                />
              </div>
              <div className="col-lg-8 col-12 p-2">
                {targetChat ? (
                  <>
                    {isChatLoading ? <DataLoader /> : <ChatRoom chat={chat} />}
                  </>
                ) : (
                  <div className="lottie_player_holder">
                    <img src="/images/chat-holder.svg" alt="" />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="lottie_player_holder">
              <img src="/images/chat-holder.svg" alt="" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Chats;
