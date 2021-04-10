import React from "react";
import Title from "antd/lib/typography/Title";

const Home: React.FC = () => {
  return (
    <div
      className="align-center-flex container"
      style={{ flexDirection: "column" }}
    >
      <div>
        <Title
          style={{ fontSize: 60 }}
          className="animate__animated animate__fadeInDown"
        >
          Welcome to Scrumster
        </Title>
      </div>
      <Title
        style={{ fontSize: 20, color: "grey" }}
        className="animate__animated animate__fadeInUp"
      >
        An interactive tool for agile Scrum ceremonies
      </Title>
    </div>
  );
};

export default Home;
