const { SerialPort } = require('serialport')
const { shell } = require('electron')
const exec = require('child_process').execFile;
const fs = require('fs');

var deviceType;
var deviceList = [];
var path;  //串口号
var port;  //SerialPort实例

function about() {
    document.getElementById('file-menu').style.display = 'none';
    document.getElementById('connect_divice-menu').style.display = 'none';
    shell.openExternal('http://www.kmmaker.com')
}

function file() {
    document.getElementById('connect_divice-menu').style.display = 'none';
    var options = document.getElementById("file-menu");
    if (options.style.display == 'none') {
        options.style.display = 'block';
    }
    else {
        options.style.display = 'none';
    }
}

function select() {
    document.getElementById('file-menu').style.display = 'none';
    document.getElementById('connect_divice-menu').style.display = 'none';
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function select_device(evt) {
    document.getElementById('file-menu').style.display = 'none';
    document.getElementById('connect_divice-menu').style.display = 'none';
    evt = evt || window.event;
    var obj = evt.target || evt.srcElement;
    switch (obj.id) {
        case "9028b":
            deviceType = '9028b'
            document.getElementById('light').style.display = 'none';
            document.getElementById('fade').style.display = 'none';
            break;
        case "9016":
            deviceType = '9016'
            document.getElementById('light').style.display = 'none';
            document.getElementById('fade').style.display = 'none';
            break;
        case "close_popup":
            document.getElementById('light').style.display = 'none';
            document.getElementById('fade').style.display = 'none';
            break;
    }
}

function connect_device() {
    document.getElementById('file-menu').style.display = 'none';
    if (deviceType != undefined) {
        var connectFlag = document.getElementById("connect").innerText;
        if (connectFlag == '连接设备') {
            var options = document.getElementById("connect_divice-menu");
            if (options.style.display == 'none') {
                options.style.display = 'block';
            }
            else {
                options.style.display = 'none';
            }

            SerialPort.list().then((ports) => {
                console.log(ports); // 打印串口列表
                var str = ''
                for (var i = 0; i < ports.length; i++) {
                    if (ports[i].productId != undefined) {
                        str += "<div id='' class='ports' onclick='select_port()'> " + ports[i].friendlyName + "</div>";
                        if (deviceList.indexOf(ports[i].path) == -1) {
                            deviceList.push(ports[i].path)
                        }
                    }
                }
                console.log(deviceList)
                options.innerHTML = str
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            select_port(true)
        }
    }
    else {
        alert('请选择设备！')
    }
}

function select_port(options) {
    if (!options) {
        var oDiv = document.getElementsByClassName("ports");
        for (var i = 0; i < oDiv.length; i++) {
            (function (i) {
                oDiv[i].onclick = function () {
                    path = deviceList[i]
                    port = new SerialPort({
                        path: deviceList[i],
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
                            alert("打开端口失败")
                        } else {
                            console.log("打开端口成功，正在监听数据中 ...");
                            document.getElementById('connect_divice-menu').style.display = 'none';
                            document.getElementById('connect').innerHTML = '断开连接'
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
            })(i)
        }
    }
    else {
        port.close(function (error) {
            if (error) {
                console.log("关闭端口错误：" + error);
                alert("关闭端口失败")
            } else {
                console.log("关闭端口成功");
                document.getElementById('connect').innerHTML = '连接设备'
            }
        });
    }
}

function uploads() {
    document.getElementById('file-menu').style.display = 'none';
    document.getElementById('connect_divice-menu').style.display = 'none';
    if (path != undefined) {
        var output = document.getElementById("output");
        fs.writeFile('./custom.py', output.value.toString(), function (error) {
            if (error) {
                console.error('write script error')
                alert("上传失败")
            } else {
                console.log('wite script successful')
            }
        });

        var executablePath = "cli.exe";
        var parameters = [path, "custom.py"];
        exec(executablePath, parameters, function (err, data) {
            if (err) {
                console.error('uploads error: ', err)
                alert("上传失败")
            } else {
                console.log("uploads successly");
            }
        });
    } else {
        alert("未连接设备！")
    }
}