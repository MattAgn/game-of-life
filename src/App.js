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
  const gridDOM = [];
  for (let i = 0; i < gridSize[0]; i++) {
    const row = [];
    const rowDOM = [];
    for (let j = 0; j < gridSize[1]; j++) {
      row.push({ id });
      rowDOM.push(<Cell key={id} />);
      id++;
    }
    grid.push(row);
    gridDOM.push(<div style={styles.row}>{rowDOM}</div>);
  }
  return { grid, gridDOM };
};


class App extends Component {
  state = {
    isRunning: false,
    isCleared: true,
    generation: 0,
  }

  constructor() {
    super();
    const { grid, gridDOM } = initGrid();
    this.state.cellGrid = grid;
    this.state.gridDOM = gridDOM;
  }

  handleClickRun = () => this.setState({ isRunning: true });

  handleClickPause = () => this.setState({ isRunning: false });

  handleClickClear = () => this.setState({ isCleared: true, generation: 0 });

  handleClickGenerate = () => this.setState({ isCleared: false });

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
            {this.state.gridDOM}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
