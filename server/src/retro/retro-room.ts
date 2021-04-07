import _ from "lodash";
import RetroItem from "./retro-item";
import RetroUser from "./retro-user";

export default class RetroRoom {
  id: string;
  name: string;
  // sessionId: string
  // startDate: string
  // config: RetroConfig
  viewMode: boolean;
  users: RetroUser[];
  items: RetroItem[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.viewMode = false;
    this.users = [];
    this.items = [];
  }

  setViewMode(viewMode: boolean): void {
    this.viewMode = viewMode;
  }

  addUser(user: RetroUser): void {
    this.users.push(user);
  }

  removeUser(user: RetroUser): void {
    _.remove(this.users, { id: user.id });
  }

  private findItem = (id: string): RetroItem | undefined =>
    _.find(this.items, { id });

  addItem(item: RetroItem): void {
    const presentItem = this.findItem(item.id);
    if (presentItem) {
      presentItem.content = item.content;
    } else {
      this.items.push(item);
    }
  }

  removeItem(itemId: string): void {
    _.remove(this.items, { id: itemId });
  }

  showItem(itemId: string): void {
    const presentItem = this.findItem(itemId);
    if (presentItem) {
      presentItem.read = true;
    }
  }

  toggleLike(itemId: string, userId: string): void {
    const presentItem = this.findItem(itemId);
    if (presentItem) {
      if (_.includes(presentItem.likes, userId)) {
        _.remove(presentItem.likes, userId);
      } else {
        presentItem.likes.push(userId);
      }
    }
  }
}
