import React, { useCallback, useState } from 'react'
import { useCafes } from '../../hooks/useCafes'
import DataTable from '../../components/DataTable'
import { Input } from 'antd'
import '../index.css'
import ActionRenderer from './actionRenderer'
import EmployeesLinkRenderer from './employeesLinkRenderer'
import LogoCellRenderer from './logoCellRenderer'
import DataTableHeader from '../../components/DataTableHeader'

const { Search } = Input

function Index() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data, error, isLoading } = useCafes(searchTerm)

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
      sortable: false,
      filter: false
    }
  ]

  const handleCellClicked = (event) => {
    console.log('Cell clicked:', event)
  }

  const handleRowSelected = (event) => {
    console.log('Row selected:', event)
  }

  const handleAddCafe = (event) => {
    console.log('Add cafe: ', event)
  }

  const customGridOptions = {
    paginationPageSize: 10
  }

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  return (
    <div className="container">
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
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
        onAdd={handleAddCafe}
        style={{ marginBottom: '10px' }}
      />
      <DataTable
        data={data}
        columnDefs={columnDefs}
        error={error}
        isLoading={isLoading}
        gridOptions={customGridOptions}
        onCellClicked={handleCellClicked}
        onRowSelected={handleRowSelected}
      />
    </div>
  )
}

export default Index