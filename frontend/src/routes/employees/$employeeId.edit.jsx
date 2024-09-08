import { createFileRoute } from '@tanstack/react-router'
import EditEmployee from '../../pages/Employees/EditEmployee'

export const Route = createFileRoute('/employees/$employeeId/edit')({
  component: EditEmployee
})