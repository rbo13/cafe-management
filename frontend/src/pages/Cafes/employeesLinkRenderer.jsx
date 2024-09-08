import React from 'react'
import { Link } from '@tanstack/react-router'
import './index.css'


export default (params) => {
  const { data } = params
  const cafeName = data?.name

  return (
    <Link
      to='/employees'
      search={{
        cafe: cafeName
      }}
      params={{ cafeId: params.data.id }}
    >
      {params.value}
    </Link>
  );
}