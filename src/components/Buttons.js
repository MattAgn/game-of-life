import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

const styles = {
  button: {
    margin: 12,
  },
  text: {
    textAlign: 'left',
    margin: '8px 20px',
  },
};

export default class Buttons extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      onClickRun, onClickClear, onClickGenerate, labelRun,
    } = this.props;

    const actions = [
      <RaisedButton
        label="OK"
        keyboardFocused
        onClick={this.handleClose}
      />,
    ];

    return (
      <div style={{ margin: '20px' }}>
        <RaisedButton label={labelRun} style={styles.button} onClick={onClickRun} />
        <RaisedButton label="Clear" style={styles.button} onClick={onClickClear} />
        <RaisedButton label="Generate" style={styles.button} onClick={onClickGenerate} />

        <RaisedButton label="Rules" onClick={this.handleOpen} style={styles.button} />
        <Dialog
          title="Rules of the game"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={styles.text}
        >
          <p style={styles.text}>
            &quot; Every cell interacts with its eight neighbours, which are the cells
            that are horizontally, vertically, or diagonally adjacent. At each step in time,
            the following transitions occur:
          </p>

          <ol style={styles.text}>
            <li style={styles.text}>Any live cell with fewer than two live neighbours dies,
              as if caused by underpopulation.
            </li>
            <li style={styles.text}>Any live cell with two or three live neighbours
              lives on to the next generation.
            </li>
            <li style={styles.text}>Any live cell with more than three live neighbours dies,
              as if by overpopulation.
            </li>
            <li style={styles.text}>  Any dead cell with exactly three live neighbours
              becomes a live cell, as if by reproduction. &quot;
            </li>
          </ol>
          <p style={styles.text}>
            Rules and explanation further described <a style={{ textDecoration: 'none' }} href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" >here</a>.
          </p>
        </Dialog>
      </div>
    );
  }
}
