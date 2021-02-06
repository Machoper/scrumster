import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Avatar, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import {
    HeaderWrapper, Logo, UserMenu
} from './style'


class MurcsHeader extends Component {

    render() {
        return (
            <HeaderWrapper>
                <Link to='/'>
                    <Logo />
                </Link>
                <Menu theme='dark' mode="horizontal" style={{ background: '#000' }}>
                    <Menu.Item key="pointing">
                        <Link to='/pointing'>Pointing</Link>
                    </Menu.Item>
                    <Menu.Item key="retro">
                        <Link to='/retro'>Retro</Link>
                    </Menu.Item>
                </Menu>
                <UserMenu>
                    <Dropdown
                        overlay={this.getUserMenu()}
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

    getUserMenu = () => (
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

}

const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MurcsHeader)