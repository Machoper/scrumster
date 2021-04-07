import { generateUid } from "../common/utils"
import RetroUser from "./retro-user"

export interface IRetroItemProps {
    id?: string;
    type: string;
    content: string;
  }

export default class RetroItem {
	id: string
	type: string
	// subtype?: string
	content: string
	read: boolean
	authorId: string
	authorName: string
    likes: string[]
    
    constructor(props: IRetroItemProps, author: RetroUser) {
        this.id = props.id || generateUid()
        this.type = props.type
        this.content = props.content
        this.read = false
        this.authorId = author.id
        this.authorName = author.name
        this.likes = []
    }
}