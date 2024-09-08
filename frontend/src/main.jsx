import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Index from './pages/Cafes/index.jsx'

import './index.css'

import { routeTree } from './routeTree.gen.ts'

const queryClient = new QueryClient();

const router = createRouter({
  defaultNotFoundComponent: Index,
  routeTree
})

const rootElement = document.getElementById('root')
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
}

