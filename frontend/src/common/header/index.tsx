import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Avatar, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import {
    HeaderWrapper, Logo, UserMenu
} from './style'
import { actionCreators } from './store'


interface IHeaderProps {
    selectedMenuKeys: string[]
    setSelectedMenuKeys: (keys: string[]) => void
}

class MurcsHeader extends PureComponent<IHeaderProps> {

    render() {
        const { selectedMenuKeys, setSelectedMenuKeys } = this.props
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
    selectedMenuKeys: state.getIn(['header', 'selectedMenuKeys'])
})

const mapDispatchToProps = (dispatch: any) => ({
    setSelectedMenuKeys: (keys: string[]) => {
        dispatch(actionCreators.setSelectedMenuKeys(keys))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MurcsHeader)