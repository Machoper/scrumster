import styled from 'styled-components'
import { List, Radio } from 'antd'

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