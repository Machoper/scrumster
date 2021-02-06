import styled from 'styled-components'
import logoPic from '../../static/logo.png'

export const HeaderWrapper = styled.div`
    text-color: #fff;
`
export const Logo = styled.div`
    display: block;
    float: left;
    width: 120px;
    height: 64px;
    margin-right: 24px;
    background: url(${logoPic});
    background-size: contain;
    background-repeat: no-repeat;
`
export const UserMenu = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 64px;
    margin-right: 50px;
    cursor: pointer;
`
