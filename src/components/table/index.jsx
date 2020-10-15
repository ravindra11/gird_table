import React, { Component } from "react";
import TableGrid from "./tableGrid";

class Table extends Component {

  constructor() {
    super();
    this.state = this.getInitialState();
    this.onGridValueChange = this.onGridValueChange.bind(this);
    this.onArrowKeysClick = this.onArrowKeysClick.bind(this);
  }

  getInitialState() {
    return {
      gridData: { gridSize: 4, noOfMoves: 200 },
      activeCellnColumn: 1,
      movesCount: 0,
      moves: [],
      currentRow: 1,
      currentCol: 1
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onArrowKeysClick);
  }

  onGridValueChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(PrevState => ({ ...this.getInitialState(), gridData: { ...PrevState.gridData, [name]: Number(value) }, }));
  };

  onArrowKeysClick = e => {
    const key_codes = [37, 38, 39, 40];
    const code = e.keyCode;
    if (key_codes.includes(code)) {
      const moves = [...this.state.moves];
      const { currentRow, gridData: { gridSize } } = this.state;
      let activeCellnColumn = parseInt(this.state.activeCellnColumn),
        movesCount = parseInt(this.state.movesCount);
      if (movesCount === parseInt(this.state.gridData.noOfMoves)) {
        alert("Moves completed");
        return;
      }
      movesCount = movesCount + 1;
      let current_row, active_cell;
      switch (code) {
        case 37:
          active_cell = (activeCellnColumn !== 1) ? activeCellnColumn - 1 : gridSize;
          if (currentRow === 1 && (activeCellnColumn === 1)) {
            current_row = gridSize;
          } else {
            current_row = (activeCellnColumn === 1) ? currentRow - 1 : currentRow;
          }
          break;
        case 38:
          active_cell = activeCellnColumn;
          current_row = (currentRow === 1) ? gridSize : currentRow - 1;
          break;
        case 39:
          active_cell = activeCellnColumn === gridSize ? 1 : activeCellnColumn + 1;
          if (activeCellnColumn === gridSize && currentRow === gridSize) {
            current_row = 1;
          } else {
            current_row = (activeCellnColumn === gridSize) && (currentRow !== gridSize) ? currentRow + 1 : currentRow;
          }
          break;
        case 40:
          active_cell = activeCellnColumn;
          current_row = (currentRow === gridSize) ? 1 : currentRow + 1;
          break;
        default:
          break;
      }
      moves.push([active_cell, current_row]);
      this.setState({ activeCellnColumn: active_cell, moves, movesCount, currentRow: current_row, currentCol: active_cell });
    }
  };


  render() {
    const { gridData: { gridSize, noOfMoves }, currentRow, activeCellnColumn } = this.state;
    return (
      <>
        <form style={{ width: "35%", float: "right" }}>
          <div className="row">
            <div className="form-group" style={{ marginRight: "4px" }}>
              <label htmlFor="rows">Grid size</label>
              <input
                type="text"
                name="gridSize"
                value={gridSize}
                className="form-control"
                onChange={this.onGridValueChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="columns">No of steps</label>
              <input
                type="number"
                name="noOfMoves"
                className="form-control"
                value={noOfMoves}
                onChange={this.onGridValueChange}
                required={true}
              />
            </div>
          </div>
        </form>
        <div className="text-center mt-4 mb-4">
          <p className="text-primary">Moves([left, top])</p>
          <h4>{JSON.stringify(this.state.moves)}</h4>
        </div>
        <TableGrid
          gridSize={gridSize}
          activeCell={activeCellnColumn}
          currentRow={currentRow}
        ></TableGrid>
      </>
    );
  }
}

export default Table;
