import React from 'react';

const Cell = ({ justBorn, isAlive, id }) => {
  const style = {
    height: '10px',
    width: '10px',
    backgroundColor: 'white',
  };

  if (justBorn === true) {
    style.backgroundColor = '#B71C1C';
  } else if (isAlive === true) {
    style.backgroundColor = '#F44336';
  } else {
    style.backgroundColor = 'white';
  }

  return (
    <div style={style} id={id} />
  );
};

export default Cell;
