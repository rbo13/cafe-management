import React from 'react'
import '../index.css'
import { useEmployees } from '../../hooks/useEmployees'
import DataTable from '../../components/DataTable'
import ActionRenderer from './actionRenderer'

function Employees() {
  const { data, error, isLoading } = useEmployees()
  
  const columnDefs = [
    { headerName: 'Employee ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Email Address', field: 'email_address', sortable: true, filter: true },
    { headerName: 'Phone Number', field: 'phone_number', sortable: true, filter: true },
    { headerName: 'Days worked in the cafe', field: 'days_worked', sortable: true, filter: true },
    { headerName: 'Café name', field: 'cafe', sortable: true, filter: true },
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

  const handleAddEmployee = (event) => {
    console.log(event)
  }

  const customGridOptions = {
    paginationPageSize: 10
  }

  return (
    <div className="p-2">
      <DataTable
        data={data}
        headerTitle="Manage Employees"
        buttonText="Add Employee"
        columnDefs={columnDefs}
        error={error}
        isLoading={isLoading}
        gridOptions={customGridOptions}
        onCellClicked={handleCellClicked}
        onRowSelected={handleRowSelected}
        onAdd={handleAddEmployee}
      />
    </div>
  )
}

export default Employees