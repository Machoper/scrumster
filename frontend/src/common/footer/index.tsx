import { Drawer } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { useState } from "react";

const MurcsyFooter: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div>
        ©2021 Created by <a onClick={() => setVisible(true)}>Yixuan Qian</a>
      </div>
      <Drawer
        title="Contact"
        placement="bottom"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Paragraph copyable={{ text: "qianyixuaneric@gmail.com" }}>
          <b>Email</b>: qianyixuaneric@gmail.com
        </Paragraph>
        <Paragraph>
          <b>GitHub</b>:{" "}
          <a href="https://github.com/Machoper/" target="_blank">
            github.com/Machoper
          </a>
        </Paragraph>
      </Drawer>
    </div>
  );
};

export default MurcsyFooter;
