function addBlocks_9016(Blockly) {
    Blockly.Blocks['string_length'] = {
        init: function () {
            this.jsonInit({
                "message0": Blockly.Msg.LISTS_REPEAT_TITLE,
                "args0": [
                    {
                        "type": "input_value",
                        "name": "VALUE",
                        "check": "String"
                    }
                ],
                "output": "Number",
                "colour": '#9AC0CD',
            });
        }
    }
}

exports = addBlocks_9016;