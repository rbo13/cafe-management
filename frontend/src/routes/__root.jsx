import { createRootRoute, Outlet } from '@tanstack/react-router'
import TopNavigation from '../components/Navbar'

export const Route = createRootRoute({
  component: () => (
    <>
      <TopNavigation />
      <Outlet />
    </>
  ),
})