import { createLazyFileRoute } from '@tanstack/react-router'
import Index from '../pages/Cafes/index'

export const Route = createLazyFileRoute('/')({
  component: Index,
})