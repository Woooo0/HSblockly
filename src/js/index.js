const { SerialPort } = require('serialport')
const { shell, ipcRenderer } = require('electron')
const exec = require('child_process').execFile;
const fs = require('fs');
const { DelimiterParser } = require('@serialport/parser-delimiter')

var deviceType;
var deviceList = [];
var path;  //串口号
var port;  //SerialPort实例
var programName = './main.py'

function popup(text, type, delay) {
    var color;
    if (type == 'info') {
        color = "#0099ff"
    }
    else if (type == 'success') {
        color = "#0fbd8c"
    }
    else if (type == 'alarm') {
        color = "#ff6600"
    }
    else if (type == 'error') {
        color = "#ff3300"
    }
    $("#pop_text").text(text)
    $(".pop").attr("style", "background-color: " + color + ";")
    $(".pop").fadeIn(50);
    if (type != 'info') {
        setTimeout(function () {
            $(".pop").slideUp(delay)
        }, 1000)
    }
}

function about() {
    shell.openExternal('http://www.kmmaker.com')
}

function file() {
    var options = document.getElementById("file-menu")
    if (options.style.display == 'none') {
        options.style.display = 'block'
    }
    else {
        options.style.display = 'none'
    }
}

function select() {
    document.getElementById('light').style.display = 'block'
    document.getElementById('fade').style.display = 'block'
}

function select_device(evt) {
    evt = evt || window.event
    var obj = evt.target || evt.srcElement
    switch (obj.id) {
        case "9028b":
            deviceType = '9028b'
            document.getElementById('light').style.display = 'none'
            document.getElementById('fade').style.display = 'none'
            document.getElementById('select').innerHTML = '9028b'
            break;
        case "9016":
            deviceType = '9016'
            document.getElementById('light').style.display = 'none'
            document.getElementById('fade').style.display = 'none'
            document.getElementById('select').innerHTML = '9016'
            break
        case "close_popup":
            document.getElementById('light').style.display = 'none'
            document.getElementById('fade').style.display = 'none'
            break
    }
}

function connect_device() {
    if (deviceType != undefined) {
        var connectFlag = document.getElementById("connect").innerText
        if (connectFlag == '连接设备') {
            var options = document.getElementById("connect_divice-menu");
            if (options.style.display != 'block') {
                options.style.display = 'block'
            }
            else {
                options.style.display = 'none'
            }

            SerialPort.list().then((ports) => {
                console.log(ports); // 打印串口列表
                var productId;
                if (deviceType == '9028b') {
                    productId = '7523'
                }
                else {
                    productId = '7522'
                }
                var str = ''
                deviceList = []
                for (var i = 0; i < ports.length; i++) {
                    if (ports[i].productId == productId) {
                        str += "<div class='ports'> " + ports[i].friendlyName + "</div>"
                        if (deviceList.indexOf(ports[i].path) == -1) {
                            deviceList.push(ports[i].path)
                        }
                    }
                }
                if (deviceList.length == 0) {
                    str += "<div class='ports'>未发现可用设备</div>"
                }
                console.log(deviceList)
                options.innerHTML = str
                $(".ports").on('click', function (e) {
                    select_port(false, $(this).index())
                });
            }).catch((err) => {
                console.log(err)
            });
        }
        else {
            select_port(true)
        }
    }
    else {
        popup("请选择设备！", "alarm", undefined)
    }
}

function select_port(options, i = 0) {
    if (!options) {
        path = deviceList[i]
        port = new SerialPort({
            path: path,
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
                document.getElementById("connect_divice-menu").style.display = 'none'
                alert("打开端口失败，请检查是否被其它程序占用！")
            } else {
                document.getElementById("connect_divice-menu").style.display = 'none'
                document.getElementById('connect').innerHTML = '断开连接'
                const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }))
                parser.on('data', chunk => {
                    var uart = document.getElementById("uart")
                    uart.value += chunk.toString()
                    uart.scrollTop = uart.scrollHeight
                });
            }
        })
    }
    else {
        port.close(function (error) {
            if (error) {
                console.log("关闭端口错误：" + error);
            } else {
                document.getElementById('connect').innerHTML = '连接设备'
                path = undefined
            }
        })
    }
}

function uploads() {
    if (path != undefined) {
        popup("上传中，请稍候...", "info")
        var output = document.getElementById("output")
        fs.writeFile(programName, output.value.toString(), function (error) {
            if (error) {
                alert("生成脚本失败，请重试或重启软件！")
            } else {
                console.log('wite script successful')
            }
        });

        var executablePath = "./resources/cli.exe"
        var parameters = [path, programName]
        var index = deviceList.indexOf(path)
        select_port(true)
        exec(executablePath, parameters, function (err, data) {
            if (err) {
                console.error('uploads error: ', err)
                popup("上传失败", "error", 200)
            } else {
                select_port(false, index)
                popup("上传成功", "success", 200)
            }
        })
    } else {
        popup("未连接设备！", "alarm", undefined)
    }
}

function uart_send() {
    uart_options(2)
}

function uart_options(object) {
    if (object == 0) {
        console.log("clear")
    }
    else if (object == 1) {
        var paused_src = document.getElementById("paused")
        if (paused_src.getAttribute("src") == '../images/paused.svg') {
            paused_src.src = '../images/play.svg'
        }
        else {
            paused_src.src = '../images/paused.svg'
        }
    }
    else if (object == 2) {
        console.log("send")
    }
}

function close_win(evt) {
    evt = evt || window.event
    var obj = evt.target || evt.srcElement
    switch (obj.id) {
        case "true":
            ipcRenderer.send('close_win', "close")
            break
        case "false":
            $(".close-pop").hide();
            break
    }
}

function main_init() {
    console.log(process.versions);
    //生成模块列表区域
    var blocklyDiv = document.getElementById('blocklyDiv')
    var workspace = Blockly.inject(blocklyDiv, {
        media: '../../node_modules/blockly/media/',
        toolbox: document.getElementById('toolbox'),
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.5,
            scaleSpeed: 1.05
        },
        trashcan: true,
        scrollBar: true
    });

    //调整工作区域大小
    var onresize = function (e) {
        Blockly.svgResize(workspace)
    };
    //注册resize处理函数
    window.addEventListener('resize', onresize)
    Blockly.svgResize(workspace)

    function myUpdateFunction(event) {
        document.getElementById("file-menu").style.display = 'none'
        document.getElementById("connect_divice-menu").style.display = 'none'
        var code = Blockly.Python.workspaceToCode(workspace)
        var output = document.getElementById("output")
        output.value = code
    }
    workspace.addChangeListener(myUpdateFunction)

    ipcRenderer.on('main_child', (event, arg) => {
        if (arg == 'cleared') {
            workspace.clear()
        }
        else if (arg == 'close') {
            $(".close-pop").fadeIn(500);
        }
    })

    ipcRenderer.on('save_file', (event, arg) => {
        console.log(arg)
        var filePath = arg.filePath
        const xml = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToText(xml);
        fs.writeFile(filePath, xmlText, function (error) {
            if (error) {
                alert("保存失败，请重试或重启软件！")
            } else {
                console.log('save successful')
            }
        });
    })

    ipcRenderer.on('open_file', (event, arg) => {
        var filePaths = arg.filePaths[0]
        fs.readFile(filePaths, (err, data) => {
            if (err) {
                alert('打开失败,请重试或重启软件！')
            }
            const xml = Blockly.Xml.textToDom(data);
            Blockly.Xml.domToWorkspace(xml, workspace);
        })
    })

    $(function () {
        $(".pop, .close-pop").hide();
        document.getElementById("close-pop").style.visibility = 'visible'
        $(".code-text").linedtextarea()
    })
    $(".uart_button").on('click', function (e) {
        uart_options($(this).index())
    })
    $(".file_options").on('click', function (e) {
        ipcRenderer.send('child_main', $(this).index())
        document.getElementById("file-menu").style.display = 'none'
    })
    $(".master, .menu-button").mousedown(function () {
        var file_menu = document.getElementById('file-menu')
        var connect_divice_menu = document.getElementById('connect_divice-menu')
        if (file_menu.style.display != 'none') {
            file_menu.style.display = 'none'
        }
        if (connect_divice_menu.style.display != 'none') {
            connect_divice_menu.style.display = 'none'
        }
    })
}

setTimeout(() => {
    const blocklyDiv = document.querySelector('#blocklyDiv')

    blocklyDiv.addEventListener('contextmenu', event => {
        event.preventDefault()
        const client = {
            x: event.clientX,
            y: event.clientY
        }
        // 把鼠标位置发送到主进程
        ipcRenderer.send('child_main', client)
    })
}, 500);