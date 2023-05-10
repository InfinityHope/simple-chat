import { createContext } from 'react'

interface IContext {
	changeTheme?: () => void
	theme: string
}

export const ThemeContext = createContext<IContext>({
	theme: 'dark',
	changeTheme: undefined
})
