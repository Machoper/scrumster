import { generateUid } from "../common/utils"

export enum RetroUserType {
    PLAYER = 'player',
    OBSERVER = 'observer'
}

export default class RetroUser {
    id: string
    name: string
    type: RetroUserType

    constructor(name: string, type: RetroUserType) {
        this.id = generateUid()
        this.name = name
        this.type = type
    }
}