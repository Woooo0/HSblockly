const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const { SerialPort } = require('serialport')
const exec = require('child_process').execFile;
const fs = require('fs');

const log = require('electron-log');
log.transports.file.resolvePath = () => "./HSlog.log"

const reloader = require('electron-reloader')
reloader(module)

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/src/html/index.html');

    // 打开开发工具
    mainWindow.openDevTools();

    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function () {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    });
    var code;
    ipcMain.on('index.html', (event, arg) => {
        console.log(arg);
        code = arg;
    })

    const template = [{
        label: '文件',
        submenu: [{
            label: '打开文件',
        },
        {
            label: '保存文件',
            click() {
                console.log("保存文件")
            }
        }
        ]
    },
    {
        label: '设备',
        submenu: [{
            label: '选择设备',
            click() {
                console.log("选择设备");

                SerialPort.list().then((ports) => {
                    console.log(ports); // 打印串口列表
                }).catch((err) => {
                    console.log(err);
                });

            }
        },
        {
            label: '端口',
            click() {
                var port = new SerialPort({
                    path: 'COM4',
                    autoOpen: false,
                    baudRate: 115200, //波特率
                    dataBits: 8, //数据位
                    parity: 'none', //奇偶校验
                    stopBits: 1, //停止位
                    flowControl: false
                }, false);
                port.open(function (error) {
                    if (error) {
                        console.log("打开端口错误：" + error);
                    } else {
                        console.log("打开端口成功，正在监听数据中");
                        const { DelimiterParser } = require('@serialport/parser-delimiter')
                        const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }))
                        parser.on('data', chunk => {
                            console.log(chunk.toString()); // 打印收到的数据
                            mainWindow.webContents.send('main-process-uart', chunk.toString());
                        });
                    }
                });
            }
        }
        ]
    },
    {
        label: '上传',
        submenu: [{
            label: '上传程序',
            click() {
                fs.writeFile('./main.py', code, function (error) {
                    if (error) {
                        log.error('write script error')
                    } else {
                        log.info('wite script successful')
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
        },]
    }
    ];

    const appMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(appMenu);
});