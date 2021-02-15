import { generateUid } from "../common/utils"
import RetroUser from "./retro-user"

export default class RetroItem {
	id: string
	type: string
	// subtype?: string
	content: string
	read: boolean
	authorId: string
	authorName: string
    likes: string[]
    
    constructor(props: {type: string, content: string}, author: RetroUser) {
        this.id = generateUid()
        this.type = props.type
        this.content = props.content
        this.read = false
        this.authorId = author.id
        this.authorName = author.name
        this.likes = []
    }
}