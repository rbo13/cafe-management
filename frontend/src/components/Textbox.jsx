import React from 'react'
import { Input, Form as AntdForm } from 'antd'
import { Controller } from 'react-hook-form'

const Textbox = ({ label, name, rules, control }) => (
  <AntdForm.Item
    label={label}
    name={name}
    rules={rules}
  >
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input {...field} />}
    />
  </AntdForm.Item>
);

export default Textbox;