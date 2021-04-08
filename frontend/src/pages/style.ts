import styled from "styled-components";
import { Card, List, Radio } from "antd";

export const ParticipantList: typeof List = styled(List)`
  background: white;
  text-align: center;
`;
export const RadioGroup = styled(Radio.Group)`
  width: 100%;
  text-align: center;
`;
export const RadioButton: typeof Radio.Button = styled(Radio.Button)`
  width: 50%;
`;

export const RoomInfo: typeof Card = styled(Card)`
  background-color: transparent;
  box-shadow: 0px 0px 5px 2px #78797b;
  border-radius: 10px;
`;

export const PaneContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
