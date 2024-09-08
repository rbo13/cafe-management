import React from 'react'
import { Select, Form as AntdForm } from 'antd'
import { Controller } from 'react-hook-form'

const Dropdown = ({ label, name, options, control }) => (
  <AntdForm.Item label={label} name={name}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...field}>
          {options.map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      )}
    />
  </AntdForm.Item>
);

export default Dropdown;