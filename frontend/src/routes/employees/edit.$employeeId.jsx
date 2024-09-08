import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees/edit/$employeeId')({
  component: EditEmployee
})

function EditEmployee() {
  const { employeeId } = Route.useParams()

  return (
    <>
      <h1>Hello employee, {employeeId}</h1>
    </>
  )
}