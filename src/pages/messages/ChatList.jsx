import React, { useEffect, useState } from "react";
import { ChatList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useNavigate, useParams } from "react-router-dom";
import { getChats } from "../../redux/api/moduleApi";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { formatDistanceToNow, isBefore, subDays } from "date-fns";
import { fr } from "date-fns/locale";

function CustomChatList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, userType } = useSelector((state) => state.auth);

  const [chatsData, setChatsData] = useState([]);

  const { isLoading, refetch } = useQuery({
    queryKey: "getChats",
    enabled: false,
    queryFn: () => getChats(id, user.token, userType === "Teacher"),
    onSuccess: (data) => {
      const tempData = [];
      data.data.chats.forEach((chat) => {
        let formattedDate;
        if (chat.messages.length) {
          const date = new Date(
            chat.messages[chat.messages.length - 1].createdAt
          );
          const now = new Date();
          if (isBefore(date, subDays(now, 1))) {
            formattedDate = date.toLocaleDateString("fr-FR");
          } else {
            formattedDate = formatDistanceToNow(date, {
              addSuffix: true,
              locale: fr,
            });
          }
        } else {
          const date = new Date(chat.createdAt);
          const now = new Date();
          if (isBefore(date, subDays(now, 1))) {
            formattedDate = date.toLocaleDateString("fr-FR");
          } else {
            formattedDate = formatDistanceToNow(date, {
              addSuffix: true,
              locale: fr,
            });
          }
        }

        tempData.push({
          avatar:
            "https://cdn.icon-icons.com/icons2/1919/PNG/512/avatarinsideacircle_122011.png",
          alt:
            userType === "Teacher"
              ? chat.student.fullName
              : chat.teacher.fullName,
          title:
            userType === "Teacher"
              ? chat.student.fullName
              : chat.teacher.fullName,
          subtitle: chat.messages.length
            ? chat.messages[chat.messages.length - 1].message
            : "",
          date: chat.messages.length
            ? new Date(chat.messages[chat.messages.length - 1].createdAt)
            : new Date(chat.createdAt),
          unread: 0,
          dateString: formattedDate,
          id: chat._id,
        });
      });
      setChatsData(tempData);
    },

    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    refetch();
  }, [chatsData, refetch]);

  const handleNavigateToChat = (e) => {
    navigate(`${e.id}`);
  };

  if (isLoading) return <LoadingPage />;

  return (
    <ChatList
      className="chat-list"
      dataSource={chatsData}
      onClick={(e) => {
        handleNavigateToChat(e);
      }}
    />
  );
}

export default CustomChatList;
