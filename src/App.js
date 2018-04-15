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
    margin: '20px auto',
    boxShadow: 'rgba(0,0,0,0.19) 0px 10px 30px, rgba(0,0,0,0.23) 0px 6px 10px',
    borderRadius: '2px',
  },
  row: {
    display: 'flex',
  },
};

const gridSize = [45, 70];

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
  const gridHeight = gridSize[0];
  const cellIndex = cellId % gridSize[1];
  const rowId = Math.floor(cellId / gridSize[1]);
  // center right
  if (cellIndex + 1 < gridSize[1] && cellGrid[rowId][cellIndex + 1].isAlive[generation]) {
    result++;
  }
  // center left
  if (cellIndex > 0 && cellGrid[rowId][cellIndex - 1].isAlive[generation]) {
    result++;
  }
  // bottom center
  if (rowId + 1 < gridSize[0] && cellGrid[rowId + 1][cellIndex].isAlive[generation]) {
    result++;
  }
  // top center
  if (rowId > 0 && cellGrid[rowId - 1][cellIndex].isAlive[generation]) {
    result++;
  }
  // top left
  if (rowId > 0 && cellIndex > 0
    && cellGrid[rowId - 1][cellIndex - 1].isAlive[generation]) {
    result++;
  }
  // top right
  if (rowId > 0 && cellIndex + 1 < gridSize[1]
    && cellGrid[rowId - 1][cellIndex + 1].isAlive[generation]) {
    result++;
  }
  // bottom right
  if ((rowId + 1 < gridHeight) && (cellIndex + 1 < gridSize[1])
    && cellGrid[rowId + 1][cellIndex + 1].isAlive[generation]) {
    result++;
  }
  // bottom left
  if (rowId + 1 < gridSize[0] && cellIndex > 0
    && cellGrid[rowId + 1][cellIndex - 1].isAlive[generation]) {
    result++;
  }
  return result;
};


class App extends Component {
  state = {
    isRunning: true,
    generation: 0,
    cellGrid: initGrid(),
    labelRun: 'Pause',
    speed: 1,
  }

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

  handleClickCell = (cellId) => {
    const rowId = Math.floor(cellId / gridSize[1]);
    const grid = this.state.cellGrid;
    grid[rowId][cellId % gridSize[1]].isAlive[this.state.generation] = true;
    grid[rowId][cellId % gridSize[1]].justBorn = true;
    this.setState({ cellGrid: grid });
  }

  handleClickRun = () => this.setState((prevState) => {
    if (prevState.isRunning) return { isRunning: false, labelRun: 'Run' };
    return { isRunning: true, labelRun: 'Pause' };
  });

  handleClickClear = () => {
    const grid = this.state.cellGrid;
    grid.forEach((row) => {
      row.forEach((cell) => {
        cell.isAlive = [false];
        cell.justBorn = false;
      });
    });
    this.setState({
      cellGrid: grid, generation: 0, isRunning: false, labelRun: 'Run',
    });
  }

  handleClickGenerate = () => {
    this.setState({ isRunning: false, labelRun: 'Run' });
    this.generateGridRandom();
  };

  generateGridRandom(probability = 0.75) {
    const grid = this.state.cellGrid;
    grid.forEach((row) => {
      row.forEach((cell) => {
        cell.justBorn = false;
        if (Math.random() > probability) {
          cell.isAlive = [true];
          cell.justBorn = true;
        } else {
          cell.isAlive = [false];
        }
      });
    });
    this.setState({
      cellGrid: grid, generation: 0,
    });
  }


  nextGeneration() {
    const grid = this.state.cellGrid;
    const nextGen = this.state.generation + 1;
    // console.log('next gen', nextGen);
    grid.forEach((row) => {
      row.forEach((cell) => {
        // console.log('Cell', cell);
        const nbNeighbours = countNeighbours(cell.id, grid, this.state.generation);
        if (cell.isAlive[this.state.generation]) {
          if (nbNeighbours < 2 || nbNeighbours > 3) {
            cell.isAlive[nextGen] = false;
            // console.log(cell);
          } else {
            cell.isAlive[nextGen] = true;
          }
          cell.justBorn = false;
        } else if (nbNeighbours === 3) {
          // console.log('dead cell : ', cell);
          cell.isAlive[nextGen] = true;
          cell.justBorn = true;
        } else {
          cell.isAlive[nextGen] = false;
        }
      });
    });
    this.setState({ generation: nextGen, cellGrid: grid });
  }

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
          <h3 style={styles.generation}> Generation: {this.state.generation}</h3>
          <div style={styles.gridContainer}>
            {this.state.cellGrid.map(row => (
              <div style={styles.row} key={row[0].id / gridSize[1]}>
                {row.map(cell => (
                  <Cell
                    key={cell.id}
                    id={cell.id}
                    isAlive={cell.isAlive[this.state.generation]}
                    justBorn={cell.justBorn}
                    onClickCell={this.handleClickCell.bind(this, cell.id)}
                  />
                ))}
              </div>))}
          </div>
          <div>
            <p style={{ fontWeight: 300, margin: '10px' }}>
              You can add cells while it's running.
              Orange cells have just been born, red cells are older.
            </p>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
