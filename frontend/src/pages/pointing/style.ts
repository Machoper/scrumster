import styled from "styled-components";
import { Card } from "antd";

export const PointingContainer = styled.div`
  display: flex;
  flex: auto;
`;

export const UserPaneContainer = styled.div`
  flex: 1 1 0;
  margin-right: 16px;
`;

export const PrimaryPaneContainer = styled.div`
  flex: 3 3 0;
  display: flex;
  flex-direction: column;
`;

export const PointingCard: typeof Card = styled(Card)`
  flex: 0 0 150px;
  height: 230px;
  margin: 16px;
  border: 1px solid #888;
  border-radius: 16px;
`;

export const PointingCardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const InProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: auto;
`;
