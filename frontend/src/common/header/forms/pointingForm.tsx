import { Form, FormInstance, Input } from 'antd'
import React, { Fragment } from 'react'

const PointingForm = () => {
    
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
        </Fragment>
    )
}

export default PointingForm