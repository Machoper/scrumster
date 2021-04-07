import { fromJS } from "immutable";
import { ActionType } from "./actionType.enum";

const defautltState = fromJS({
  roomId: "",
  roomName: "",
  players: [],
  observers: [],
  currentUser: {}
});

const reducer = (state = defautltState, action: any) => {
  switch (action.type) {
    case ActionType.UPDATE_ROOM:
      return state.merge({
        players: action.data.get("players"),
        observers: action.data.get("observers")
      });
    case ActionType.SET_ROOM_INFO:
      return state.merge({
        roomId: action.room.get("id"),
        roomName: action.room.get("name")
      });
    case ActionType.UPDATE_CURRENT_USER:
      return state.set("currentUser", action.currentUser);
    case ActionType.CLEAN_UP:
      return defautltState;
    default:
      return state;
  }
};

export default reducer;
