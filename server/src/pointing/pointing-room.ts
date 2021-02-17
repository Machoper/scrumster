import _ from 'lodash'
import PointingUser, { PointingUserType } from "./pointing-user"

export default class PointingRoom {
    id: string
    name: string
    players: PointingUser[]
    observers: PointingUser[]

    constructor(id: string, name: string) {
        this.id = id
        this.name = name
        this.players = []
        this.observers = []
    }

    addPlayer = (user: PointingUser) => this.players.push(user)

    addObserver = (user: PointingUser) => this.observers.push(user)

    removeUser = (user: PointingUser) => {
        _.remove(this.players, { id: user.id })
        _.remove(this.observers, { id: user.id })
    }

    changeUserType = (user: PointingUser, type: PointingUserType) => {
        this.removeUser(user)
        user.type = type
        delete user.vote
        if (type === PointingUserType.PLAYER) {
            this.addPlayer(user)
        }
        if (type === PointingUserType.OBSERVER) {
            this.addObserver(user)
        }
    }

    updateVote = (user: PointingUser, vote: number) => {
        const player = _.find(this.players, { id: user.id })
        if (player) {
            player.vote = vote
        }
    }

    clearVotes = () => _.each(this.players, player => delete player.vote)

}