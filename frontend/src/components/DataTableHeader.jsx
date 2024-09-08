import React from 'react'
import { Link } from '@tanstack/react-router';
import { Button, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

const DataTableHeader = ({ 
  title,
  url,
  onAdd,
  buttonText,
  addIcon = <PlusOutlined />,
  addType = "primary",
  style = {},
  buttonStyle = {},
  children
}) => {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#3b5c83',
        color: 'white',
        borderRadius: '5px 5px 0 0',
        ...style
      }}
    >
      <Text style={{ color: 'white', fontSize: '18px' }}>
        {title}
      </Text>
      <Space>
        {children}
        {onAdd && (
          <Link to={url}>
            <Button
              type={addType}
              onClick={onAdd}
              icon={addIcon}
              style={buttonStyle}
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </Space>
    </div>
  )
}

export default DataTableHeader;