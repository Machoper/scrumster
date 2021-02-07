import React, { Component } from 'react'
import { Card, Col, List, Row, Space, Typography } from 'antd'
import { PointingCard, ParticipantList } from './style'


const fakeParticipants = ['player1', 'player2', 'player3', 'player4', 'player5']

class Pointing extends Component {
    render() {
        return (
            <Row>
                <Col span={6} offset={1}>
                    <ParticipantList
                        size="large"
                        header={<Typography.Title level={2}>Participants</Typography.Title>}
                        bordered
                        dataSource={fakeParticipants}
                        renderItem={player => <List.Item className='align-center-flex'>{player}</List.Item>}
                    />
                </Col>
                <Col span={16} offset={1}>
                    <Space size={[16, 16]} wrap>
                        {new Array(8).fill(null).map((_, index) => (
                            <PointingCard 
                                key={index} 
                                hoverable 
                                bordered={false} 
                                className='align-center-flex'
                            >
                                <Typography.Title>{index+1}</Typography.Title>
                            </PointingCard>
                        ))}
                    </Space>
                </Col>
            </Row>
        )
    }
}

export default Pointing