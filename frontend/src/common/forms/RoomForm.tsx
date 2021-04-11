import { Form, Input, Radio } from 'antd'
import React, { Fragment } from 'react'
import { RoomFormType } from './RoomFormType.enum'

interface IProps {
    formType?: RoomFormType
}

const JoinRoomForm: React.FC<IProps> = ({
    formType = RoomFormType.JOIN_ROOM_AUTO
}) => {

    return (
        <Fragment>
            {formType === RoomFormType.JOIN_ROOM &&
                <Form.Item
                    label="Room ID"
                    name="roomId"
                    rules={[{ required: true, message: 'Please input room ID!' }]}
                >
                    <Input />
                </Form.Item>
            }
            {formType === RoomFormType.CREATE_ROOM &&
                <Form.Item
                    label="Room Name"
                    name="roomName"
                    rules={[{ required: true, message: 'Please input room name!' }]}
                >
                    <Input />
                </Form.Item>
            }
            {/* {formType !== RoomFormType.ENTER_ROOM_ID && */}
                <Fragment>
                    <Form.Item
                        label="Your Name"
                        name="userName"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="userType" style={{ margin: 0 }}>
                        <Radio.Group>
                            <Radio value="player">Player</Radio>
                            <Radio value="observer">Observer</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Fragment>
            {/* } */}
        </Fragment>
    )
}

export default JoinRoomForm