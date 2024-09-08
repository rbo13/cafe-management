import { createLazyFileRoute } from '@tanstack/react-router'
import AddCafe from '../../pages/Cafes/AddCafe'

export const Route = createLazyFileRoute('/cafes/add')({
  component: AddCafe
})