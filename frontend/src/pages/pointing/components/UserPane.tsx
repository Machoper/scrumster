import { CheckCircleFilled } from "@ant-design/icons";
import { Badge, Collapse, Divider, List, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomInfo from "../../../common/roomInfo";
import {
  ParticipantList,
  RadioButton,
  RadioGroup
} from "../../style";
import { actionCreators } from "../store";

interface IProps {
}

const UserPane: React.FC<IProps> = ({ }) => {
  const { socket, roomId, roomName, observers, players, currentUser } = useSelector(
    (state: any) => ({
      socket: state.getIn(["pointing", "socket"]).toJS(),
      roomId: state.getIn(["pointing", "roomId"]),
      roomName: state.getIn(["pointing", "roomName"]),
      players: state.getIn(["pointing", "players"]).toJS(),
      observers: state.getIn(["pointing", "observers"]).toJS(),
      currentUser: state.getIn(["pointing", "currentUser"]).toJS()
    })
  );
  const dispatch = useDispatch();

  const changeUserType = (type: string) => {
    socket.current?.emit('change_user_type', type);
    dispatch(actionCreators.updateCurrentUser({ ...currentUser, type }));
  }

  return (
    <div>
      <RoomInfo roomId={roomId} roomName={roomName} path={"pointing"} />
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
                          style={{ backgroundColor: "#1890ff" }}
                        />
                      ) : (
                        <CheckCircleFilled style={{color: "#1890ff"}} />
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
