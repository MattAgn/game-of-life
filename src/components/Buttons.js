import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

import RulesDialogButton from "./RulesDialogButton";

const styles = {
  button: {
    margin: 12
  }
};

const Buttons = ({ onClickRun, onClickGenerate, onClickClear, labelRun }) => (
  <div style={{ margin: "20px" }}>
    <RaisedButton label={labelRun} style={styles.button} onClick={onClickRun} />
    <RaisedButton label="Clear" style={styles.button} onClick={onClickClear} />
    <RaisedButton
      label="Generate"
      style={styles.button}
      onClick={onClickGenerate}
    />

    <RulesDialogButton buttonStyle={styles.button} />
  </div>
);

Buttons.propTypes = {
  onClickRun: PropTypes.func.isRequired,
  onClickClear: PropTypes.func.isRequired,
  onClickGenerate: PropTypes.func.isRequired,
  labelRun: PropTypes.string.isRequired
};

export default Buttons;
