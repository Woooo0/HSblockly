function addGenerator_9028b(Blockly) {
  Blockly.Python['delay'] = function(block) {
    var number_delay = block.getFieldValue('delay');
    var code = `time.sleep(${number_delay})\n`;
    return code;
  };
  Blockly.Python['print'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'print', Blockly.Python.ORDER_ATOMIC);
    var code = `print(${value_name})\n`;
    return code;
  };
  // Blockly.Python['println'] = function(block) {
  //   var number_delay = block.getFieldValue('delay');
  //   var code = `time.sleep(${number_delay})\n`;
  //   return code;
  // };
}

exports = addGenerator_9028b;