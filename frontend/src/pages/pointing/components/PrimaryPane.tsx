import _ from "lodash";
import { Button, Divider, Progress, Space, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../constants/cards";
import {
  InProgressContainer,
  PointingCard,
  PointingCardContainer
} from "../style";
import PointingResult from "./PointingResult";
import {
  ClearOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { actionCreators } from "../store";
import { Vote } from "../constants/vote";

interface IProps {}

const PrimaryPane: React.FC<IProps> = ({}) => {
  const [showVotes, setShowVotes] = useState(false);

  const { socket, players, currentUser } = useSelector((state: any) => ({
    socket: state.getIn(["pointing", "socket"]).toJS(),
    players: state.getIn(["pointing", "players"]).toJS(),
    currentUser: state.getIn(["pointing", "currentUser"]).toJS()
  }));

  const dispatch = useDispatch();

  // socket methods
  const vote = (vote: Vote) => {
    if (currentUser.type == "player") {
      socket.current?.emit('vote', vote);
      dispatch(actionCreators.updateCurrentUser({ ...currentUser, vote }));
    }
  };
  const clearVotes = () => socket.current?.emit('clear_votes');

  // helper methods
  const isAllVoted = () => {
    return !_.some(players, player => !player.vote);
  };
  const getVotedPercent = (): number => {
    if (_.isEmpty(players)) {
      return 0;
    }
    const voted = _.filter(players, player => !!player.vote);
    return Math.round((voted.length / players.length) * 100);
  };
  const getPlayerActionItems = () => {
    return (
      <Space size="large" className="align-center-flex">
        <Title style={{ marginBottom: 0 }}>Your vote: {currentUser.vote}</Title>
        <Button.Group size="large">
          <Button
            onClick={() => {
              const idx = _.findIndex(
                Cards,
                card => card.value === currentUser.vote
              );
              if (idx > 0) {
                vote(Cards[idx - 1].value);
              }
            }}
          >
            <MinusOutlined />
          </Button>
          <Button
            onClick={() => {
              const idx = _.findIndex(
                Cards,
                card => card.value === currentUser.vote
              );
              if (idx < Cards.length - 1) {
                vote(Cards[idx + 1].value);
              }
            }}
          >
            <PlusOutlined />
          </Button>
        </Button.Group>
      </Space>
    );
  };
  const getObserverActionItems = () => {
    return (
      <Space size="large" className="align-center-flex">
        <Button
          shape="round"
          size="large"
          onClick={() => {
            clearVotes();
            setShowVotes(false);
          }}
        >
          <ClearOutlined />
          Clear Votes
        </Button>
        <Button
          shape="round"
          size="large"
          onClick={() => {
            setShowVotes(!showVotes);
          }}
        >
          {showVotes ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          {showVotes ? "Hide Votes" : "Show Votes"}
        </Button>
      </Space>
    );
  };

  if (currentUser.type === "player") {
    return (
      <div>
        {isAllVoted() ? (
          <div className="animate__animated animate__fadeIn">
            {getPlayerActionItems()}
            <Divider />
            <PointingResult />
          </div>
        ) : (
          <PointingCardContainer className="animate__animated animate__fadeIn">
            {Cards.map(card => (
              <PointingCard
                key={card.id}
                hoverable
                bordered={false}
                className="align-center-flex"
                onClick={() => {
                  vote(card.value);
                }}
              >
                <Title>{card.name}</Title>
              </PointingCard>
            ))}
          </PointingCardContainer>
        )}
      </div>
    );
  } else {
    return (
      <Fragment>
        {getObserverActionItems()}
        <Divider />
        {isAllVoted() || showVotes ? (
          <PointingResult />
        ) : (
          <InProgressContainer className="animate__animated animate__fadeIn">
            <Progress
              type="circle"
              trailColor="grey"
              percent={getVotedPercent()}
            />
            <Title style={{ marginTop: 30 }}>
              Voting in progress <Spin size="large" />
            </Title>
          </InProgressContainer>
        )}
      </Fragment>
    );
  }
};

export default PrimaryPane;
