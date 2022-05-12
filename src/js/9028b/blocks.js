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
                            "value": 10
                        }
                    ],
                    "previousStatement": null,
                    "nextStatement": null,
                    "colour": "#ffab19",
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
                            "type": "input_statement",
                            "name": "while",
                            "align": "RIGHT"
                        }
                    ],
                    "previousStatement": null,
                    "colour": "#ffab19",
                    "tooltip": "",
                    "helpUrl": ""
                });
        }
    }
}

exports = addBlocks_9028b;