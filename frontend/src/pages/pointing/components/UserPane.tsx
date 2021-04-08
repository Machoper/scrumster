import { CheckCircleFilled } from "@ant-design/icons";
import { Badge, Collapse, Divider, List, message, Space } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  ParticipantList,
  RadioButton,
  RadioGroup,
  RoomInfo
} from "../../style";

interface IProps {
  changeUserType: (type: string) => void;
}

const UserPane: React.FC<IProps> = ({ changeUserType }) => {
  const { roomId, roomName, observers, players, currentUser } = useSelector(
    (state: any) => ({
      roomId: state.getIn(["pointing", "roomId"]),
      roomName: state.getIn(["pointing", "roomName"]),
      players: state.getIn(["pointing", "players"]).toJS(),
      observers: state.getIn(["pointing", "observers"]).toJS(),
      currentUser: state.getIn(["pointing", "currentUser"]).toJS()
    })
  );

  return (
    <div>
      <RoomInfo>
        <Title level={2}>{roomName}</Title>
        <Paragraph
          style={{ color: "grey" }}
          copyable={{
            text: `${window.location.host}/pointing/${roomId}`,
            tooltips: "Copy room link",
            onCopy: () => {
              message.success("Room link copied");
            }
          }}
        >
          Room ID: {roomId}
        </Paragraph>
      </RoomInfo>
      <Divider />
      <RadioGroup defaultValue={currentUser.type} buttonStyle="solid">
        <RadioButton
          value="observer"
          checked={currentUser.type === "observer"}
          onClick={() => {
            changeUserType("observer");
          }}
        >
          Observer
        </RadioButton>
        <RadioButton
          value="player"
          checked={currentUser.type === "player"}
          onClick={() => {
            changeUserType("player");
          }}
        >
          Player
        </RadioButton>
      </RadioGroup>
      <Divider />
      <Collapse defaultActiveKey={["observers", "players"]}>
        <Collapse.Panel header="Observers" key="observers">
          <ParticipantList
            size="small"
            locale={{ emptyText: " " }}
            dataSource={observers}
            renderItem={(observer: any) => {
              const isCurrentUser = observer.id === currentUser.id;
              return (
                <List.Item className="align-center-flex">
                  {isCurrentUser ? (
                    <b>{observer.name}</b>
                  ) : (
                    <span>{observer.name}</span>
                  )}
                </List.Item>
              );
            }}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Players" key="players">
          <ParticipantList
            size="small"
            locale={{ emptyText: " " }}
            dataSource={players}
            renderItem={(player: any) => {
              const isCurrentUser = player.id === currentUser.id;
              return (
                <List.Item className="align-center-flex">
                  <Space>
                    {isCurrentUser ? (
                      <b>{player.name}</b>
                    ) : (
                      <span>{player.name}</span>
                    )}
                    {player.vote ? (
                      isCurrentUser ? (
                        <Badge
                          count={player.vote}
                          overflowCount={100}
                          style={{ backgroundColor: "black" }}
                        />
                      ) : (
                        <CheckCircleFilled />
                      )
                    ) : null}
                  </Space>
                </List.Item>
              );
            }}
          />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default UserPane;
