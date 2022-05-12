function addGenerator_9028b(Blockly) {
  Blockly.Python['delay'] = function(block) {
    var number_delay = block.getFieldValue('delay');
    var code = `time.sleep(${number_delay})\n`;
    return code;
  };

  Blockly.Python['while'] = function(block) {
    var statements_while = Blockly.Python.statementToCode(block, 'while');
    // TODO: Assemble Python into code variable.
    var code = 'while True:\n';
    return code;
  };
}

exports = addGenerator_9028b;