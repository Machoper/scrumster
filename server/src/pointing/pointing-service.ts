import http from "http";
import socketio from "socket.io";
import { generateRoomId } from "../common/utils";
import PointingRoomManager from "./pointing-room-manager";
import PointingUser, { PointingUserType, Vote } from "./pointing-user";

interface IPointingSocket extends socketio.Socket {
  user: PointingUser;
  roomId: string;
}

interface IJoinProps {
  roomId: string;
  roomName?: string;
  userId: string;
  userName: string;
  userType: PointingUserType;
}

export default class PointingService {
  private roomManager: PointingRoomManager;
  private pointingServer: socketio.Server;

  constructor(server: http.Server) {
    this.roomManager = new PointingRoomManager();

    this.pointingServer = new socketio.Server(server, {
      transports: ["websocket", "polling"],
      path: "/socket/pointing"
    }).on("connection", (socket: IPointingSocket) => {
      console.log("New client connected");
      socket.on("join", props => this.joinRoom(socket, props));
      socket.on("vote", vote => this.vote(socket, vote));
      socket.on("clear_votes", () => this.clearVotes(socket));
      socket.on("change_user_type", type => this.changeUserType(socket, type));

      socket.on("disconnect", () => this.disconnect(socket));
    });
  }

  private joinRoom(socket: IPointingSocket, props: IJoinProps) {
    const { roomName, userName, userType } = props;
    const roomId = props.roomId || generateRoomId();
    if (socket.roomId) {
      socket.leave(socket.roomId);
    }
    let room = this.roomManager.getRoom(roomId, roomName);
    if (!room) {
      socket.emit("error", "Room does not exist");
      return;
    }
    socket.join(roomId);
    socket.roomId = roomId;
    let newUser = new PointingUser(userName, userType);
    socket.user = newUser;
    this.roomManager.removeUser(newUser);

    if (userType === PointingUserType.PLAYER) {
      room.addPlayer(newUser);
    }
    if (userType === PointingUserType.OBSERVER) {
      room.addObserver(newUser);
    }

    socket.emit("joined", { user: socket.user, room });
    this.refreshRoom(roomId);
    console.log(userName + " joined " + roomId);
  }

  private vote(socket: IPointingSocket, vote: Vote) {
    const { roomId, user } = socket;
    if (roomId) {
      const room = this.roomManager.getRoom(roomId);
      room.updateVote(user, vote);
      this.refreshRoom(roomId);
    }
  }

  private clearVotes(socket: IPointingSocket) {
    const { roomId } = socket;
    if (roomId) {
      const room = this.roomManager.getRoom(roomId);
      room.clearVotes();
      this.refreshRoom(roomId);
    }
  }

  private changeUserType(socket: IPointingSocket, type: PointingUserType) {
    const { roomId, user } = socket;
    if (roomId) {
      const room = this.roomManager.getRoom(roomId);
      room.changeUserType(user, type);
      this.refreshRoom(roomId);
    }
  }

  private disconnect(socket: IPointingSocket) {
    console.log("Client disconnected");
    const { roomId, user } = socket;
    if (roomId) {
      socket.leave(roomId);
    }
    if (user) {
      this.roomManager.removeUser(user);
      if (roomId) {
        this.refreshRoom(roomId);
        setTimeout(() => this.roomManager.checkRoom(roomId), 5000);
      }
    }
  }

  private async refreshRoom(roomId: string) {
    console.log("refresh room: " + roomId);
    let room = this.roomManager.getRoom(roomId);
    this.pointingServer.to(roomId).emit("refresh", room);
  }
}
