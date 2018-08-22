import React, { Component } from "react";
import PropTypes from "prop-types";

class Cell extends Component {
  constructor(props) {
    super(props);
    const backgroundColor = this.updateCellColor();
    this.state = {
      height: "10px",
      width: "10px",
      backgroundColor
    };
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updateCellSize);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateCellSize);
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (
      this.props.isAlive !== nextProps.isAlive ||
      this.props.justBorn !== nextProps.justBorn
    ) {
      this.updateCellColor();
      return true;
    }
    return false;
  };

  updateCellSize = () => {
    this.setState({
      height: 1.3 * window.innerHeight,
      width: 1.3 * window.innerWidth
    });
  };

  updateCellColor = () => {
    let backgroundColor;
    if (this.props.justBorn === true) {
      backgroundColor = "#FFA726";
    } else if (this.props.isAlive === true) {
      backgroundColor = "#F44336";
    } else {
      backgroundColor = "white";
    }
    return backgroundColor;
  };

  render() {
    const { id, onClickCell } = this.props;
    const { height, width, backgroundColor } = this.state;

    return (
      <div
        tabIndex={0}
        style={{ cursor: "pointer", height, width, backgroundColor }}
        id={id}
        onClick={onClickCell}
        role="button"
      />
    );
  }
}

Cell.propTypes = {
  justBorn: PropTypes.bool.isRequired,
  isAlive: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  onClickCell: PropTypes.func.isRequired
};

export default Cell;
