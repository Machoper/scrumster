import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { HeaderWrapper, Logo, UserMenu } from "./style";
import { LogoutMutationFn, MeQuery, useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { ApolloClient } from "@apollo/react-hooks";
import { setAccessToken } from "../../client";

const getUserMenu = (client: ApolloClient<any>, logout: LogoutMutationFn, data?: MeQuery) => {
  const email = data?.me?.email;
  const actionText = email ? "Log out" : "Log in";
  const onClick = email ? async () => {
    await logout(); 
    setAccessToken("");
    await client.resetStore();
  } : () => {}
  return (
  <Menu style={{ textAlign: "center" }}>
    <Menu.ItemGroup key="g1" title={email || "User"}>
      <Menu.Divider />
      <Menu.Item key="userMenu1">Profile</Menu.Item>
      <Menu.Item key="userMenu2">Settings</Menu.Item>
    </Menu.ItemGroup>
    <Menu.Divider />
    <Menu.Item key="userMenu3">
      <Link to="/login" onClick={onClick}>{actionText}</Link>
    </Menu.Item>
  </Menu>
  );
}

const MyHeader = () => {
  const [selectedMenuKeys, setSelectedMenuKeys] = useState<string[]>([]);

  const { client, data } = useMeQuery();
  const [logout] = useLogoutMutation();

  return (
    <HeaderWrapper>
      <Link to="/">
        <Logo onClick={() => setSelectedMenuKeys([])} />
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ background: "#000" }}
        selectedKeys={selectedMenuKeys}
      >
        <Menu.Item
          key="pointing"
          onClick={() => setSelectedMenuKeys(["pointing"])}
        >
          <Link to="/pointing">Pointing</Link>
        </Menu.Item>
        <Menu.Item key="retro" onClick={() => setSelectedMenuKeys(["retro"])}>
          <Link to="/retro">Retro</Link>
        </Menu.Item>
      </Menu>
      <UserMenu>
        <Dropdown
          overlay={getUserMenu(client, logout, data)}
          trigger={["click"]}
          placement="bottomCenter"
          arrow
        >
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </UserMenu>
    </HeaderWrapper>
  );
};

export default MyHeader;
