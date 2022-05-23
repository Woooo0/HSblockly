function addBlocks_9028b(Blockly) {
    Blockly.Blocks['delay'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "delay",
                    "message0": Blockly.Msg.MAIN_DELAY,
                    "args0": [
                        {
                            "type": "field_number",
                            "name": "delay",
                            "value": 1000
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#5CACEE",
                    "tooltip": "",
                    "helpUrl": ""
                });
        }
    }
    Blockly.Blocks['loop'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "loop",
                    "message0": Blockly.Msg.MAIN_LOOP,
                    "args0": [
                        {
                            "type": "input_dummy"
                        },
                        {
                            "type": "input_statement",
                            "name": "loop"
                        }
                    ],
                    "previousStatement": null,
                    "colour": "#5CACEE",
                    "tooltip": "",
                    "helpUrl": ""
                });
        }
    }
    Blockly.Blocks['while'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "while",
                    "message0": Blockly.Msg.MAIN_WHILE,
                    "args0": [
                        {
                            "type": "input_value",
                            "name": "while"
                        }
                    ],
                    "inputsInline": true,
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#5CACEE",
                    "tooltip": "",
                    "helpUrl": ""
                });
        }
    }
    Blockly.Blocks['string'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "string",
                    "message0": Blockly.Msg.MAIN_STRING,
                    "args0": [
                        {
                            "type": "field_input",
                            "name": "string",
                            "text": "Hello KmEducation"
                        }
                    ],
                    "inputsInline": true,
                    "output": null,
                    "colour": "#9AC0CD",
                    "tooltip": "",
                    "helpUrl": ""
                });
        }
    }

    Blockly.Blocks['print'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "print",
                    "message0": Blockly.Msg.PRINT,
                    "args0": [
                        {
                            "type": "field_dropdown",
                            "name": "line_breaks",
                            "options": [
                                [
                                    "自动换行",
                                    "line_true"
                                ],
                                [
                                    "不自动换行",
                                    "line_false"
                                ]
                            ]
                        },
                        {
                            "type": "input_value",
                            "name": "print"
                        }
                    ],
                    "inputsInline": false,
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#9966ff",
                    "tooltip": "",
                    "helpUrl": ""
                });
        }
    }
    Blockly.Blocks['motor'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "motor",
                    "message0": Blockly.Msg.MOTOR,
                    "args0": [
                      {
                        "type": "field_dropdown",
                        "name": "pin",
                        "options": [
                          [
                            "A",
                            "1"
                          ],
                          [
                            "B",
                            "2"
                          ]
                        ]
                      },
                      {
                        "type": "field_dropdown",
                        "name": "option",
                        "options": [
                          [
                            "正转",
                            "forward"
                          ],
                          [
                            "反转",
                            "backward"
                          ]
                        ]
                      },
                      {
                        "type": "field_input",
                        "name": "speed",
                        "text": "5"
                      }
                    ],
                    "inputsInline": false,
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#9AC0CD",
                    "tooltip": "",
                    "helpUrl": ""
                  });
        }
    }
    Blockly.Blocks['motor_stop'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "motor_stop",
                    "message0": "接口 %1 电机停止",
                    "args0": [
                      {
                        "type": "field_dropdown",
                        "name": "pin",
                        "options": [
                          [
                            "A",
                            "1"
                          ],
                          [
                            "B",
                            "2"
                          ]
                        ]
                      }
                    ],
                    "inputsInline": false,
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#9AC0CD",
                    "tooltip": "",
                    "helpUrl": ""
                  });
        }
    }
    Blockly.Blocks['led'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "led",
                    "message0": Blockly.Msg.LED,
                    "args0": [
                      {
                        "type": "field_dropdown",
                        "name": "pin",
                        "options": [
                          [
                            "C",
                            "1"
                          ],
                          [
                            "D",
                            "2"
                          ]
                        ]
                      },
                      {
                        "type": "field_dropdown",
                        "name": "option",
                        "options": [
                          [
                            "亮",
                            "on"
                          ],
                          [
                            "灭",
                            "off"
                          ]
                        ]
                      }
                    ],
                    "inputsInline": false,
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#FF4040",
                    "tooltip": "",
                    "helpUrl": ""
                  });
        }
    }
    Blockly.Blocks['ultrasonic'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "ultrasonic",
                    "message0": Blockly.Msg.ULTRASONIC,
                    "args0": [
                      {
                        "type": "field_dropdown",
                        "name": "pin",
                        "options": [
                          [
                            "C",
                            "1"
                          ],
                          [
                            "D",
                            "2"
                          ]
                        ]
                      }
                    ],
                    "inputsInline": true,
                    "output": null,
                    "colour": "#90EE90",
                    "tooltip": "",
                    "helpUrl": ""
                  });
        }
    }
}

exports = addBlocks_9028b;