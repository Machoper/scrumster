import { CheckCircleFilled } from "@ant-design/icons";
import {
  Badge,
  Card,
  Collapse,
  Divider,
  List,
  message,
  Space,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { ParticipantList, RadioButton, RadioGroup } from "../../style";

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
    <Fragment>
      <Card
        style={{
          backgroundColor: "transparent",
          boxShadow: "0px 0px 5px 2px #78797b",
          borderRadius: 10
        }}
      >
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
      </Card>
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
            renderItem={(observer: any) => (
              <List.Item className="align-center-flex">
                {observer.name}
              </List.Item>
            )}
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
    </Fragment>
  );
};

export default UserPane;
