import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client'
import { Button, Col, Divider, List, Row, Space } from 'antd'
import Title from 'antd/lib/typography/Title'
import { PointingCard, ParticipantList, RadioGroup, RadioButton } from './style'
import { actionCreators } from './store'
import Cards from './constants/cards'
import PointingForm from '../../common/header/forms/pointingForm'
import FormModal from '../../common/modal/FormModal'
import { CheckCircleFilled, LoadingOutlined } from '@ant-design/icons'


const ENDPOINT = 'http://localhost:4001'

const Pointing = () => {

    const [visible, setVisible] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const socket = useRef<Socket>()

    const { observers, players } = useSelector((state: any) => ({
        players: state.getIn(['pointing', 'players']),
        observers: state.getIn(['pointing', 'observers'])
    }))
    const dispatch = useDispatch()

    const joinRoom = (values: any) => socket.current?.emit('join', {
        roomId: values.roomId,
        userId: '1',
        userName: values.userName,
        userType: 'player'
    })
    const changeUserType = (type: string) => socket.current?.emit('change_user_type', type)
    const vote = (vote: number) => socket.current?.emit('vote', vote)

    useEffect(() => {
        socket.current = io(ENDPOINT, {
            transports: ['websocket'],
            path: '/pointing'
        })
        socket.current?.on('refresh', (data: any) => {
            dispatch(actionCreators.setUsers(data))
        })
        return () => { socket.current?.disconnect() }
    }, [])

    return (
        <Fragment>
            {loaded ? (
                <Row>
                    <Col span={6} offset={1}>
                        <RadioGroup defaultValue='player' buttonStyle="solid" size="large">
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
                    </Col>
                    <Col span={16} offset={1}>
                        <Space size={[16, 16]} wrap>
                            {Cards.map(card => (
                                <PointingCard
                                    key={card.id}
                                    hoverable
                                    bordered={false}
                                    className='align-center-flex'
                                    onClick={() => {vote(card.value)}}
                                >
                                    <Title>{card.name}</Title>
                                </PointingCard>
                            ))}
                        </Space>
                    </Col>
                </Row>
            ) : (
                <Button 
                    type='primary' 
                    onClick={() => { setVisible(true) }}
                >Join Room
                </Button>
            )}
            <FormModal
                visible={visible}
                onSubmit={values => {
                    joinRoom(values)
                    setVisible(false)
                    setLoaded(true)
                }}
                onCancel={() => setVisible(false)}
                getContent={() => <PointingForm />}
            />
        </Fragment>
    )

}

export default Pointing