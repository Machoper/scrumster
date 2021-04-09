import { List } from "antd";
import React from "react";
import RetroItem from "./RetroItem";

interface IProps {
  items: any[];
}

const RetroItemList: React.FC<IProps> = ({ items }) => {
  return (
    <List
      dataSource={items}
      header={`${items.length} ${items.length > 1 ? "Items" : "Item"}`}
      itemLayout="horizontal"
      renderItem={item => <RetroItem item={item}></RetroItem>}
    />
  );
};

export default RetroItemList;
