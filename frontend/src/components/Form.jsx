import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input, Button, Upload, Form as AntdForm, Card, Typography, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import { useBlocker } from '@tanstack/react-router';
import RadioButtonGroup from './RadioButtonGroup';

const Form = ({ title, fields, initialValues, onSubmit, onCancel }) => {
  const { control, handleSubmit, formState: { isDirty, errors }, reset } = useForm({
    defaultValues: initialValues,
  })

  const [fileList, setFileList] = useState([]);

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]

  useBlocker({
    blockerFn: () => window.confirm('You have unsaved changes, are you sure you want to leave?'),
    condition: isDirty
  })

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  const handleBeforeUpload = (file) => {
    // prevent automatic upload
    return false
  }

  const handleFileChange = ({ fileList }) => setFileList(fileList)

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      logo: fileList,
    })

    reset({
      ...data,
      logo: fileList
    }, {
      keepValues: false,
      keepDirty: false,
      keepDefaultValues: false
    })
  }



  return (
    <Card>
      <Typography.Title level={4}>{title}</Typography.Title>
      <AntdForm onFinish={handleSubmit(handleFormSubmit)} layout='vertical'>
        {fields.map((field) => (
          <AntdForm.Item
            key={field.name}
            label={field.label}
            validateStatus={errors[field.name] ? 'error' : ''}
            help={errors[field.name] ? errors[field.name].message : ''}
          >
            <Controller
              name={field.name}
              control={control}
              rules={field.rules}
              render={({ field: controllerField }) => {
                if (field.type === 'textarea') {
                  return <Input.TextArea {...controllerField} />
                } else if (field.type === 'radio') {
                  return (
                    <RadioButtonGroup
                      control={control}
                      options={genderOptions}
                      {...controllerField}
                    />
                  )
                } else if (field.type === 'file') {
                  return (
                    <Upload
                      {...controllerField}
                      fileList={fileList}
                      beforeUpload={handleBeforeUpload}
                      onChange={handleFileChange}
                      maxCount={1}
                      listType="picture"
                    >
                      <Button icon={<UploadOutlined />}>Upload {field.label}</Button>
                    </Upload>
                  );
                } else {
                  return <Input {...controllerField} />;
                }
              }}
            />
          </AntdForm.Item>
        ))}
        <AntdForm.Item>
          <Space>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button type="default" onClick={onCancel}>Cancel</Button>
          </Space>
        </AntdForm.Item>
      </AntdForm>
    </Card>
  )
}

export default Form
