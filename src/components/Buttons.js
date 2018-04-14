import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const Buttons = ({
  onClickRun, onClickPause, onClickClear, onClickGenerate,
}) => (
  <div style={{ margin: '20px' }}>
    <RaisedButton label="Run" style={style} onClick={onClickRun} />
    <RaisedButton label="Pause" style={style} onClick={onClickPause} />
    <RaisedButton label="Clear" style={style} onClick={onClickClear} />
    <RaisedButton label="Generate" style={style} onClick={onClickGenerate} />
  </div>
);

export default Buttons;
