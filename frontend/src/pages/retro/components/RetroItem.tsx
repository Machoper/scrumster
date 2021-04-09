import { DeleteFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Badge, Card, Comment } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { Fragment, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { useSelector } from "react-redux";

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

  const isAuthor = item.authorId === currentUser.id;

  const getActions = (): React.ReactNode[] => {
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
    if (!viewMode && isAuthor) {
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

  const getItemContent = (): React.ReactNode => {
    if (!viewMode && isAuthor) {
      return (
        <Paragraph
          editable={{
            icon: item.authorId === currentUser.id ? null : <Fragment />,
            onChange: setContent,
            onEnd: () => addItem({ ...item, content })
          }}
        >
          {content}
        </Paragraph>
      );
    }
    if (item.read) {
      return <Paragraph>{content}</Paragraph>;
    }
    return (
      <div className="align-center-flex" style={{ fontSize: 30 }}>
        <EyeInvisibleFilled
          onClick={() => {
            if (viewMode) {
              // show content
            }
          }}
        />
      </div>
    );
  };

  return (
    <Card
      className="animate__animated animate__fadeIn"
      actions={getActions()}
      style={{ borderColor: "#888", marginTop: 8 }}
    >
      <Comment
        style={{ margin: "-16px 0" }}
        author={item.authorName}
        content={getItemContent()}
      />
    </Card>
  );
};

export default RetroItem;
