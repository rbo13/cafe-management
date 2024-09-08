import React from 'react'
import { Button, Flex, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export default (params) => {
  const { data } = params

  const handleEdit = () => {
    window.alert(`Edit ${data?.id}`);
  };

  const handleDelete = () => {
    window.alert(`Delete ${data?.id}`);
  };
  
  return (
    <Flex wrap gap="small">
      <Space>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Space>
    </Flex>
  )
}