export default (state: any, action: any) => {
	switch (action.type) {
		case 'IS_CONNECTED':
			return {
				...state,
				connected: true,
				nickName: action.payload.nickName,
				roomId: action.payload.roomId
			}
		case 'SET_USERS':
			return {
				...state,
				users: action.payload
			}

		case 'SET_DATA':
			return {
				...state,
				users: action.payload.users,
				messages: action.payload.messages
			}

		case 'NEW_MESSAGE':
			return {
				...state,
				messages: [...messages, action.payload]
			}

		default:
			return state
	}
}
