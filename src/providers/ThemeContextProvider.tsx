import {
	CssBaseline,
	PaletteMode,
	ThemeProvider,
	createTheme
} from '@mui/material'
import { FC, PropsWithChildren, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState<PaletteMode>('dark')
	const Theme = createTheme({
		palette: {
			mode: theme
		}
	})

	const changeTheme = () =>
		setTheme((prevState) => (prevState === 'dark' ? 'light' : 'dark'))

	return (
		<ThemeContext.Provider value={{ changeTheme, theme }}>
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider
