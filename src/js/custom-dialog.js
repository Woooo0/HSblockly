/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * An example implementation of how one might replace Blockly's browser
 * dialogs. This is just an example, and applications are not encouraged to use
 * it verbatim.
 *
 * @namespace
 */
CustomDialog = {};

/** Override Blockly.dialog.alert() with custom implementation. */
Blockly.dialog.setAlert(function (message, callback) {
  console.log('Alert: ' + message);
  CustomDialog.show('Alert', message, {
    onCancel: callback
  });
});

/** Override Blockly.dialog.confirm() with custom implementation. */
Blockly.dialog.setConfirm(function (message, callback) {
  console.log('删除提醒: ' + message);
  CustomDialog.show('删除提醒', message, {
    showOkay: true,
    onOkay: function () {
      callback(true);
    },
    showCancel: true,
    onCancel: function () {
      callback(false);
    }
  });
});

/** Override Blockly.dialog.prompt() with custom implementation. */
Blockly.dialog.setPrompt(function (message, defaultValue, callback) {
  console.log('Prompt: ' + message);
  CustomDialog.show('变量创建', message, {
    showInput: true,
    showOkay: true,
    onOkay: function () {
      callback(CustomDialog.inputField.value);
    },
    showCancel: true,
    onCancel: function () {
      callback(null);
    }
  });
  CustomDialog.inputField.value = defaultValue;
});

/** Hides any currently visible dialog. */
CustomDialog.hide = function () {
  if (CustomDialog.backdropDiv_) {
    CustomDialog.backdropDiv_.style.display = 'none';
    CustomDialog.dialogDiv_.style.display = 'none';
  }
};

/**
 * Shows the dialog.
 * Allowed options:
 *  - showOkay: Whether to show the OK button.
 *  - showCancel: Whether to show the Cancel button.
 *  - showInput: Whether to show the text input field.
 *  - onOkay: Callback to handle the okay button.
 *  - onCancel: Callback to handle the cancel button and backdrop clicks.
 */
CustomDialog.show = function (title, message, options) {
  var backdropDiv = CustomDialog.backdropDiv_;
  var dialogDiv = CustomDialog.dialogDiv_;
  if (!dialogDiv) {
    // Generate HTML
    backdropDiv = document.createElement('div');
    backdropDiv.id = 'customDialogBackdrop';
    backdropDiv.style.cssText =
      'position: absolute;' +
      'top: 0; left: 0; right: 0; bottom: 0;' +
      'background-color: rgba(8, 131, 214, .5);' +
      'z-index: 1001;';
    document.body.appendChild(backdropDiv);

    dialogDiv = document.createElement('div');
    dialogDiv.id = 'customDialog';
    dialogDiv.style.cssText =
      'display: flex;' +
      'flex-direction: column;' +
      'align-items: center;' +
      'border-radius: 10px;' +
      'position: relative;' +
      'background-color: #fff;' +
      'width: 320px;' +
      'border-top: 40px solid #0099ff;;' +
      'margin: 150px auto 0;';
    backdropDiv.appendChild(dialogDiv);

    dialogDiv.onclick = function (event) {
      event.stopPropagation();
    };

    CustomDialog.backdropDiv_ = backdropDiv;
    CustomDialog.dialogDiv_ = dialogDiv;
  }
  backdropDiv.style.display = 'block';
  dialogDiv.style.display = 'flex';

  dialogDiv.innerHTML =
    '<header class="customDialogTitle" style="margin-top: -30px; color: white;"></header>' +
    '<p class="customDialogMessage" style="margin-top: 30px;"></p>' +
    (options.showInput ? '<div><input id="customDialogInput" style="height: 35px; width: 280px; margin-top: 5px; padding-left: 5px; border: 1px solid #e6e6e6; border-radius: 5px; outline-color: #0099ff;"></div>' : '') +
    '<div class="customDialogButtons" style="height: 30px; width: 100%; display: flex; justify-content: space-around; align-items: center; margin-top: 25px; margin-bottom: 20px;">' +
    (options.showCancel ? '<button id="customDialogCancel" style="height: 30px; width: 60px; border-radius: 5px; border: 1.5px solid #e6e6e6; background-color: white; color: black;">取消</button>' : '') +
    (options.showOkay ? '<button id="customDialogOkay" style="height: 30px; width: 60px; border-radius: 5px; border: 1.5px solid #e6e6e6; background-color: #0099ff; color: white;">确定</button>' : '') +
    '</div>';
  dialogDiv.getElementsByClassName('customDialogTitle')[0]
    .appendChild(document.createTextNode(title));
  dialogDiv.getElementsByClassName('customDialogMessage')[0]
    .appendChild(document.createTextNode(message));

  var onOkay = function (event) {
    CustomDialog.hide();
    options.onOkay && options.onOkay();
    event && event.stopPropagation();
  };
  var onCancel = function (event) {
    CustomDialog.hide();
    options.onCancel && options.onCancel();
    event && event.stopPropagation();
  };

  var dialogInput = document.getElementById('customDialogInput');
  CustomDialog.inputField = dialogInput;
  if (dialogInput) {
    dialogInput.focus();

    dialogInput.onkeyup = function (event) {
      if (event.keyCode === 13) {
        // Process as OK when user hits enter.
        onOkay();
        return false;
      } else if (event.keyCode === 27) {
        // Process as cancel when user hits esc.
        onCancel();
        return false;
      }
    };
  } else {
    var okay = document.getElementById('customDialogOkay');
    okay && okay.focus();
  }

  if (options.showOkay) {
    document.getElementById('customDialogOkay')
      .addEventListener('click', onOkay);
  }
  if (options.showCancel) {
    document.getElementById('customDialogCancel')
      .addEventListener('click', onCancel);
  }

  backdropDiv.onclick = onCancel;
};
