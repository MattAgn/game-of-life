import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import './App.css';
import Buttons from './components/Buttons';
import Cell from './components/Cell';

const styles = {
  title: {
    fontWeight: '400',
    fontSize: '28px',
  },
  generation: {
    fontWeight: '300',
  },
  gridContainer: {
    margin: '30px auto',
  },
  row: {
    display: 'flex',
  },
};

const gridSize = [40, 60];

const initGrid = () => {
  let id = 0;
  const grid = [];
  for (let i = 0; i < gridSize[0]; i++) {
    const row = [];
    for (let j = 0; j < gridSize[1]; j++) {
      row.push({ id });
      id++;
    }
    grid.push(row);
  }
  return grid;
};

const countNeighbours = (cellId, cellGrid, generation) => {
  let result = 0;
  const rowId = Math.floor(cellId / gridSize[1]);
  if (cellGrid[rowId][cellId + 1].isAlive[generation]) {
    result++;
  }
  if (cellGrid[rowId][cellId - 1].isAlive[generation]) {
    result++;
  }
  if (cellGrid[rowId + 1][cellId].isAlive[generation]) {
    result++;
  }
  if (cellGrid[rowId - 1][cellId].isAlive[generation]) {
    result++;
  }
  return result;
};


class App extends Component {
  state = {
    isRunning: false,
    isCleared: true,
    generation: 0,
    cellGrid: initGrid(),
  }

  componentWillMount() {
    this.generateGridRandom();
  }

  handleClickRun = () => {
    this.setState({ isRunning: true });
    this.nextGeneration();
  }

  handleClickPause = () => this.setState({ isRunning: false });

  handleClickClear = () => this.clearGrid();

  handleClickGenerate = () => this.generateGridRandom();

  generateGridRandom(probability = 0.75) {
    const grid = this.state.cellGrid;
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (Math.random() > probability) {
          cell.isAlive = [true];
        } else {
          cell.isAlive = [false];
        }
      });
    });
    this.setState({ cellGrid: grid, isCleared: false, generation: 0 });
  }

  clearGrid() {
    const grid = this.state.cellGrid;
    grid.forEach((row) => {
      row.forEach((cell) => {
        cell.isAlive = [false];
      });
    });
    this.setState({ cellGrid: grid, isCleared: true, generation: 0 });
  }

  nextGeneration() {
    const grid = this.state.cellGrid;
    const nextGen = this.state.generation + 1;
    grid.forEach((row) => {
      row.forEach((cell) => {
        const nbNeighbours = countNeighbours(cell.id, grid, this.state.generation);
        if (cell.isAlive[this.state.generation]) {
          if (nbNeighbours < 2 || nbNeighbours > 3) {
            cell.isAlive[nextGen] = false;
          } else {
            cell.isAlive[nextGen] = true;
          }
        } else if (nbNeighbours === 3) {
          cell.isAlive[nextGen] = true;
        }
      });
    });
    this.setState({ generation: nextGen });
    if (this.state.isRunning === true) {
      this.nextGeneration();
    }
  }


  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <h1 style={styles.title}>Game of life</h1>
          <Buttons
            onClickRun={this.handleClickRun.bind(this)}
            onClickClear={this.handleClickClear.bind(this)}
            onClickGenerate={this.handleClickGenerate.bind(this)}
            onClickPause={this.handleClickPause.bind(this)}
          />
          <h3 style={styles.generation}> Generation: {this.state.generation}</h3>
          <div style={styles.gridContainer}>
            {this.state.cellGrid.map(row => (
              <div style={styles.row} key={row[0].id / gridSize[1]}>
                {row.map(cell =>
                  (<Cell
                    key={cell.id}
                    id={cell.id}
                    isAlive={cell.isAlive[this.state.generation]}
                  />))}
              </div>))}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
