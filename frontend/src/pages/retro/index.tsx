import React, { Fragment, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import _ from 'lodash'
import { Col, message, Row } from 'antd'
import RoomForm from '../../common/forms/RoomForm'
import FormModal from '../../common/modal/FormModal'
import UserPane from './components/UserPane'
import PrimaryPane from './components/PrimaryPane'
import { RoomFormType } from '../../common/forms/RoomFormType.enum'
import Lobby from '../../common/lobby'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { actionCreators } from './store'


const Retro = () => {

    const { roomId } = useParams<{ roomId: string }>()

    const [visible, setVisible] = useState(!!roomId)
    const [formType, setFormType] = useState(RoomFormType.JOIN_ROOM_AUTO)

    const [users, setUsers] = useState([])
    const [items, setItems] = useState([])

    const socket = useRef<Socket>()

    const { currentUser } = useSelector((state: any) => ({
        currentUser: state.getIn(['retro', 'currentUser']).toJS()
    }))

    const dispatch = useDispatch()

    const joinRoom = (values: any) => {
        const rid = formType === RoomFormType.CREATE_ROOM ? undefined : values.roomId || roomId
        socket.current?.emit('join', { ...values, roomId: rid })
    }

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_API_ENDPOINT!, {
            transports: ['websocket', 'polling'],
            path: '/socket/retro'
        })
        socket.current?.on('refresh', (data: any) => {
            setUsers(data.users)
            setItems(data.items)
            dispatch(actionCreators.setViewMode(data.viewMode))
        }).on('joined', ({ user, room }: any) => {
            dispatch(actionCreators.updateCurrentUser(user))
            dispatch(actionCreators.setRoomInfo(room))
            window.history.replaceState(null, '', `/retro/${room.id}`)
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
                <Row gutter={32} className="animate__animated animate__fadeIn">
                    <Col span={6}>
                        <UserPane
                            users={users}
                            toggleViewMode={viewMode => socket.current?.emit('toggle_view_mode', viewMode)}
                        />
                    </Col>
                    <Col span={18}>
						<PrimaryPane
							items={items} 
							addItem={item => socket.current?.emit('item:add', item)}
                            removeItem={itemId => socket.current?.emit('item:remove', itemId)}
                            toggleLike={itemId => socket.current?.emit('item:toggle_like', itemId)}
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
                title='Join Retrospective Room'
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

export default Retro