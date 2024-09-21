import React from 'react'
import { useCafeLogo } from '../../hooks/useCafes';

export default (params) => {
  const { data, fetchLogo } = params

  const { data: logo, isLoading, error } = useCafeLogo(data?.id)

  if (isLoading) return <span>Loading...</span>
  if (error) return <span>Something went wrong loading cafe logo</span>

  return (
    <span className="imgSpanLogo">
      {logo && (
        <img
          alt={`${data?.name} Logo`}
          src={`data:image/jpeg;base64,${logo}`}
          className="logo"
        />
      )}
    </span>
  )
}