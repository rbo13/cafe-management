import { createFileRoute } from '@tanstack/react-router'
import EditCafe from '../../pages/Cafes/EditCafe'

export const Route = createFileRoute('/cafes/$cafeId/edit')({
  component: EditCafe
})