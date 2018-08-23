import React, { Component, Fragment } from "react";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

const style = {
  textAlign: "left",
  margin: "8px 20px"
};

class RulesDialogButton extends Component {
  state = {
    isOpen: false
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const actions = [
      <RaisedButton label="OK" keyboardFocused onClick={this.handleClose} />
    ];

    return (
      <Fragment>
        <RaisedButton
          label="Rules"
          onClick={this.handleOpen}
          style={{ margin: 12 }}
        />

        <Dialog
          title="Rules of the game"
          actions={actions}
          modal={false}
          open={this.state.isOpen}
          onRequestClose={this.handleClose}
          style={style}
        >
          <p style={style}>
            &quot; This is a zero-player game where every colored cell
            represents a cell. Every cell interacts with its eight neighbours,
            which are the cells that are horizontally, vertically, or diagonally
            adjacent. At each step in time, the following transitions occur:
          </p>

          <ol style={style}>
            <li style={style}>
              Any live cell with fewer than two live neighbours dies, as if
              caused by underpopulation.
            </li>
            <li style={style}>
              Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li style={style}>
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.
            </li>
            <li style={style}>
              {" "}
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction. &quot;
            </li>
          </ol>
          <p style={style}>
            Rules and explanation further described{" "}
            <a
              style={{ textDecoration: "none" }}
              href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            >
              here
            </a>
            .
          </p>
        </Dialog>
      </Fragment>
    );
  }
}

export default RulesDialogButton;
