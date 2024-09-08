import React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const TopNavigation = () => {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
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
      icon: <UserOutlined />,
    }
  ];

  const selectedKey = items.find(item => currentPath.startsWith(item.href))?.key || ''

  return (
    <Menu
      mode='horizontal'
      selectedKeys={[selectedKey]}
      items={items.map(item => ({
        key: item.key,
        icon: item.icon,
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