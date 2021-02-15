import { Row, Col, Divider } from 'antd'
import Title from 'antd/lib/typography/Title'
import _ from 'lodash'
import React from 'react'
import RetroLane from './RetroLane'


interface IProps {
    items: any[]
    addItem: (item: any) => void
    removeItem: (itemId: string) => void
}

const LANES = [
    {
        title: 'Start doing',
        type: 'start'
    },
    {
        title: 'Stop doing',
        type: 'stop'
    },
    {
        title: 'Continue doing',
        type: 'continue'
    }
]

const PrimaryPane: React.FC<IProps> = ({
    items,
    addItem,
    removeItem
}) => {

    const getItemsByType = (type: string) => {
        return _.filter(items, { type })
    }

    return (
        <Row gutter={16}>
            {LANES.map(lane => 
                <Col key={lane.type} span={8}>
                    <Title level={2} className='align-center-flex' style={{borderBottom: '1px solid grey'}}>{lane.title}</Title>
                    <RetroLane 
                        type={lane.type}
                        items={getItemsByType(lane.type)}
                        addItem={addItem}
                        removeItem={removeItem}
                    />
                </Col>
            )}
        </Row>
    )
}

export default PrimaryPane