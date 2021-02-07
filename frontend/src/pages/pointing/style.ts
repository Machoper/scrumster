import React from 'react'
import styled from 'styled-components'
import { Card, List } from 'antd'

interface IListProps {
    renderItem: (item: any) => React.ReactNode
}

export const PointingCard: typeof Card = styled(Card)`
    width: 200px; 
    height: 300px; 
    border: 1px solid #888;
    border-radius: 16px;
`
export const ParticipantList: typeof List = styled(List)`
    background: white; 
    text-align: center;
`