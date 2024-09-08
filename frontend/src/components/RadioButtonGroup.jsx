import React from 'react'
import { Radio, Form as AntdForm } from 'antd'
import { Controller } from 'react-hook-form'

const RadioButtonGroup = ({ label, name, options, control }) => (
  <AntdForm.Item label={label} name={name}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Radio.Group {...field}>
          {options.map(option => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      )}
    />
  </AntdForm.Item>
);

export default RadioButtonGroup;