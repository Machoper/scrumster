import { v1 as uuidv1 } from 'uuid'

export const generateUid = (): string => uuidv1()

export const generateRoomId = (): string => Math.random().toString(36).substring(2) + Date.now().toString(36)