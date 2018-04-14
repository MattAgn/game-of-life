import React from 'react';


const style = {
  height: '10px',
  width: '10px',
  backgroundColor: 'white',
  border: 'solid 0.5px black',
};


export default class Cell extends React.Component {
  state = {
    isAlive: false,
  }

  render() {
    return (
      <div style={style} />
    );
  }
}
