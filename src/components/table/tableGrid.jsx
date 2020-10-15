import React from "react";

const TableGrid = ({ gridSize, activeCell, currentRow }) => {
  let tableData = getRows(gridSize);
  return (
    <div className="container">
      <table className="table-bordered table-grid">
        <tbody>
          {tableData["rows"].map((row, rowIndex) => {
            let current_index = rowIndex + 1;
            return (
              <tr key={row}>
                {tableData["rows"].map((column, activeIndex) => {
                  let active_index = activeIndex + 1;
                  return (
                    <td
                      key={column}
                      className={
                        (currentRow === current_index) && (active_index === activeCell) ? "active-cell" : ""
                      }
                    >
                      &nbsp;
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const getRows = gridSize => {
  const rows = [];
  for (let index = 1; index < gridSize + 1; index++) {
    rows.push(index);
  }
  return { rows: rows };
};

export default TableGrid;
