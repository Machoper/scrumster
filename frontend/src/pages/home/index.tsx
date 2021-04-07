import React from "react";
import Title from "antd/lib/typography/Title";

const Home: React.FC = () => {
  return (
    <div className="align-center-flex container">
      <Title style={{fontSize: 60}} className="animate__animated animate__fadeInDown">Welcome to Murcs</Title>
    </div>
  );
};

export default Home;
