import _ from "lodash";
import { Result, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { ColumnsType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";

const columns: ColumnsType<any> = [
  {
    title: (
      <Title level={3} style={{ marginBottom: 0 }}>
        Points
      </Title>
    ),
    dataIndex: "points",
    align: "center",
    sorter: {
      compare: (a, b) => a.points - b.points,
      multiple: 2
    },
    render: value => (
      <Title level={3} style={{ marginBottom: 0 }}>
        {value}
      </Title>
    )
  },
  {
    title: (
      <Title level={3} style={{ marginBottom: 0 }}>
        Count
      </Title>
    ),
    dataIndex: "count",
    align: "center",
    sorter: {
      compare: (a, b) => a.count - b.count,
      multiple: 1
    },
    defaultSortOrder: "descend",
    render: value => (
      <Title level={3} style={{ marginBottom: 0 }}>
        {value}
      </Title>
    )
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
    <div className="align-center-flex">
      <Table
        style={{
          boxShadow: "0px 0px 10px 5px #78797b",
          marginRight: 16
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
