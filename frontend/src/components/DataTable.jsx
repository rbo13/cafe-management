import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const DataTable = ({
  data = [],
  columnDefs,
  isLoading,
  error,
  gridOptions = {},
  onCellClicked,
  onRowSelected,
}) => {
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

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef = useMemo(() => {
    return {
      flex: 10,
    };
  }, []);

  const mergedGridOptions = useMemo(() => ({
    ...defaultGridOptions,
    ...gridOptions,
  }), [defaultGridOptions, gridOptions])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div style={containerStyle}>
      <div
        style={gridStyle}
        className="ag-theme-quartz"
      >
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellClicked={onCellClicked}
          onRowSelected={onRowSelected}
          {...mergedGridOptions}
        />
      </div>
    </div>
  )
}

export default DataTable