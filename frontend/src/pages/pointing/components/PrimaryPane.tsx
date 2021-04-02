import _ from 'lodash'
import { Button, Divider, Progress, Space, Table } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import Cards from '../constants/cards'
import { PointingCard } from '../style'
import { Vote } from '..'
import PointingResult from './PointingResult'

interface IProps {
    clearVotes: () => void
    vote: (value: Vote) => void
}

const PrimaryPane: React.FC<IProps> = ({
    clearVotes,
    vote
}) => {

    const [showVotes, setShowVotes] = useState(false)

    const { players, currentUser } = useSelector((state: any) => ({
        players: state.getIn(['pointing', 'players']).toJS(),
        currentUser: state.getIn(['pointing', 'currentUser']).toJS()
    }))

    const isAllVoted = () => {
        return !_.some(players, player => !player.vote)
    }

    const getVotedPercent = (): number => {
        if (_.isEmpty(players)) {
            return 0
        }
        const voted = _.filter(players, player => !!player.vote)
        return voted.length / players.length
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
        if (currentUser.type == 'player') {
            return isAllVoted()
                ? (<PointingResult />)
                : (
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
        } else {
            return (
                <Fragment> 
                    {getActionItems()}
                    <Divider />
                    {isAllVoted()
                        // ? (<PointingResult />)
                        ? (<Progress type="circle" percent={getVotedPercent()} />)
                        : (<Progress type="circle" percent={getVotedPercent()} />)}
                </Fragment>
            )
        }
    }

    return (
        <Fragment>
            {getContent()}
        </Fragment>
    )
}

export default PrimaryPane