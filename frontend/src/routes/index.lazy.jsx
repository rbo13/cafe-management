import { createLazyFileRoute } from '@tanstack/react-router'
import { useCafes } from '../hooks/useCafes';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { data, error, isLoading } = useCafes();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-2">
      <ul>{data?.map((cafe) => <li key={cafe?.id}>{cafe?.name}</li>)}</ul>
    </div>
  )
}