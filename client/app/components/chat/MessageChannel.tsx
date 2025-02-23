import React, { useState } from "react";
import { FlatList } from "react-native";

import Message from "./ChatMessage";
import { MessageChannelProps } from "../../types/Props";
import { TouchableOpacity } from "react-native";
import SheetModal from "./SheetModal";
import { UserProfile } from "../../types/User";

const MessageChannel: React.FC<MessageChannelProps> = ({
  nearbyUsers,
  messages,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const messagesArray = Array.from(messages.values())
                             .sort((a, b) => b.timestamp - a.timestamp);

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
    <FlatList
      contentContainerStyle={{
        width: "100%",
      }}
      data={messagesArray}
      renderItem={({ item }) => {
        const user: UserProfile = nearbyUsers[item.author];
        // Mock data for testing when socket server isn't working
        // const user: UserProfile = { displayName: "You", profilePicture: 1 };
        if (user === undefined) {
          console.log(
            `Message recieved from user not in nearbyUsers (${item.author})`
          );
          return null;
        }
        return (
          <TouchableOpacity onLongPress={ handleLongPress }>
          <Message
            messageContent={item.content.text!}
            author={user.displayName}
            time={item.timestamp}
          />
          </TouchableOpacity>
        );
      }}
      inverted // This will render items from the bottom
      onLayout={() => {}} // This will make sure the list is scrolled to the bottom on first render
    />
{isModalVisible && <SheetModal isVisible={isModalVisible} onDismiss={handleCloseModal} />}
</>
  );
};

export default MessageChannel;
