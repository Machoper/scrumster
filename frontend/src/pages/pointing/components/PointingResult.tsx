import _ from "lodash";
import { Result, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "Points",
    dataIndex: "points"
  },
  {
    title: "Count",
    dataIndex: "count"
  }
];

const PointingResult = () => {
  const { players } = useSelector((state: any) => ({
    players: state.getIn(["pointing", "players"]).toJS()
  }));

  const getResult = () => {
    return _.chain(players)
      .map(player => player.vote)
      .filter(vote => !!vote)
      .countBy()
      .map((count, points) => ({ key: "" + points, points, count }))
      .value();
  };

  const consensus = () => getResult().length === 1;

  return (
    <div>
      <Table
        style={{
          boxShadow: "0px 0px 10px 5px #78797b",
          minWidth: 500
        }}
        pagination={false}
        columns={columns}
        dataSource={getResult()}
      ></Table>
      {consensus() ? (
        <Result status="success" title="Consensus!"></Result>
      ) : (
        <Result status="warning" title="No consensus yet"></Result>
      )}
    </div>
  );
};

export default PointingResult;
