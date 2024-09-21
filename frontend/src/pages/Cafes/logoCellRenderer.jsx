import React from 'react'
import { useCafeLogo } from '../../hooks/useCafes';

export default (params) => {
  const { data } = params

  const { data: logo, isLoading } = useCafeLogo(data?.id)

  if (isLoading) return <span>Loading...</span>

  return (
    <span className="imgSpanLogo">
      {logo ? (
        <img
          alt={`${data?.name} Logo`}
          src={`data:image/jpeg;base64,${logo}`}
          className="logo"
        />
      ) : (
        <span>No Logo Uploaded</span>
      )}
    </span>
  )
}