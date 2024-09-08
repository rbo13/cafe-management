import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cafes/edit/$cafeId')({
  component: EditCafe
})

function EditCafe() {
  const { cafeId } = Route.useParams()

  return (
    <>
      <h1>Hello cafe, {cafeId}</h1>
    </>
  )
}