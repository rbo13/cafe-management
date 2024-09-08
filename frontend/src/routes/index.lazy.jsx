import { createLazyFileRoute } from '@tanstack/react-router'
import Index from '../pages/Cafes'

export const Route = createLazyFileRoute('/')({
  component: Index,
})