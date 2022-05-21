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
                            "value": 1
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

    Blockly.Blocks['print'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "print",
                    "message0": Blockly.Msg.PRINT,
                    "args0": [
                        {
                          "type": "input_value",
                          "name": "print",
                          "align": "RIGHT"
                        }
                      ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#9966ff",
                    "tooltip": "",
                    "helpUrl": ""
                });
        }
    }

    Blockly.Blocks['println'] = {
        init: function () {
            this.jsonInit(
                {
                    "type": "println",
                    "message0": Blockly.Msg.PRINTLN,
                    "args0": [
                        {
                          "type": "input_value",
                          "name": "println",
                          "align": "RIGHT"
                        }
                      ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#9966ff",
                    "tooltip": "",
                    "helpUrl": ""
                });
        }
    }
}

exports = addBlocks_9028b;