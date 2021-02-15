import _ from 'lodash'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client'
import { Button, Col, Row } from 'antd'
import { actionCreators } from './store'
import JoinRoomForm from '../../common/forms/JoinRoomForm'
import FormModal from '../../common/modal/FormModal'
import { UserPane, PrimaryPane } from './components'


const Pointing = () => {

    const [visible, setVisible] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [currentUser, setCurrentUser] = useState<any>({})
    const socket = useRef<Socket>()

    const { observers, players } = useSelector((state: any) => ({
        players: state.getIn(['pointing', 'players']),
        observers: state.getIn(['pointing', 'observers'])
    }))
    const dispatch = useDispatch()

    const joinRoom = (values: any) => {
        const { roomId, userName, userType } = values
        setCurrentUser({ ...currentUser, name: userName, type: userType, roomName: roomId })
        socket.current?.emit('join', {
            roomId: roomId,
            userName: userName,
            userType: userType
        })
    }
    const changeUserType = (type: string) => {
        setCurrentUser({ ...currentUser, type })
        socket.current?.emit('change_user_type', type)
    }
    const vote = (vote: number) => {
        if (currentUser.type == 'player') {
            socket.current?.emit('vote', vote)
        }
    }

    const getResult = () => {
        const playerList = players.toJS()
        return _.chain(playerList)
            .map(player => player.vote)
            .filter(vote => !!vote)
            .countBy()
            .map((count, points) => ({ key: '' + points, points, count }))
            .value()
    }

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_API_ENDPOINT!, {
            transports: ['websocket'],
            path: '/pointing'
        })
        socket.current?.on('refresh', (data: any) => {
            dispatch(actionCreators.setUsers(data))
        })
        if (!_.isEmpty(currentUser)) {
			socket.current?.emit('join', {...currentUser})
		}
        return () => { socket.current?.disconnect() }
    }, [])

    return (
        <Fragment>
            {loaded ? (
                <Row gutter={32}>
                    <Col span={6}>
                        <UserPane
                            currentUser={currentUser}
                            changeUserType={changeUserType}
                            observers={observers}
                            players={players}
                        />
                    </Col>
                    <Col span={18}>
                        <PrimaryPane
                            userType={currentUser.type}
                            clearVotes={() => socket.current?.emit('clear_votes')}
                            vote={value => vote(value)}
                            data={getResult()}
                        />
                    </Col>
                </Row>
            ) : (
                    <div className='align-center-flex'>
                        <Button
                            type='primary'
                            shape='round'
                            size='large'
                            onClick={() => { setVisible(true) }}>Join Room
                        </Button>
                    </div>

                )}
            <FormModal
                title='Join Pointing Room'
                visible={visible}
                onSubmit={values => {
                    joinRoom(values)
                    setVisible(false)
                    setLoaded(true)
                }}
                onCancel={() => setVisible(false)}
                getContent={() => <JoinRoomForm />}
                initialValues={{ userType: 'player' }}
            />
        </Fragment>
    )

}

export default Pointing