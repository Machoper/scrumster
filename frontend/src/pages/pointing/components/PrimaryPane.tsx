import { Button, Divider, Space, Table } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { Fragment, useState } from 'react'
import Cards from '../constants/cards'
import { PointingCard } from '../style'

interface IProps {
    userType: string
    clearVotes: () => void
    vote: (value: number) => void
    data: any[]
}

const columns = [
    {
        title: 'Points',
        dataIndex: 'points',
    },
    {
        title: 'Count',
        dataIndex: 'count',
    }
]

const PrimaryPane: React.FC<IProps> = ({
    userType,
    clearVotes,
    vote,
    data
}) => {

    const [showVotes, setShowVotes] = useState(false)

    const getActionItems = () => {
        return (
            <Space size='large' className='align-center-flex'>
                <Button
                    type='primary'
                    shape='round'
                    size='large'
                    onClick={() => {
                        clearVotes()
                        setShowVotes(false)
                    }}>Clear Votes
                </Button>
                <Button
                    type='primary'
                    shape='round'
                    size='large'
                    onClick={() => { setShowVotes(true) }}>Show Votes
                </Button>
            </Space>
        )
    }

    const getContent = () => {
        if (userType == 'player' && !showVotes) {
            return (
                <Space size={[16, 16]} wrap>
                    {Cards.map(card => (
                        <PointingCard
                            key={card.id}
                            hoverable
                            bordered={false}
                            className='align-center-flex'
                            onClick={() => { vote(card.value) }}
                        >
                            <Title>{card.name}</Title>
                        </PointingCard>
                    ))}
                </Space>
            )
        }
        return (<Table pagination={false} columns={columns} dataSource={data}></Table>)
    }

    return (
        <Fragment>
            {getActionItems()}
            <Divider />
            {getContent()}
        </Fragment>
    )
}

export default PrimaryPane