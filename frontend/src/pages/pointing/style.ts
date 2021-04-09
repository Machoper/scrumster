import styled from "styled-components";
import { Card } from "antd";

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
