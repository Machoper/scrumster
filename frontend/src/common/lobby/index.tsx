import { HomeOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { ActionCard } from "./style";

interface IProps {
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

const Lobby: React.FC<IProps> = ({ onCreateRoom, onJoinRoom }) => {
  return (
    <div className="align-center-flex container">
      <Row gutter={32}>
        <Col span={10}>
          <ActionCard
            hoverable
            bordered={true}
            className="align-center-flex animate__animated animate__fadeInLeft"
            style={{ float: "right" }}
            onClick={onCreateRoom}
          >
            <div style={{ textAlign: "center" }}>
              <HomeOutlined style={{ fontSize: "60px" }} />
            </div>
            <div>
              <Title level={3}>Create Room</Title>
            </div>
          </ActionCard>
        </Col>
        <Col span={10} offset={4}>
          <ActionCard
            hoverable
            bordered={true}
            className="align-center-flex animate__animated animate__fadeInRight"
            onClick={onJoinRoom}
          >
            <div style={{ textAlign: "center" }}>
              <UsergroupAddOutlined style={{ fontSize: "60px" }} />
            </div>
            <div>
              <Title level={3}>Join Room</Title>
            </div>
          </ActionCard>
        </Col>
      </Row>
    </div>
  );
};

export default Lobby;
