import _ from "lodash";
import RetroRoom from "./retro-room";
import RetroUser from "./retro-user";

export default class RetroRoomManager {
  private rooms: { [key: string]: RetroRoom };

  constructor() {
    this.rooms = {};
  }

  getRoom = (roomId: string, roomName?: string) => {
    if (!this.rooms[roomId] && roomName) {
      this.rooms[roomId] = new RetroRoom(roomId, roomName);
    }
    return this.rooms[roomId];
  };

  checkRoom = (roomId: string) => {
    const room = this.rooms[roomId];
    if (room && _.isEmpty(room.users)) {
      delete this.rooms[roomId];
    }
  };

  removeUser = (user: RetroUser) =>
    _.each(this.rooms, room => room.removeUser(user));
}
