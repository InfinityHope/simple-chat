import { Box, Chip, Grid, Typography } from '@mui/material'
import { FC } from 'react'

interface IMessage {
	currentUser: boolean
	nickName: string
	message: string
}

const Message: FC<IMessage> = ({ currentUser, nickName, message }) => {
	return (
		<Grid
			mt={1}
			item
			display={'flex'}
			justifyContent={currentUser ? 'flex-end' : 'flex-start'}
		>
			<Box>
				<Chip label={message} color={!currentUser ? 'primary' : 'secondary'} />
				<Typography
					textAlign={currentUser ? 'right' : 'left'}
					fontSize={'12px'}
					mt={0.5}
					mr={currentUser ? 0.5 : 0}
					ml={!currentUser ? 0.5 : 0}
					color={'gray'}
				>
					{nickName}
				</Typography>
			</Box>
		</Grid>
	)
}

export default Message
