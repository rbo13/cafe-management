import React, { useCallback, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { PlusOutlined } from '@ant-design/icons'
import DataTableHeader from './DataTableHeader'

const DataTable = ({
  data = [],
  columnDefs,
  isLoading,
  error,
  gridOptions = {},
  onCellClicked,
  onRowSelected,
  onAdd,
  headerTitle,
  buttonText
}) => {
  const gridRef = useRef(null)

  const defaultGridOptions = useMemo(() => ({
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 15, 20, 25],
    domLayout: 'autoHeight',
    rowSelection: 'single',
    animateRows: true,
    enableCellTextSelection: true,
    suppressDragLeaveHidesColumns: true,
  }), [])

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), [])
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), [])

  const defaultColDef = useMemo(() => {
    return {
      flex: 10,
      filter: true
    }
  }, [])

  const mergedGridOptions = useMemo(() => ({
    ...defaultGridOptions,
    ...gridOptions,
  }), [defaultGridOptions, gridOptions])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div style={containerStyle}>
      <DataTableHeader
        title={headerTitle}
        onAdd={onAdd}
        buttonText={buttonText}
        addIcon={<PlusOutlined />}
        style={{ marginBottom: '10px' }}
      /> 
      <div
        style={gridStyle}
        className="ag-theme-quartz"
      >
        <AgGridReact
          ref={gridRef}
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellClicked={onCellClicked}
          onRowSelected={onRowSelected}
          {...mergedGridOptions}
        >
        </AgGridReact>
      </div>
    </div>
  )
}

export default DataTable