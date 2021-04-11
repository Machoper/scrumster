import Title from "antd/lib/typography/Title";
import _ from "lodash";
import React, { Fragment } from "react";
import { LaneContainer } from "../style";
import RetroLane from "./RetroLane";

interface IProps {
  items: any[];
}

const LANES = [
  {
    title: "Start doing",
    type: "start"
  },
  {
    title: "Stop doing",
    type: "stop"
  },
  {
    title: "Continue doing",
    type: "continue"
  }
];

const PrimaryPane: React.FC<IProps> = ({ items }) => {
  const getItemsByType = (type: string) => {
    return _.filter(items, { type });
  };

  return (
    <Fragment>
      {LANES.map(lane => (
        <LaneContainer>
          <Title
            level={2}
            className="align-center-flex"
            style={{ borderBottom: "1px solid grey" }}
          >
            {lane.title}
          </Title>
          <RetroLane type={lane.type} items={getItemsByType(lane.type)} />
        </LaneContainer>
      ))}
    </Fragment>
  );
};

export default PrimaryPane;
