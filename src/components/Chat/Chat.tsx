import {
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Typography
} from '@mui/material'
import { FormEvent, useEffect, useRef } from 'react'
import { useChat } from '../../hooks/useChat'
import { useTheme } from '../../hooks/useTheme'
import socket from '../../socket/socket'
import Message from '../Message/Message'
import UserList from '../UserList/UserList'
import Input from '../ui/Input'

const Chat = () => {
	const { theme } = useTheme()
	const inputRef = useRef<HTMLInputElement>(null)
	const messagesRef = useRef<HTMLDivElement>(null)

	const { users, messages, nickName, roomId, setMessage } = useChat()

	useEffect(() => {
		messagesRef.current?.scrollTo(0, 99999)
	}, [messages])

	const onSend = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (inputRef.current && inputRef.current.value && setMessage) {
			socket.emit('room:new_message', {
				nickName,
				text: inputRef.current.value,
				roomId
			})
			setMessage({
				nickName,
				text: inputRef.current.value
			})
			inputRef.current.value = ''
			inputRef.current.focus()
		} else {
			alert('Введите сообщение')
		}
	}

	return (
		<Container maxWidth={'lg'}>
			<Box
				sx={{
					width: '100%',
					height: 700,
					backgroundImage:
						theme === 'dark'
							? 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
							: 'transparent',
					borderRadius: 10,
					border: theme === 'light' ? '1px solid rgb(231, 235, 240)' : 'none',
					marginTop: 10
				}}
			>
				<Grid container height={'100%'}>
					<Grid sx={{ padding: 4 }} item xs={3}>
						<Typography>Online ({users.length}): </Typography>
						<Divider sx={{ marginTop: 1 }} />
						<UserList />
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid
						item
						xs={8.9}
						sx={{ padding: 2 }}
						display={'flex'}
						justifyContent={'space-between'}
						flexDirection={'column'}
						height={'100%'}
					>
						<Grid
							container
							display={'flex'}
							padding={4}
							flexDirection={'column'}
							flexWrap={'nowrap'}
							width={'100%'}
							height={'95%'}
							overflow={'auto'}
							ref={messagesRef}
						>
							{messages.map((message, index) => (
								<Message
									key={message.text + nickName + index}
									nickName={message.nickName}
									message={message.text}
									currentUser={message.nickName === nickName}
								/>
							))}
						</Grid>
						<Grid
							borderTop={'1px solid gray'}
							item
							component={'form'}
							onSubmit={(e) => onSend(e)}
						>
							<Input label="message:" type="filled" fullWidth ref={inputRef} />
							<Button type="submit" variant="contained" sx={{ marginTop: 1 }}>
								Send
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}

export default Chat
