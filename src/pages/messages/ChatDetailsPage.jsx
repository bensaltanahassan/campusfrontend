import React, { useState } from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { MessageList, Input } from "react-chat-elements";
import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { getSingleChat, sendMessage } from "../../redux/api/moduleApi";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { formatDistanceToNow, isBefore, subDays } from "date-fns";
import { fr } from "date-fns/locale";

function ChatDetailsPage() {
  const { id } = useParams();
  const { chatId } = useParams();
  const { user, userType } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  const { isLoading: isLoadingPut, mutate } = useMutation({
    mutationKey: "sendMessage",

    mutationFn: (message) => {
      return sendMessage(
        id,
        user.token,
        userType === "Teacher",
        message,
        chatId
      );
    },
    onSuccess: (data) => {
      refetch();
      scrollToBottom();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isLoading, refetch } = useQuery({
    queryKey: "getSingleChat",
    queryFn: () => getSingleChat(id, user.token, chatId),
    refetchInterval: 1000,
    onSuccess: (data) => {
      console.log("refetch");
      const tempData = [];
      data.data.chat.messages.forEach((message) => {
        const date = new Date(message.createdAt);
        const now = new Date();
        let formattedDate;
        if (isBefore(date, subDays(now, 1))) {
          formattedDate = date.toLocaleDateString("fr-FR");
        } else {
          formattedDate = formatDistanceToNow(date, {
            addSuffix: true,
            locale: fr,
          });
        }
        if (userType === "Teacher") {
          if (message.senderType === "Teacher") {
            tempData.push({
              position: "right",
              type: "text",
              title: message.sender.fullName,
              text: message.message,
              date: new Date(message.createdAt),
              dateString: formattedDate,
            });
          } else {
            tempData.push({
              position: "left",
              type: "text",
              title: message.sender.fullName,
              text: message.message,
              date: new Date(message.createdAt),
              dateString: formattedDate,
            });
          }
        } else {
          if (message.senderType === "Student") {
            tempData.push({
              position: "right",
              type: "text",
              title: message.sender.fullName,
              text: message.message,
              date: new Date(message.createdAt),
              dateString: formattedDate,
            });
          } else {
            tempData.push({
              position: "left",
              type: "text",
              title: message.sender.fullName,
              text: message.message,
              date: new Date(message.createdAt),
              dateString: formattedDate,
            });
          }
        }
      });
      setMessages(tempData);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const handleSendMessage = () => {
    if (
      message !== "" &&
      message !== null &&
      message !== undefined &&
      message.trim() !== " "
    ) {
      mutate(message);
      handleClear();
      scrollToBottom();
    }
  };

  const handleClear = () => {
    setMessage("");
    document.querySelector(".rce-input").value = "";
  };

  if (isLoading) return <LoadingPage />;

  return (
    <CustomPageWithDrawer>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pb: 5,
        }}
      >
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={messages}
        />
        <Input
          inputStyle={{
            backgroundColor: "#f5f5f5",
            borderRadius: "2",
            border: "none",
            padding: "0 10px",
            fontSize: "14px",
          }}
          placeholder="Entrer un message..."
          multiline={false}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          rightButtons={
            <LoadingButton
              loading={isLoadingPut}
              color="primary"
              variant="contained"
              sx={{
                height: "100%",
                borderRadius: "2",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#3f51b5",
                },
              }}
              onClick={() => {
                handleSendMessage();
              }}
            >
              Envoyer
            </LoadingButton>
          }
        />
      </Stack>
    </CustomPageWithDrawer>
  );
}

export default ChatDetailsPage;
