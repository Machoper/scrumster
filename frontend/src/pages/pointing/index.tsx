import _ from 'lodash'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client'
import { Col, message, Row } from 'antd'
import { actionCreators } from './store'
import RoomForm from '../../common/forms/RoomForm'
import FormModal from '../../common/modal/FormModal'
import { UserPane, PrimaryPane } from './components'
import { useParams } from 'react-router-dom'
import { RoomFormType } from '../../common/forms/RoomFormType.enum'
import Lobby from '../../common/lobby'


export type Vote = number | string | undefined

const Pointing = () => {

    const { roomId } = useParams<{ roomId: string }>()

    const [visible, setVisible] = useState(!!roomId)
    const [formType, setFormType] = useState(RoomFormType.JOIN_ROOM_AUTO)

    const socket = useRef<Socket>()

    const { currentUser } = useSelector((state: any) => ({
        currentUser: state.getIn(['pointing', 'currentUser']).toJS()
    }))

    const dispatch = useDispatch()

    const joinRoom = (values: any) => {
        const rid = formType === RoomFormType.CREATE_ROOM ? undefined : values.roomId || roomId
        socket.current?.emit('join', { ...values, roomId: rid })
    }
    const changeUserType = (type: string) => {
        socket.current?.emit('change_user_type', type)
        dispatch(actionCreators.updateCurrentUser({ ...currentUser, type }))
    }
    const vote = (vote: Vote) => {
        if (currentUser.type == 'player') {
            socket.current?.emit('vote', vote)
        }
    }

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_API_ENDPOINT!, {
            transports: ['websocket'],
            path: '/pointing'
        })
        socket.current?.on('refresh', (data: any) => {
            dispatch(actionCreators.updateRoom(data))
        }).on('joined', ({ user, room }: any) => {
            dispatch(actionCreators.updateCurrentUser(user))
            dispatch(actionCreators.setRoomInfo(room))
            window.history.replaceState(null, '', `/pointing/${room.id}`)
        }).on('error', (msg: string) => message.error(msg))
        // if (!_.isEmpty(currentUser)) {
        // 	socket.current?.emit('join', {...currentUser})
        // }
        return () => {
            socket.current?.disconnect()
            dispatch(actionCreators.cleanUp())
        }
    }, [])

    return (
        <Fragment>
            {currentUser.id ? (
                <Row gutter={32}>
                    <Col span={6}>
                        <UserPane
                            changeUserType={changeUserType}
                        />
                    </Col>
                    <Col span={18}>
                        <PrimaryPane
                            clearVotes={() => socket.current?.emit('clear_votes')}
                            vote={value => vote(value)}
                        />
                    </Col>
                </Row>
            ) : (
                    <Lobby
                        onCreateRoom={() => {
                            setFormType(RoomFormType.CREATE_ROOM)
                            setVisible(true)
                        }}
                        onJoinRoom={() => {
                            setFormType(RoomFormType.JOIN_ROOM)
                            setVisible(true)
                        }}
                    />
                )}
            <FormModal
                title='Join Pointing Room'
                visible={visible}
                onSubmit={values => {
                    joinRoom(values)
                    setVisible(false)
                }}
                onCancel={() => setVisible(false)}
                getContent={() => <RoomForm formType={formType} />}
                initialValues={{ userType: 'player' }}
            />
        </Fragment>
    )

}

export default Pointing