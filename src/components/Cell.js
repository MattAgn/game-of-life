import React from 'react';
import '../style.css';

const Cell = ({
  justBorn, isAlive, id, onClickCell,
}) => {
  const style = {
    // height: '10px',
    // width: '10px',
    backgroundColor: 'white',
    cursor: 'pointer',
  };

  if (justBorn === true) {
    style.backgroundColor = '#FFA726';
  } else if (isAlive === true) {
    style.backgroundColor = '#F44336';
  } else {
    style.backgroundColor = 'white';
  }

  return (
    <div tabIndex={0} style={style} id={id} onClick={onClickCell} role="button" className="cell" />
  );
};

export default Cell;
