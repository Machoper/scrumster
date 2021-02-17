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
    const socket = useRef<Socket>()

    const currentUser = useSelector((state: any) => 
        state.getIn(['pointing', 'currentUser']).toJS()
    )

    const dispatch = useDispatch()

    const joinRoom = (values: any) => {
        socket.current?.emit('join', { ...values })
    }
    const changeUserType = (type: string) => {
        socket.current?.emit('change_user_type', type)
        dispatch(actionCreators.updateCurrentUser({ ...currentUser, type }))
    }
    const vote = (vote: number) => {
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
        }).on('joined', ({user, room}: any) => {
            dispatch(actionCreators.updateCurrentUser(user))
            dispatch(actionCreators.setRoomInfo(room))
        })
        if (!_.isEmpty(currentUser)) {
			socket.current?.emit('join', {...currentUser})
		}
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
                }}
                onCancel={() => setVisible(false)}
                getContent={() => <JoinRoomForm />}
                initialValues={{ userType: 'player' }}
            />
        </Fragment>
    )

}

export default Pointing