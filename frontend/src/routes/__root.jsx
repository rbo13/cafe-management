import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import TopNavigation from '../components/Navbar'

export const Route = createRootRoute({
  component: () => (
    <>
      <TopNavigation />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})