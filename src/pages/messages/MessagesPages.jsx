import React from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import CustomChatList from "./ChatList";

function MessagesPages() {
  return (
    <CustomPageWithDrawer>
      <CustomChatList />
    </CustomPageWithDrawer>
  );
}

export default MessagesPages;
