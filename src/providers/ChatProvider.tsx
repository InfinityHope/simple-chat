import axios from 'axios'
import { FC, PropsWithChildren, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatContext } from '../context/ChatContext'
import chatReducer from '../reducers/chat.reducer'
import socket from '../socket/socket'

const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(chatReducer, {
		connected: false,
		roomId: '',
		nickName: '',
		users: [],
		messages: []
	})

	const navigate = useNavigate()

	useEffect(() => {
		if (!state.connected) {
			navigate('/')
			socket.on('room:set_users', setUsers)
		}
	}, [state.connected])

	useEffect(() => {
		socket.on('room:add_message', setMessage)
	}, [])

	const setMessage = (message: { text: string; nickName: string }) => {
		dispatch({
			type: 'NEW_MESSAGE',
			payload: message
		})
	}

	const setUsers = (users: string[]) => {
		dispatch({
			type: 'SET_USERS',
			payload: users
		})
	}

	const onConnect = async (obj: { roomId: string; nickName: string }) => {
		dispatch({
			type: 'IS_CONNECTED',
			payload: obj
		})
		socket.emit('room:connect', obj)
		const { data } = await axios.get(
			`http://localhost:5000/rooms/${obj.roomId}`
		)
		dispatch({
			type: 'SET_DATA',
			payload: data
		})
		navigate('/chat')
	}

	return (
		<ChatContext.Provider
			value={{
				connected: state.connected,
				users: state.users,
				nickName: state.nickName,
				roomId: state.roomId,
				messages: state.messages,
				onConnect,
				setMessage
			}}
		>
			{children}
		</ChatContext.Provider>
	)
}

export default ChatProvider
