import React, { useCallback, useState } from 'react'
import { useCafes } from '../../hooks/useCafes'
import DataTable from '../../components/DataTable'
import { Input, Modal } from 'antd'
import '../index.css'
import EmployeesLinkRenderer from './employeesLinkRenderer'
import LogoCellRenderer from './logoCellRenderer'
import DataTableHeader from '../../components/DataTableHeader'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCafe } from '../../api/cafe'
import ActionRenderer from './actionRenderer'

const { Search } = Input

function Index() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, error, isLoading } = useCafes(searchTerm)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cafeId, setCafeId] = useState(null)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: deleteCafe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cafes'] })
      setIsModalOpen(false)
    }
  })

  const showModal = (id) => {
    setIsModalOpen(true)
    setCafeId(id)
  }

  const handleOk = useCallback(() => {
    if (cafeId) {
      mutation.mutate(cafeId)
    }
  }, [cafeId])

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const columnDefs = [
    {
      headerName: 'Logo',
      field: 'logo',
      cellRenderer: LogoCellRenderer,
      sortable: false,
      filter: false
    },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    {
      headerName: 'Employees',
      field: 'employees',
      cellRenderer: EmployeesLinkRenderer,
      sortable: true,
      filter: true
    },
    { headerName: 'Location', field: 'location', sortable: true, filter: true },
    {
      headerName: 'Action',
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

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  return (
    <div className="container">
      <div
        style={{
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '16px'
          }}
        >
          <Search
            placeholder="Filter by Location"
            onPressEnter={handleSearch}
          />
        </div>
      </div>
      <DataTableHeader
        title="Manage Cafes"
        buttonText="Add Cafe"
        url="/cafes/add"
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
        <p>Are you sure you want to delete this cafe?</p>
      </Modal>
    </div>
  )
}

export default Index