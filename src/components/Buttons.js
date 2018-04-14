import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const Buttons = () => (
  <div style={{ margin: '20px' }}>
    <RaisedButton label="Run" style={style} />
    <RaisedButton label="Pause" style={style} />
    <RaisedButton label="Clear" style={style} />
    <RaisedButton label="Generate" style={style} />
  </div>
);

export default Buttons;
