import React, { Component } from "react";
import PropTypes from "prop-types";

const Cell = ({ justBorn, isAlive, id, onClickCell, size }) => {
  let backgroundColor;
  if (justBorn === true) {
    backgroundColor = "#FFA726";
  } else if (isAlive === true) {
    backgroundColor = "#F44336";
  } else {
    backgroundColor = "white";
  }

  const style = {
    height: `${size}px`,
    width: `${size}px`,
    backgroundColor,
    cursor: "pointer"
  };

  return (
    <div
      tabIndex={0}
      style={style}
      id={id}
      onClick={onClickCell}
      role="button"
    />
  );
};

Cell.propTypes = {
  justBorn: PropTypes.bool.isRequired,
  isAlive: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  onClickCell: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired
};

export default Cell;
