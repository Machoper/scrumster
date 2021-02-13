import React from 'react'
import styled from 'styled-components'
import { Card, List, Radio } from 'antd'

export const PointingCard: typeof Card = styled(Card)`
    width: 170px; 
    height: 230px; 
    border: 1px solid #888;
    border-radius: 16px;
`
export const ParticipantList: typeof List = styled(List)`
    background: white; 
    text-align: center;
`
export const RadioGroup = styled(Radio.Group)`
    width: 100%;
    text-align: center;
`
export const RadioButton = styled(Radio.Button)`
    width: 50%;
`