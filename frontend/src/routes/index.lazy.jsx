import { createLazyFileRoute } from '@tanstack/react-router'
import Index from '../pages/Cafes/Index'

export const Route = createLazyFileRoute('/')({
  component: Index,
})