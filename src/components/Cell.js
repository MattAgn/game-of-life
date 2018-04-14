import React from 'react';

const Cell = ({ isAlive, id }) => {
  const style = {
    height: '10px',
    width: '10px',
    backgroundColor: 'white',
    border: 'solid 0.5px black',
  };

  if (isAlive === true) {
    style.backgroundColor = 'red';
  }

  return (
    <div style={style} id={id} />
  );
};

export default Cell;
