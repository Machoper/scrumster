import styled from "styled-components";
import logoPic from "../../static/logo.png";

export const Logo = styled.div`
  display: block;
  float: left;
  width: 158px;
  height: 50px;
  margin: 4px 24px 10px 0;
  background: url(${logoPic});
  background-size: contain;
  background-repeat: no-repeat;
`;
export const UserMenu = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 64px;
  margin-right: 80px;
  cursor: pointer;
`;
