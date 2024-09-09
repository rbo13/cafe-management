import React from 'react'
import { Select } from 'antd'

const { Option } = Select;

const SelectDropdown = React.forwardRef(({ name, options, placeholder = "Select an option", ...rest }, ref) => {
  return (
    <Select ref={ref} placeholder={placeholder} {...rest}>
      {options.map((option) => (
        <Option key={option.id} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
})


export default SelectDropdown;