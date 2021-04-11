import { Collapse, Divider, List, Space, Switch, Tooltip } from "antd";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import RoomInfo from "../../../common/roomInfo";
import { ParticipantList } from "../../style";

interface IProps {
  users: any[];
}

const UserPane: React.FC<IProps> = ({ users }) => {
  const { socket, roomId, roomName, viewMode, currentUser } = useSelector(
    (state: any) => ({
      socket: state.getIn(["retro", "socket"]).toJS(),
      roomId: state.getIn(["retro", "roomId"]),
      roomName: state.getIn(["retro", "roomName"]),
      viewMode: state.getIn(["retro", "viewMode"]),
      currentUser: state.getIn(["retro", "currentUser"]).toJS()
    })
  );

  const toggleViewMode = (isView: boolean) => socket.current?.emit('toggle_view_mode', isView);

  return (
    <div>
      <RoomInfo roomId={roomId} roomName={roomName} path={"retro"} />
      <Divider />
      <Collapse defaultActiveKey={["settings"]}>
        <Collapse.Panel header="Settings" key="settings">
          <div className="align-center-flex">
            <Space>
              <label>View Mode</label>
              <Tooltip title="Enter view mode to reveal items">
                <Switch
                  checked={viewMode}
                  onChange={() => toggleViewMode(!viewMode)}
                />
              </Tooltip>
            </Space>
          </div>
        </Collapse.Panel>
      </Collapse>
      <Divider />
      <Collapse defaultActiveKey={["observers", "players"]}>
        <Collapse.Panel header="Observers" key="observers">
          <ParticipantList
            size="small"
            locale={{ emptyText: " " }}
            dataSource={users.filter(user => user.type === "observer")}
            renderItem={user => {
              const isCurrentUser = user.id === currentUser.id;
              return (
                <List.Item className="align-center-flex">
                  {isCurrentUser ? (
                    <b>{user.name}</b>
                  ) : (
                    <span>{user.name}</span>
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
            dataSource={users.filter(user => user.type === "player")}
            renderItem={user => {
              const isCurrentUser = user.id === currentUser.id;
              return (
                <List.Item className="align-center-flex">
                  {isCurrentUser ? (
                    <b>{user.name}</b>
                  ) : (
                    <span>{user.name}</span>
                  )}
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
