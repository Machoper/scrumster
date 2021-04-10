import styled from "styled-components";
import logoPic from "../../static/logo.png";

export const HeaderWrapper = styled.div`
  text-color: #fff;
`;
export const Logo = styled.div`
  display: block;
  float: left;
  width: 176px;
  height: 56px;
  margin-top: 4px;
  margin-right: 8px;
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
