import React, { useCallback, useState } from 'react'
import '../index.css'
import { useSearch } from '@tanstack/react-router'
import { useEmployees } from '../../hooks/useEmployees'
import DataTable from '../../components/DataTable'
import ActionRenderer from './actionRenderer'
import { Route as EmployeeRoute } from '../../routes/employees/index.lazy'
import DataTableHeader from '../../components/DataTableHeader'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEmployee } from '../../api/employee'
import { Modal } from 'antd'

function Employees() {
  const { cafe } = useSearch({
    from: EmployeeRoute.fullPath
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [employeeId, setEmployeeId] = useState(null)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      setIsModalOpen(false)
    }
  })

  const { data, error, isLoading } = useEmployees(cafe)

  const showModal = (id) => {
    setIsModalOpen(true)
    setEmployeeId(id)
  }

  const handleOk = useCallback(() => {
    if (employeeId) {
      mutation.mutate(employeeId)
    }
  }, [employeeId])

  const handleCancel = () => {
    setIsModalOpen(false);
  }
  
  const columnDefs = [
    { headerName: 'Employee ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Email Address', field: 'email_address', sortable: true, filter: true },
    { headerName: 'Phone Number', field: 'phone_number', sortable: true, filter: true },
    { headerName: 'Days worked in the cafe', field: 'days_worked', sortable: true, filter: true },
    { headerName: 'Café name', field: 'cafe', sortable: true, filter: true },
    {
      headerName: 'Actions',
      field: 'action',
      cellRenderer: ActionRenderer,
      cellRendererParams: {
        onShowModal: showModal
      },
      sortable: false,
      filter: false
    }
  ]

  const customGridOptions = {
    paginationPageSize: 15
  }

  return (
    <div className="container">
      <DataTableHeader
        title="Manage Employees"
        buttonText="Add Employee"
        url="/employees/add"
        style={{ marginBottom: '10px' }}
      />
      <DataTable
        data={data}
        columnDefs={columnDefs}
        error={error}
        isLoading={isLoading}
        gridOptions={customGridOptions}
      />
      <Modal
        title="Confirm Delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="DELETE"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this employee?</p>
      </Modal>
    </div>
  )
}

export default Employees