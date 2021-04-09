import { DeleteFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Badge, Card, Comment, Tooltip } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { Fragment, useState } from "react";
import { FiThumbsUp } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Hoverable } from "../../../style";

interface IRetroItemProps {
  item: any;
}

const RetroItem: React.FC<IRetroItemProps> = ({ item }) => {
  const [content, setContent] = useState(item.content);
  const { socket, currentUser, viewMode } = useSelector((state: any) => ({
    socket: state.getIn(["retro", "socket"]).toJS(),
    currentUser: state.getIn(["retro", "currentUser"]).toJS(),
    viewMode: state.getIn(["retro", "viewMode"])
  }));

  const isAuthor = item.authorId === currentUser.id;

  const toggleLike = () => socket.current?.emit('item:toggle_like', item.id);
  const removeItem = () => socket.current?.emit('item:remove', item.id);
  const addItem = (newItem: any) => socket.current?.emit('item:add', newItem);
  const showItem = () => socket.current?.emit("item:show", item.id);

  const getLikeToolTip = () => {
    const likes = item.likes.length;
    if (likes > 0) {
      return likes + " " + (likes > 1 ? "people" : "person") + " liked this";
    }
    return "";
  };

  const getActions = (): React.ReactNode[] => {
    let actions = [];
    if (item.read) {
      actions.push(
        <div onClick={toggleLike}>
          <Badge
            key="like"
            count={item.likes.length}
            overflowCount={9}
            size="small"
            offset={[item.likes.length > 9 ? 15 : 5, 0]}
            style={{ backgroundColor: "#1890ff" }}
          >
            <Tooltip title={getLikeToolTip()}>
              <FiThumbsUp />
            </Tooltip>
          </Badge>
        </div>
      );
    }
    if (!viewMode && isAuthor) {
      actions.push(
        <Tooltip title="Delete">
          <DeleteFilled
            key="delete"
            style={{ color: "red" }}
            onClick={() => {
              if (!viewMode) {
                removeItem();
              }
            }}
          />
        </Tooltip>
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
        {viewMode ? (
          <Hoverable>
            <Tooltip title="Show content">
              <EyeInvisibleFilled
                onClick={() => {
                  if (viewMode) {
                    showItem();
                  }
                }}
              />
            </Tooltip>
          </Hoverable>
        ) : (
          <EyeInvisibleFilled style={{ color: "grey" }} />
        )}
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
