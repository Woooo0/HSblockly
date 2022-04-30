const { SerialPort } = require('serialport')
const { shell } = require('electron')
const exec = require('child_process').execFile;
const fs = require('fs');

function file() {
    if (document.getElementById('file-menu').style.display == 'none') {
        document.getElementById('file-menu').style.display = 'block';
    }
    else {
        document.getElementById('file-menu').style.display = 'none';
    }
}

function select() {
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function select_device(evt) {
    evt = evt || window.event;
    var obj = evt.target || evt.srcElement;
    switch (obj.id) {
        case "9028b":
            console.log('9028b');
            break;
        case "9016":
            console.log('9016');
            break;
        case "close_popup":
            document.getElementById('light').style.display = 'none';
            document.getElementById('fade').style.display = 'none';
            break;
    }
}

function connect_device() {
    SerialPort.list().then((ports) => {
        console.log(ports); // 打印串口列表
    }).catch((err) => {
        console.log(err);
    });
    var port = new SerialPort({
        path: 'COM4',
        autoOpen: false,
        baudRate: 115200, //波特率
        dataBits: 8, //数据位
        parity: 'none', //奇偶校验
        stopBits: 1, //停止位
        flowControl: false,
        rtscts: true
    }, false);
    port.open(function (error) {
        if (error) {
            console.log("打开端口错误：" + error);
        } else {
            console.log("打开端口成功，正在监听数据中 ...");
            const { DelimiterParser } = require('@serialport/parser-delimiter')
            const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }))
            parser.on('data', chunk => {
                console.log(chunk.toString()); // 打印收到的数据
                var uart = document.getElementById("uart");
                uart.value += chunk.toString();
                uart.scrollTop = uart.scrollHeight;
            });
        }
    });
}

function uploads() {
    var output = document.getElementById("output");
    fs.writeFile('./main.py', output.value.toString(), function (error) {
        if (error) {
            console.error('write script error')
        } else {
            console.log('wite script successful')
        }
    });

    var executablePath = "cli.exe";
    var parameters = ["COM4", "main.py"];
    exec(executablePath, parameters, function (err, data) {
        if (err) {
            log.info('uploads error: ', err)
            console.error(err);
            console.log(data.toString());
        } else {
            console.log("uploads successly");
        }
    });
}

function about() {
    shell.openExternal('http://www.kmmaker.com')
}