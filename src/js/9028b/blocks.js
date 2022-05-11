function addBlocks(Blockly) {
    Blockly.Blocks['string_length'] = {
        init: function () {
            this.jsonInit({
                "message0": 'length of %1',
                "args0": [
                    {
                        "type": "input_value",
                        "name": "VALUE",
                        "check": "String"
                    }
                ],
                "output": "Number",
                "colour": '#9AC0CD',
                "tooltip": "Returns number of letters in the provided text.",
            });
        }
    }
}

exports = addBlocks;