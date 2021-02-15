import { Form, Input, Radio } from 'antd'
import React, { Fragment } from 'react'

const JoinRoomForm = () => {

    return (
        <Fragment>
            <Form.Item
                label="Room Name"
                name="roomId"
                rules={[{ required: true, message: 'Please input room name!' }]}
            >
                <Input />
            </Form.Item>
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
    )
}

export default JoinRoomForm