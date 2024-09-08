import React from 'react'
import { Button, Flex, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

const ActionRenderer = (props) => {
  const { data, onShowModal } = props

  const handleDelete = () => {
    onShowModal(data?.id)
  };
  
  return (
    <Flex wrap gap="small">
      <Space>
        <Link
          to={`/employees/${data?.id}/edit`}
          params={{ employeeId: data?.id }}
        >
          <Button
            type="primary"
            icon={<EditOutlined />}
          >
            Edit
          </Button>
        </Link>
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

export default ActionRenderer