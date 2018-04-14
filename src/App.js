import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Buttons from './components/Buttons';
import Cell from './components/Cell';

const styles = {
  title: {
    fontWeight: '400',
    fontSize: '28px',
  },
};

const gridCell = [
  <div>
    <Cell id={0} />
    <Cell id={1} />
    <Cell id={2} />
    <Cell id={3} />
  </div>,
];


class App extends Component {
  state = {
    play: false,
  }

  // initGrid() {
  //   gridCell.push();
  // }


  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <h1 style={styles.title}>Game of life</h1>
          <Buttons />
          {gridCell}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
