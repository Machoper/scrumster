import { LinkOutlined } from "@ant-design/icons";
import {
  Button,
  Collapse,
  Divider,
  List,
  message,
  PageHeader,
  Switch
} from "antd";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ParticipantList } from "../../style";
import { actionCreators } from "../store";

interface IProps {
  users: any[];
}

const UserPane: React.FC<IProps> = ({ users }) => {
  const { roomName, viewMode } = useSelector((state: any) => ({
    roomName: state.getIn(["retro", "roomName"]),
    viewMode: state.getIn(["retro", "viewMode"])
  }));

  const dispatch = useDispatch();

  return (
    <Fragment>
      <PageHeader
        title={roomName}
        subTitle={
          <Button
            type="link"
            icon={<LinkOutlined />}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              message.success("Room link copied");
            }}
          />
        }
      />
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
