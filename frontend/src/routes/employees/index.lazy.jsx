import { createLazyFileRoute } from '@tanstack/react-router'
import Employees from '../../pages/Employees/index'

export const Route = createLazyFileRoute('/employees/')({
  component: Employees,
})