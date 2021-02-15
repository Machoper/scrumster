import { CheckCircleFilled, LinkOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Collapse, Divider, List, message, PageHeader, Space } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { Fragment } from 'react'
import { ParticipantList, RadioButton, RadioGroup } from '../../style'


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
            <RadioGroup defaultValue={currentUser.type} buttonStyle='solid'>
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
            <Collapse defaultActiveKey={['observers', 'players']}>
                <Collapse.Panel header='Observers' key='observers'>
                    <ParticipantList
                        size="small"
                        locale={{ emptyText: ' ' }}
                        dataSource={observers.toJS()}
                        renderItem={(observer: any) =>
                            <List.Item className='align-center-flex'>{observer.name}</List.Item>
                        }
                    />
                </Collapse.Panel>
                <Collapse.Panel header='Players' key='players'>
                    <ParticipantList
                        size="small"
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
                </Collapse.Panel>
            </Collapse>
        </Fragment>
    )
}

export default UserPane