export enum PointingUserType {
    PLAYER = 'player',
    OBSERVER = 'observer'
}

export default class PointingUser {
    id: string
    name: string
    type: PointingUserType
    vote?: number

    constructor(id: string, name: string, type: PointingUserType) {
        this.id = id
        this.name = name
        this.type = type
    }
}