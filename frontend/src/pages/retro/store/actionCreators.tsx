import React from "react";
import { ActionType } from "./actionType.enum";
import { fromJS } from "immutable";
import { Socket } from "socket.io-client";

export const setSocket = (socket: React.MutableRefObject<Socket | undefined>) => ({
  type: ActionType.SET_SOCKET,
  socket: fromJS(socket)
});
export const setViewMode = (viewMode: boolean) => ({
  type: ActionType.SET_VIEW_MODE,
  viewMode
});
export const setRoomInfo = (room: any) => ({
  type: ActionType.SET_ROOM_INFO,
  room: fromJS(room)
});
export const updateCurrentUser = (user: any) => ({
  type: ActionType.UPDATE_CURRENT_USER,
  currentUser: fromJS(user)
});
export const cleanUp = () => ({
  type: ActionType.CLEAN_UP
});
