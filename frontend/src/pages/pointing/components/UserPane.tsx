import { CheckCircleFilled, LinkOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Divider, List, message, PageHeader, Space } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { Fragment } from 'react'
import { ParticipantList, RadioButton, RadioGroup } from '../style'


interface IProps {
    currentUser: any
    changeUserType: (type: string) => void
    observers: any
    players: any
}

const UserPane: React.FC<IProps> = ({
    currentUser,
    changeUserType,
    observers,
    players
}) => {

    return (
        <Fragment>
            <PageHeader
                className="site-page-header"
                title={currentUser.roomName}
                subTitle={
                    <Button
                        type='link' 
                        icon={<LinkOutlined />} 
                        onClick={() => message.success('Room link copied')} 
                    />
                }
            />
            <RadioGroup defaultValue={currentUser.type} buttonStyle="solid" size="large">
                <RadioButton
                    value="observer"
                    onClick={() => { changeUserType('observer') }}
                >Observer
                </RadioButton>
                <RadioButton
                    value="player"
                    onClick={() => { changeUserType('player') }}
                >Player
                </RadioButton>
            </RadioGroup>
            <Divider />
            <Space direction='vertical' style={{ width: '100%' }}>
                <ParticipantList
                    size="large"
                    header={<Title level={4}>Observers</Title>}
                    bordered
                    locale={{ emptyText: ' ' }}
                    dataSource={observers.toJS()}
                    renderItem={(observer: any) =>
                        <List.Item className='align-center-flex'>{observer.name}</List.Item>
                    }
                />
                <ParticipantList
                    size="large"
                    header={<Title level={4}>Players</Title>}
                    bordered
                    locale={{ emptyText: ' ' }}
                    dataSource={players.toJS()}
                    renderItem={(player: any) =>
                        <List.Item className='align-center-flex'>
                            <Space>
                                <span>{player.name}</span>
                                {player.vote ? <CheckCircleFilled /> : <LoadingOutlined />}
                            </Space>
                        </List.Item>
                    }
                />
            </Space>
        </Fragment>
    )
}

export default UserPane