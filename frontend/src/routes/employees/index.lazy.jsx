import { createLazyFileRoute } from '@tanstack/react-router'
import Employees from '../../pages/Employees/Index'

export const Route = createLazyFileRoute('/employees/')({
  component: Employees,
})