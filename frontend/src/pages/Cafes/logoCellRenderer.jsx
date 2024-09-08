import React from 'react'

export default (params) => {
  const { data } = params

  return (
    <span className="imgSpanLogo">
      {data.value && (
        <img
          alt={`${data.value} Flag`}
          src={''}
          className="logo"
        />
      )}
    </span>
  )
}