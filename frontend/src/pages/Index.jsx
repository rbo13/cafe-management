import React from 'react'
import { useCafes } from '../hooks/useCafes'
import DataTable from '../components/DataTable'
import './index.css'

function Index() {
  const { data, error, isLoading } = useCafes()
  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Location', field: 'location', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Number of Employees', field: 'employees', sortable: true, filter: true },
    {
      headerName: 'Logo',
      field: 'logo',
      cellRenderer: (params) => {
        return (
          <span className="imgSpanLogo">
            {params.value && (
              <img
                alt={`${params.value} Flag`}
                src={''}
                className="logo"
              />
            )}
          </span>
        )
      },
      sortable: false,
      filter: false
    }
  ]

  const handleCellClicked = (event) => {
    console.log('Cell clicked:', event);
  };

  const handleRowSelected = (event) => {
    console.log('Row selected:', event);
  };

  const customGridOptions = {
    paginationPageSize: 10
  }

  return (
    <div className="p-2">
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