import { LinkOutlined } from "@ant-design/icons";
import { message } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import React from "react";
import { RoomInfoContainer } from "../../pages/style";

interface IProps {
  roomId: string;
  roomName: string;
  path: string;
}

const RoomInfo: React.FC<IProps> = ({ roomId, roomName, path }) => {
  return (
    <RoomInfoContainer>
      <Paragraph
        style={{ color: "grey" }}
        copyable={{
          icon: <LinkOutlined style={{ fontSize: 24 }} />,
          text: `${window.location.host}/${path}/${roomId}`,
          tooltips: "Copy room link",
          onCopy: () => {
            message.success("Room link copied");
          }
        }}
      >
        <Title level={2} style={{ display: "inline" }}>
          {roomName}
        </Title>
      </Paragraph>
      <Paragraph
        style={{ color: "grey" }}
        copyable={{
          text: roomId,
          tooltips: "Copy room ID",
          onCopy: () => {
            message.success("Room ID copied");
          }
        }}
      >
        Room ID: {roomId}
      </Paragraph>
    </RoomInfoContainer>
  );
};

export default RoomInfo;
