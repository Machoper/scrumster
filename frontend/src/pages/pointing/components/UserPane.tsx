import { CheckCircleFilled, LinkOutlined, LoadingOutlined } from '@ant-design/icons'
import { Badge, Button, Collapse, Divider, List, message, PageHeader, Space } from 'antd'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { ParticipantList, RadioButton, RadioGroup } from '../../style'


interface IProps {
    changeUserType: (type: string) => void
}

const UserPane: React.FC<IProps> = ({
    changeUserType
}) => {

    const { roomName, observers, players, currentUser } = useSelector((state: any) => ({
        roomName: state.getIn(['pointing', 'roomName']),
        players: state.getIn(['pointing', 'players']).toJS(),
        observers: state.getIn(['pointing', 'observers']).toJS(),
        currentUser: state.getIn(['pointing', 'currentUser']).toJS()
    }))

    return (
        <Fragment>
            <PageHeader
                title={roomName}
                subTitle={
                    <Button
                        type='link'
                        icon={<LinkOutlined />}
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            message.success('Room link copied')
                        }}
                    />
                }
            />
            <RadioGroup defaultValue={currentUser.type} buttonStyle='solid'>
                <RadioButton
                    value="observer"
                    checked={currentUser.type === 'observer'}
                    onClick={() => { changeUserType('observer') }}
                >Observer
                </RadioButton>
                <RadioButton
                    value="player"
                    checked={currentUser.type === 'player'}
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
                        dataSource={observers}
                        renderItem={(observer: any) =>
                            <List.Item className='align-center-flex'>{observer.name}</List.Item>
                        }
                    />
                </Collapse.Panel>
                <Collapse.Panel header='Players' key='players'>
                    <ParticipantList
                        size="small"
                        locale={{ emptyText: ' ' }}
                        dataSource={players}
                        renderItem={(player: any) => {
                            const isCurrentUser = player.id === currentUser.id
                            return <List.Item className='align-center-flex'>
                                <Space>
                                    {isCurrentUser 
                                        ? <b>{player.name}</b> 
                                        : <span>{player.name}</span>
                                    }
                                    {player.vote
                                        ? isCurrentUser
                                            ? <Badge
                                                count={player.vote}
                                                overflowCount={100}
                                                style={{ backgroundColor: 'black' }}
                                            />
                                            : <CheckCircleFilled />
                                        : null
                                    }
                                </Space>
                            </List.Item>
                        }}
                    />
                </Collapse.Panel>
            </Collapse>
        </Fragment>
    )
}

export default UserPane