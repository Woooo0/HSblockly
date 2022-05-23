function addGenerator_9028b(Blockly) {
  Blockly.Python['delay'] = function (block) {
    var number_delay = block.getFieldValue('delay');
    Blockly.Python.definitions_[`import utime`] = `import utime`;
    var code = `utime.sleep_ms(${number_delay})\n`;
    return code;
  };
  Blockly.Python['loop'] = function (block) {
    var statements_name = Blockly.Python.statementToCode(block, 'loop');
    var code = `while True:\n${statements_name}`;
    return code;
  };
  Blockly.Python['while'] = function(block) {
    var value_name = Blockly.Python.valueToCode(block, 'while', Blockly.Python.ORDER_NONE);
    Blockly.Python.definitions_[`import utime`] = `import utime`;
    var code = `while (${value_name} == False):\n  utime.sleep_ms(1000)\n`;
    return code;
  };
  Blockly.Python['string'] = function (block) {
    var text_string = block.getFieldValue('string');
    var code = `"${text_string}"`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };
  Blockly.Python['print'] = function (block) {
    var dropdown_line_breads = block.getFieldValue('line_breaks');
    var value_print = Blockly.Python.valueToCode(block, 'print', Blockly.Python.ORDER_ATOMIC);
    if (dropdown_line_breads == "line_true") {
      var code = `print(${value_print})\n`;
    }
    else {
      var code = `print(${value_print}, end ="")\n`;
    }
    return code;
  };
  Blockly.Python['motor'] = function(block) {
    var dropdown_pin = block.getFieldValue('pin');
    var dropdown_option = block.getFieldValue('option');
    var text_speed = block.getFieldValue('speed');
    Blockly.Python.definitions_[`from motor import Motor`] = `from motor import Motor`;
    Blockly.Python.definitions_[`motor${dropdown_pin} = Motor(${dropdown_pin})`] = `motor${dropdown_pin} = Motor(${dropdown_pin})`;
    if (dropdown_option == "forward") {
      var code = `motor${dropdown_pin}.speed(int(${text_speed}))\nmotor${dropdown_pin}.forward()\n`;
    }
    else {
      var code = `motor${dropdown_pin}.speed(int(${text_speed}))\nmotor${dropdown_pin}.backward()\n`;
    }
    return code;
  };
  Blockly.Python['motor_stop'] = function(block) {
    var dropdown_pin = block.getFieldValue('pin');
    Blockly.Python.definitions_[`from motor import Motor`] = `from motor import Motor`;
    Blockly.Python.definitions_[`motor${dropdown_pin} = Motor(${dropdown_pin})`] = `motor${dropdown_pin} = Motor(${dropdown_pin})`;
    var code = `motor${dropdown_pin}.stop()\n`;
    return code;
  };
  Blockly.Python['led'] = function(block) {
    var dropdown_pin = block.getFieldValue('pin');
    var dropdown_option = block.getFieldValue('option');
    Blockly.Python.definitions_[`from led import Led`] = `from led import Led`;
    Blockly.Python.definitions_[`led${dropdown_pin} = Led(${dropdown_pin})`] = `led${dropdown_pin} = Led(${dropdown_pin})`;
    if (dropdown_option == "on") {
      var code = `led${dropdown_pin}.on()\n`;
    }
    else {
      var code = `led${dropdown_pin}.off()\n`;
    }
    return code;
  };
  Blockly.Python['ultrasonic'] = function(block) {
    var dropdown_pin = block.getFieldValue('pin');
    Blockly.Python.definitions_[`from ultrasonic import Ultrasonic`] = `from ultrasonic import Ultrasonic`;
    Blockly.Python.definitions_[`ultrasonic${dropdown_pin} = Ultrasonic(${dropdown_pin})`] = `ultrasonic${dropdown_pin} = Ultrasonic(${dropdown_pin})`;
    var code = `ultrasonic${dropdown_pin}.read()`;
    return [code, Blockly.Python.ORDER_ATOMIC];
  };
}

exports = addGenerator_9028b;