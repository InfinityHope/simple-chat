import CircleIcon from '@mui/icons-material/Circle'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useChat } from '../../hooks/useChat'

const UserList = () => {
	const { users } = useChat()
	return (
		<List>
			{users &&
				users.map((user, index) => (
					<ListItem key={user + index} disablePadding>
						<ListItemIcon>
							<CircleIcon color="primary" fontSize="small" />
						</ListItemIcon>
						<ListItemText primary={user} />
					</ListItem>
				))}
		</List>
	)
}

export default UserList
