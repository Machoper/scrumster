import _ from 'lodash'
import { Table } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

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

const PointingResult = () => {

    const { players } = useSelector((state: any) => ({
        players: state.getIn(['pointing', 'players']).toJS()
    }))

    const getResult = () => {
        return _.chain(players)
            .map(player => player.vote)
            .filter(vote => !!vote)
            .countBy()
            .map((count, points) => ({ key: '' + points, points, count }))
            .value()
    }

    return (
        <Table pagination={false} columns={columns} dataSource={getResult()}></Table>
    )
}

export default PointingResult