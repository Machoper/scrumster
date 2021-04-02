import { generateUid } from "../common/utils"

export enum PointingUserType {
    PLAYER = 'player',
    OBSERVER = 'observer'
}

export type Vote = number | string | undefined

export default class PointingUser {
    id: string
    name: string
    type: PointingUserType
    vote?: Vote

    constructor(name: string, type: PointingUserType) {
        // this.id = id
        this.id = generateUid()
        this.name = name
        this.type = type
    }
}