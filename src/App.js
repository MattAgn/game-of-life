import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./style.css";

import Buttons from "./components/Buttons";
import Cell from "./components/Cell";

const styles = {
  title: {
    fontWeight: "400",
    fontSize: "28px",
    paddingTop: "30px"
  },
  generation: {
    fontWeight: "300"
  },
  gridContainer: {
    margin: "20px auto",
    boxShadow: "rgba(0,0,0,0.19) 0px 10px 30px, rgba(0,0,0,0.23) 0px 6px 10px",
    borderRadius: "2px"
  },
  row: {
    display: "flex"
  }
};

const initGrid = (nbRows, nbCols) => {
  let id = 0;
  const grid = [];
  for (let i = 0; i < nbRows; i++) {
    const row = [];
    for (let j = 0; j < nbCols; j++) {
      row.push({ id });
      id++;
    }
    grid.push(row);
  }
  return grid;
};

class App extends Component {
  constructor() {
    super();
    this.nbRows = 45;
    this.nbCols = 70;
    this.state.cellGrid = initGrid(this.nbRows, this.nbCols);
  }

  state = {
    isRunning: true,
    generation: 0,
    labelRun: "Pause"
  };

  componentWillMount() {
    this.generateGridRandom();
    setTimeout(() => {
      if (this.state.isRunning === true) {
        this.nextGeneration();
      }
    }, 1000);
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.isRunning === true) {
        this.nextGeneration();
      }
    }, 100);
  }

  handleClickCell = cellId => {
    const rowId = Math.floor(cellId / this.nbCols);
    const grid = this.state.cellGrid;
    grid[rowId][cellId % this.nbCols].isAlive = true;
    grid[rowId][cellId % this.nbCols].justBorn = true;
    this.setState({ cellGrid: grid });
  };

  handleClickRun = () =>
    this.setState(prevState => {
      if (prevState.isRunning) return { isRunning: false, labelRun: "Run" };
      return { isRunning: true, labelRun: "Pause" };
    });

  handleClickClear = () => {
    const grid = this.state.cellGrid;
    grid.forEach(row => {
      row.forEach(cell => {
        cell.isAlive = false;
        cell.justBorn = false;
      });
    });
    this.setState({
      cellGrid: grid,
      generation: 0,
      isRunning: false,
      labelRun: "Run"
    });
  };

  handleClickGenerate = () => {
    this.setState({ isRunning: false, labelRun: "Run" });
    this.generateGridRandom();
  };

  generateGridRandom(probability = 0.75) {
    const grid = this.state.cellGrid;
    grid.forEach(row => {
      row.forEach(cell => {
        cell.justBorn = false;
        if (Math.random() > probability) {
          cell.isAlive = true;
          cell.justBorn = true;
        } else {
          cell.isAlive = false;
        }
      });
    });
    this.setState({
      cellGrid: grid,
      generation: 0
    });
  }

  nextGeneration() {
    const newGrid = JSON.parse(JSON.stringify(this.state.cellGrid));
    for (let i = 0; i < this.nbRows; i++) {
      for (let j = 0; j < this.nbCols; j++) {
        const nbNeighbours = this.countNeighbours(i, j);
        const cell = Object.assign({}, newGrid[i][j]);
        if (cell.isAlive) {
          if (nbNeighbours < 2 || nbNeighbours > 3) {
            cell.isAlive = false;
          }
          cell.justBorn = false;
        } else if (nbNeighbours === 3) {
          cell.isAlive = true;
          cell.justBorn = true;
        }
        newGrid[i][j] = cell;
      }
    }
    this.setState(prevState => ({
      generation: prevState.generation + 1,
      cellGrid: newGrid
    }));
  }

  countNeighbours = (cellRow, cellCol) => {
    let result = 0;
    const grid = this.state.cellGrid;
    // center right
    if (cellCol + 1 < this.nbCols && grid[cellRow][cellCol + 1].isAlive) {
      result++;
    }
    // center left
    if (cellCol > 0 && grid[cellRow][cellCol - 1].isAlive) {
      result++;
    }
    // bottom center
    if (cellRow + 1 < this.nbRows && grid[cellRow + 1][cellCol].isAlive) {
      result++;
    }
    // top center
    if (cellRow > 0 && grid[cellRow - 1][cellCol].isAlive) {
      result++;
    }
    // top left
    if (cellRow > 0 && cellCol > 0 && grid[cellRow - 1][cellCol - 1].isAlive) {
      result++;
    }
    // top right
    if (
      cellRow > 0 &&
      cellCol + 1 < this.nbCols &&
      grid[cellRow - 1][cellCol + 1].isAlive
    ) {
      result++;
    }
    // bottom right
    if (
      cellRow + 1 < this.nbRows &&
      cellCol + 1 < this.nbCols &&
      grid[cellRow + 1][cellCol + 1].isAlive
    ) {
      result++;
    }
    // bottom left
    if (
      cellRow + 1 < this.nbRows &&
      cellCol > 0 &&
      grid[cellRow + 1][cellCol - 1].isAlive
    ) {
      result++;
    }
    return result;
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <h1 style={styles.title}>Game of life</h1>
          <Buttons
            onClickRun={this.handleClickRun.bind(this)}
            labelRun={this.state.labelRun}
            onClickClear={this.handleClickClear.bind(this)}
            onClickGenerate={this.handleClickGenerate.bind(this)}
          />
          <h3 style={styles.generation}>
            {" "}
            Generation: {this.state.generation}
          </h3>
          <div style={styles.gridContainer} className="board">
            {this.state.cellGrid.map(row => (
              <div style={styles.row} key={row[0].id / this.nbCols}>
                {row.map(cell => (
                  <Cell
                    key={cell.id}
                    id={cell.id}
                    isAlive={cell.isAlive}
                    justBorn={cell.justBorn}
                    onClickCell={this.handleClickCell.bind(this, cell.id)}
                  />
                ))}
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontWeight: 300, margin: "10px" }}>
              You can add cells while it's running. Orange cells have just been
              born, red cells are older.
            </p>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
