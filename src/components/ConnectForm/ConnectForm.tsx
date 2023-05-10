import { Box, Button, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import axios from 'axios'
import { FormEvent, useRef } from 'react'
import { useChat } from '../../hooks/useChat'
import { useCheckAuthValues } from '../../hooks/useCheckAuthValues'
import { useTheme } from '../../hooks/useTheme'
import Input from '../ui/Input'

const ConnectForm = () => {
	const roomId = useRef<HTMLInputElement>(null)
	const nickName = useRef<HTMLInputElement>(null)

	const { theme } = useTheme()
	const { onConnect } = useChat()
	const { checkNickname, checkRoomId, nicknameIsDirty, roomIdIsDirty } =
		useCheckAuthValues()

	const connect = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (nickName.current && roomId.current && onConnect) {
			if (nickName.current.value && roomId.current.value) {
				const data = {
					nickName: nickName.current.value,
					roomId: roomId.current.value
				}
				await axios.post('http://localhost:5000/rooms', data)
				onConnect(data)

				nickName.current.value = ''
				roomId.current.value = ''
			} else {
				alert('Введите данные чата')
			}
		}
	}

	return (
		<Container maxWidth="sm">
			<Box
				onSubmit={(e) => connect(e)}
				component="form"
				sx={{
					width: '100%',
					height: 400,
					backgroundImage:
						theme === 'dark'
							? 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
							: 'transparent',
					borderRadius: 10,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					border: theme === 'light' ? '1px solid rgb(231, 235, 240)' : 'none',
					marginTop: 10
				}}
			>
				<Typography sx={{ textAlign: 'center' }} variant="h5">
					SignIn
				</Typography>
				<Input
					ref={roomId}
					onChange={checkRoomId}
					isDirty={roomIdIsDirty}
					label={'Room ID'}
				/>
				<Input
					ref={nickName}
					onChange={checkNickname}
					isDirty={nicknameIsDirty}
					label={'Nickname'}
				/>
				<Button type={'submit'} sx={{ marginTop: 5 }} variant="contained">
					Log in to the chat
				</Button>
			</Box>
		</Container>
	)
}

export default ConnectForm
