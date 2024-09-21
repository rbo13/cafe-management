import React, { useCallback, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Input, Button, Upload, Form as AntdForm, Card, Typography, Space, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import { useBlocker } from '@tanstack/react-router';
import RadioButtonGroup from './RadioButtonGroup';

const Form = ({ title, selectOptions = [],fields, initialValues, onSubmit, onCancel }) => {
  const { control, handleSubmit, formState: { isDirty, errors, isValid }, reset } = useForm({
    defaultValues: initialValues,
    mode: 'onChange'
  })

  const [fileList, setFileList] = useState([])
  const [isFileValid, setIsFileValid] = useState(true) // since file is optional, we set it to be valid.

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

  const handleBeforeUpload = useCallback((fileList) => {
    if (fileList?.length <= 0) {
      return false
    }

    const file = fileList[0]
    const maxSize = 2 * 1024 * 1024
    const validTypes = ['image/jpeg', 'image/png']

    if (!validTypes.includes(file.type)) {
      message.error('Invalid file type. Only JPEG and PNG are allowed.')
      setIsFileValid(false)
      return false
    }

    if (file.size > maxSize) {
      message.error('File size exceeds 2MB.')
      setIsFileValid(false)
      return false
    }

    // this prevents automatic upload
    // when a file has been selected
    setIsFileValid(true)
    return false
  }, [fileList, setIsFileValid])

  const handleFileChange = ({ fileList }) => {
    handleBeforeUpload(fileList)

    setFileList(fileList)
  }

  const handleFormSubmit = (data) => {
    let file = null;
    if (fileList?.length > 0) {
      file = fileList[0].originFileObj
    }

    onSubmit({
      ...data,
      logo: file
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
                      options={genderOptions}
                      {...controllerField}
                    />
                  )
                } else if (field.type === 'select') {
                  return (
                    <Select
                      placeholder='Select cafe to assign'
                      style={{ width: 180 }}
                      options={selectOptions}
                      {...controllerField}
                      onChange={(value) => {
                        controllerField.onChange(value)
                      }}
                    />
                  );
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
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isValid || !isFileValid}
            >
              Submit
            </Button>
            <Button type="default" onClick={onCancel}>Cancel</Button>
          </Space>
        </AntdForm.Item>
      </AntdForm>
    </Card>
  )
}

export default Form
