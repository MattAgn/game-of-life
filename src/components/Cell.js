import React from 'react';


const style = {
  height: '20px',
  width: '20px',
  backgroundColor: 'white',
  border: 'solid 1px black',
};


export default class Cell extends React.Component {
  state = {
    alive: false,
  }

  render() {
    return (
      <div style={style}>.</div>
    );
  }
}
