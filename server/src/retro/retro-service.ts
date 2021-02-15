import http from 'http'
import socketio from 'socket.io'
import { generateUid } from '../common/utils'
import RetroItem from './retro-item'
import RetroRoomManager from './retro-room-manager'
import RetroUser, { RetroUserType } from './retro-user'


interface IRetroSocket extends socketio.Socket {
    user: RetroUser
    roomId: string
}

interface IJoinProps {
    roomId: string
    userId: string
    userName: string
    userType: RetroUserType
}

export default class RetroService {

    private roomManager: RetroRoomManager
    private retroServer: socketio.Server

    constructor(server: http.Server) {
        this.roomManager = new RetroRoomManager()

        this.retroServer = new socketio.Server(server, {
            path: '/retro'
        }).on('connection', (socket: IRetroSocket) => {
            console.log('New client connected')
            socket.on('join', props => this.joinRoom(socket, props))
            socket.on('toggle_view_mode', viewMode => this.toggleViewMode(socket, viewMode))
            socket.on('item:add', props => this.addItem(socket, props))
            socket.on('item:remove', itemId => this.removeItem(socket, itemId))
            socket.on('item:show', itemId => this.showItem(socket, itemId))
            socket.on('item:toggle_like', itemId => this.toggleLike(socket, itemId))

            socket.on('disconnect', () => this.disconnect(socket))
        })
    }

    private joinRoom(socket: IRetroSocket, props: IJoinProps) {
        const { roomId, userId, userName, userType } = props
        console.log(userName + ' joined ' + roomId)
        if (socket.roomId) {
            socket.leave(roomId)
        }
        socket.join(roomId)
        socket.roomId = roomId
        let newUser = new RetroUser(userName, userType)
        socket.user = newUser
        this.roomManager.removeUser(newUser)
        let room = this.roomManager.getRoom(roomId)
        room.addUser(newUser)

        this.refreshRoom(roomId)
        console.log(socket.roomId + ', ' + socket.user)
    }

    private toggleViewMode(socket: IRetroSocket, viewMode: boolean): void {
        const { roomId } = socket
        if (roomId) {
            const room = this.roomManager.getRoom(roomId)
            room.setViewMode(viewMode)
            this.refreshRoom(roomId)
        }
    }

    private addItem(socket: IRetroSocket, props: any) {
        const { roomId, user } = socket
        if (roomId) {
            const room = this.roomManager.getRoom(roomId)
            const item = new RetroItem(props, user)
            console.log(item)
            room.addItem(item)
            this.refreshRoom(roomId)
        }
    }

    private removeItem(socket: IRetroSocket, itemId: string) {
        const { roomId } = socket
        if (roomId) {
            const room = this.roomManager.getRoom(roomId)
            room.removeItem(itemId)
            this.refreshRoom(roomId)
        }
    }

    private showItem(socket: IRetroSocket, itemId: string) {
        const { roomId } = socket
        if (roomId) {
            const room = this.roomManager.getRoom(roomId)
            room.showItem(itemId)
            this.refreshRoom(roomId)
        }
    }

    private toggleLike(socket: IRetroSocket, itemId: string) {
        const { roomId, user } = socket
        if (roomId) {
            const room = this.roomManager.getRoom(roomId)
            room.toggleLike(itemId, user.id)
            this.refreshRoom(roomId)
        }
    }

    private disconnect(socket: IRetroSocket) {
        console.log('Client disconnected')
        const { roomId, user } = socket
        if (roomId) {
            socket.leave(roomId)
        }
        if (user) {
            this.roomManager.removeUser(user)
            if (roomId) {
                this.refreshRoom(roomId)
                setTimeout(() => this.roomManager.checkRoom(roomId), 5000)
            }
        }
    }

    private async refreshRoom(roomId: string) {
        console.log('refresh room: ' + roomId)
        let room = this.roomManager.getRoom(roomId)
        this.retroServer.to(roomId).emit('refresh', room)
    }
}