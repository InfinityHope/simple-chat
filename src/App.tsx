import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ChatPage from './pages/ChatPage'
import ConnectPage from './pages/ConnectPage'
import ChatProvider from './providers/ChatProvider'
import ThemeContextProvider from './providers/ThemeContextProvider'

function App() {
	return (
		<BrowserRouter>
			<ChatProvider>
				<ThemeContextProvider>
					<Layout>
						<Routes>
							<Route path="/" element={<ConnectPage />} />
							<Route path="/chat" element={<ChatPage />} />
						</Routes>
					</Layout>
				</ThemeContextProvider>
			</ChatProvider>
		</BrowserRouter>
	)
}

export default App
