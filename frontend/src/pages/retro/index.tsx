import React, { Fragment, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import _ from 'lodash'
import { Button, Col, Row } from 'antd'
import JoinRoomForm from '../../common/forms/JoinRoomForm'
import FormModal from '../../common/modal/FormModal'
import UserPane from './components/UserPane'
import PrimaryPane from './components/PrimaryPane'


const Retro = () => {

    const [visible, setVisible] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState([])
	const [currentUser, setCurrentUser] = useState<any>({})
    const [items, setItems] = useState([])

    const socket = useRef<Socket>()

    const joinRoom = (values: any) => {
        const { roomId, userName, userType } = values
        setCurrentUser({ ...currentUser, name: userName, type: userType, roomName: roomId })
        socket.current?.emit('join', {
            roomId: roomId,
            userName: userName,
            userType: userType
        })
	}

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_API_ENDPOINT!, {
            transports: ['websocket'],
            path: '/retro'
        })
        socket.current?.on('refresh', (data: any) => {
			setUsers(data.users)
            setItems(data.items)
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
							users={users}
                        />
                    </Col>
                    <Col span={18}>
						<PrimaryPane
							items={items} 
							addItem={item => socket.current?.emit('item:add', item)}
							removeItem={itemId => socket.current?.emit('item:remove', itemId)}
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
                title='Join Retro Room'
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

export default Retro