import { List } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import RetroItem from "./RetroItem";

interface IProps {
  items: any[];
  removeItem: (itemId: string) => void;
  addItem: (item: any) => void;
  toggleLike: (itemId: string) => void;
}

const RetroItemList: React.FC<IProps> = ({
  items,
  removeItem,
  addItem,
  toggleLike
}) => {
  const { viewMode } = useSelector((state: any) => ({
    viewMode: state.getIn(["retro", "viewMode"])
  }));

  return (
    <List
      dataSource={items}
      header={`${items.length} ${items.length > 1 ? "Items" : "Item"}`}
      itemLayout="horizontal"
      renderItem={item => (
        <RetroItem
          viewMode={viewMode}
          item={item}
          removeItem={removeItem}
          addItem={addItem}
          toggleLike={toggleLike}
        ></RetroItem>
      )}
    />
  );
};

export default RetroItemList;
