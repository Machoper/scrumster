import { Collapse, Divider, List, message, Space, Switch, Tooltip } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { ParticipantList, RoomInfo } from "../../style";

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
    <Fragment>
      <RoomInfo>
        <Title level={2}>{roomName}</Title>
        <Paragraph
          style={{ color: "grey" }}
          copyable={{
            text: `${window.location.host}/retro/${roomId}`,
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
    </Fragment>
  );
};

export default UserPane;
