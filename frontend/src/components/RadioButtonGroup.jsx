import React from 'react'
import { Radio } from 'antd'

const RadioButtonGroup = ({ options, value, onChange, name, buttonStyle = 'outline', size = 'default' }) => {
  return (
    <Radio.Group
      options={options}
      value={value}
      onChange={onChange}
      name={name}
      buttonStyle={buttonStyle}
      size={size}
    />
  )
}

export default RadioButtonGroup;