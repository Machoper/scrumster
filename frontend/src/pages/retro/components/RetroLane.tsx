import React, { Fragment, useState } from "react";
import { Comment } from "antd";
import RetroEditor from "./RetroEditor";
import RetroItemList from "./RetroItemList";
import { useSelector } from "react-redux";

interface IProps {
  type: string;
  items: any[];
}

const RetroLane: React.FC<IProps> = ({ type, items }) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const { socket, viewMode } = useSelector((state: any) => ({
    socket: state.getIn(["retro", "socket"]).toJS(),
    viewMode: state.getIn(["retro", "viewMode"])
  }));

  const addItem = (newItem: any) => socket.current?.emit('item:add', newItem);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      addItem({
        type,
        content: value
      });
    });
  };

  return (
    <Fragment>
      {!viewMode && (
        <Comment
          content={
            <RetroEditor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      )}
      {items.length > 0 && <RetroItemList items={items} />}
    </Fragment>
  );
};

export default RetroLane;
