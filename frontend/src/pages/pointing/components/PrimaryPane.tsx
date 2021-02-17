import _ from 'lodash'
import { Button, Divider, Space, Table } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import Cards from '../constants/cards'
import { PointingCard } from '../style'

interface IProps {
    clearVotes: () => void
    vote: (value: number) => void
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
    clearVotes,
    vote
}) => {

    const [showVotes, setShowVotes] = useState(false)

    const { players, currentUser } = useSelector((state: any) => ({
        players: state.getIn(['pointing', 'players']).toJS(),
        currentUser: state.getIn(['pointing', 'currentUser']).toJS()
    }))

    const getResult = () => {
        return _.chain(players)
            .map(player => player.vote)
            .filter(vote => !!vote)
            .countBy()
            .map((count, points) => ({ key: '' + points, points, count }))
            .value()
    }

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
        if (currentUser.type == 'player' && !showVotes) {
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
        return (<Table pagination={false} columns={columns} dataSource={getResult()}></Table>)
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