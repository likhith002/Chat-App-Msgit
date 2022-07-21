import React, { useState } from "react";

import { ChatState } from "../Context-API/ChatProvider";
import { Box } from "@chakra-ui/layout";
import SideDrawer from "../Components/ChatCopmponents/SideDrawer";
import MyChats from "../Components/ChatCopmponents/MyChats";
import ChatBox from "../Components/ChatCopmponents/ChatBox";
function Chat() {
  // const [chat, setchat] = useState([]);

  // useEffect(() => {
  //   window.location.reload(false);
  // }, []);

  const [fetchAgain, setFetchAgain] = useState(false);

  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer></SideDrawer>}

      <Box
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain}></MyChats>}
        {user && (
          <ChatBox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          ></ChatBox>
        )}
      </Box>
    </div>
  );
}

export default Chat;
