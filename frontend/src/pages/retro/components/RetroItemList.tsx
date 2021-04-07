import { DeleteFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Comment, List, Card, Badge } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { FiThumbsUp } from "react-icons/fi";

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

interface IRetroItemProps {
  viewMode: boolean;
  item: any;
  removeItem: (itemId: string) => void;
  addItem: (item: any) => void;
  toggleLike: (itemId: string) => void;
}

const RetroItem: React.FC<IRetroItemProps> = ({
  viewMode,
  item,
  addItem,
  removeItem,
  toggleLike
}) => {
  const [content, setContent] = useState(item.content);
  const currentUser = useSelector((state: any) =>
    state.getIn(["retro", "currentUser"]).toJS()
  );

  const getActions = (item: any): React.ReactNode[] => {
    let actions = [
      <div onClick={() => toggleLike(item.id)}>
        <Badge
          key="like"
          count={item.likes.length}
          overflowCount={9}
          size="small"
          offset={[item.likes.length > 9 ? 15 : 5, 0]}
          style={{ backgroundColor: "#000" }}
        >
          <FiThumbsUp />
        </Badge>
      </div>
    ];
    if (!viewMode && item.authorId === currentUser.id) {
      actions.push(
        <DeleteFilled
          key="delete"
          style={{ color: "red" }}
          onClick={() => {
            if (!viewMode) {
              removeItem(item.id);
            }
          }}
        />
      );
    }
    return actions;
  };

  return (
    <Card
      className="animate__animated animate__fadeIn"
      actions={getActions(item)}
      style={{ borderColor: "#888" }}
    >
      {viewMode || item.read || item.authorId === currentUser.id ? (
        <Comment
          style={{ margin: "-16px 0" }}
          author={item.authorName}
          content={
            <Paragraph
              editable={{
                icon: item.authorId === currentUser.id ? null : <Fragment />,
                onChange: setContent,
                onEnd: () => addItem({ ...item, content })
              }}
            >
              {content}
            </Paragraph>
          }
        />
      ) : (
        <div className="align-center-flex" style={{ fontSize: 30 }}>
          <EyeInvisibleFilled />
        </div>
      )}
    </Card>
  );
};

export default RetroItemList;
