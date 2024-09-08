import React from 'react'
import { Link } from '@tanstack/react-router'
import { Menu } from 'antd'
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';

const TopNavigation = () => {
  const items = [
    {
      label: 'Cafes',
      key: 'cafe',
      href: '/cafes',
      icon: <HomeOutlined />,
    },
    {
      label: 'Employees',
      key: 'employee',
      href: '/employees',
      icon: <InfoCircleOutlined />,
    }
  ];

  return (
    <Menu
      mode='horizontal'
      defaultSelectedKeys={['cafe']}
      items={items.map(item => ({
        key: item.key,
        label: (
          <Link to={item.href}>
            {item.label}
          </Link>
        ),
      }))}
    />
  )
}

export default TopNavigation