import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Avatar, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import {
    HeaderWrapper, Logo, UserMenu
} from './style'


const getUserMenu = () => (
    <Menu style={{ textAlign: 'center' }}>
        <Menu.ItemGroup key="g1" title="User">
            <Menu.Divider />
            <Menu.Item key="userMenu1">
                Profile
        </Menu.Item>
            <Menu.Item key="userMenu2">
                Settings
        </Menu.Item>
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.Item key="userMenu3">Login</Menu.Item>
    </Menu>
)

const MurcsHeader = () => {

    const [selectedMenuKeys, setSelectedMenuKeys] = useState<string[]>([])

    return (
        <HeaderWrapper>
            <Link to='/'>
                <Logo onClick={() => setSelectedMenuKeys([])} />
            </Link>
            <Menu theme='dark' mode="horizontal" style={{ background: '#000' }} selectedKeys={selectedMenuKeys}>
                <Menu.Item key="pointing" onClick={() => setSelectedMenuKeys(['pointing'])}>
                    <Link to='/pointing'>Pointing</Link>
                </Menu.Item>
                <Menu.Item key="retro" onClick={() => setSelectedMenuKeys(['retro'])}>
                    <Link to='/retro'>Retro</Link>
                </Menu.Item>
            </Menu>
            <UserMenu>
                <Dropdown
                    overlay={getUserMenu()}
                    trigger={['click']}
                    placement="bottomCenter"
                    arrow
                >
                    <Avatar icon={<UserOutlined />} />
                </Dropdown>
            </UserMenu>
        </HeaderWrapper>
    )

}

export default MurcsHeader