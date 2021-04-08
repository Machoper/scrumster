import {
  Card,
  Collapse,
  Divider,
  List,
  message,
  Switch
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ParticipantList } from "../../style";
import { actionCreators } from "../store";

interface IProps {
  users: any[];
}

const UserPane: React.FC<IProps> = ({ users }) => {
  const { roomId, roomName, viewMode } = useSelector((state: any) => ({
    roomId: state.getIn(["retro", "roomId"]),
    roomName: state.getIn(["retro", "roomName"]),
    viewMode: state.getIn(["retro", "viewMode"])
  }));

  const dispatch = useDispatch();

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
            text: `${window.location.host}/retro/${roomId}`,
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
      <Collapse defaultActiveKey={["settings"]}>
        <Collapse.Panel header="Settings" key="settings">
          <div className="align-center-flex">
            <label>View Mode</label>
            <Switch
              checked={viewMode}
              onChange={() => dispatch(actionCreators.setViewMode(!viewMode))}
            />
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
            renderItem={user => (
              <List.Item className="align-center-flex">{user.name}</List.Item>
            )}
          />
        </Collapse.Panel>
        <Collapse.Panel header="Players" key="players">
          <ParticipantList
            size="small"
            locale={{ emptyText: " " }}
            dataSource={users.filter(user => user.type === "player")}
            renderItem={user => (
              <List.Item className="align-center-flex">{user.name}</List.Item>
            )}
          />
        </Collapse.Panel>
      </Collapse>
    </Fragment>
  );
};

export default UserPane;
