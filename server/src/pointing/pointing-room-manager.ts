import _ from "lodash";
import PointingRoom from "./pointing-room";
import PointingUser from "./pointing-user";

export default class PointingRoomManager {
  private rooms: { [key: string]: PointingRoom };

  constructor() {
    this.rooms = {};
  }

  getRoom = (roomId: string, roomName?: string) => {
    if (!this.rooms[roomId] && roomName) {
      this.rooms[roomId] = new PointingRoom(roomId, roomName);
    }
    return this.rooms[roomId];
  };

  checkRoom = (roomId: string) => {
    const room = this.rooms[roomId];
    if (room && _.isEmpty(room.players) && _.isEmpty(room.observers)) {
      delete this.rooms[roomId];
    }
  };

  removeUser = (user: PointingUser) =>
    _.each(this.rooms, room => room.removeUser(user));
}
