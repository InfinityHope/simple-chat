import { createContext } from 'react'

interface IContext {
	connected: boolean
	users: string[]
	messages: { nickName: string; text: string }[]
	nickName: string
	roomId: string
	onConnect?: (data: { roomId: string; nickName: string }) => void
	setMessage?: (message: { nickName: string; text: string }) => void
}

export const ChatContext = createContext<IContext>({
	connected: false,
	users: [],
	messages: [],
	nickName: '',
	roomId: '',
	onConnect: undefined,
	setMessage: undefined
})
