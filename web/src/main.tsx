import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Route, Routes } from 'react-router'
import { NotFound } from './pages/404.tsx'
import { Home } from './pages/index.tsx'
import { Redirect } from './pages/redirect.tsx'

async function enableMocking() {
	if (import.meta.env.MODE === 'development') {
		const { worker } = await import('./mocks/browser')
		await worker.start({
			onUnhandledRequest: 'bypass'
		})
	}
}

export const queryClient = new QueryClient()

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route index element={<Home />} />
						<Route path="/redirect/:link" element={<Redirect />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>

				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</StrictMode>
	)
})
