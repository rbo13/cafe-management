import { createLazyFileRoute } from '@tanstack/react-router'
import AddEmployee from '../../pages/Employees/AddEmployee'

export const Route = createLazyFileRoute('/employees/add')({
  component: AddEmployee
})