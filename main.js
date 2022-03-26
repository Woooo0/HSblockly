const { app, BrowserWindow, Menu } = require('electron')
const { SerialPort } = require('serialport')
const exec = require('child_process').execFile;

const log = require('electron-log');
log.transports.file.resolvePath = () => "E:\HSblockly"

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function() {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/src/index.html');

    // 打开开发工具
    mainWindow.openDevTools();

    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function() {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    });

    const template = [{
            label: '文件',
            submenu: [{
                    label: '打开文件'
                },
                {
                    label: '保存文件'
                }
            ]
        },
        {
            label: '设备',
            submenu: [{
                    label: '选择设备',
                    click() {
                        console.log("test");

                        SerialPort.list().then((ports) => {
                            console.log(ports); // 打印串口列表
                        }).catch((err) => {
                            console.log(err);
                        });

                    }
                },
                {
                    label: '端口',
                    // click() {
                    //     const port = new SerialPort('COM3', (err) => {
                    //         if (err) {
                    //             console.log('端口打开失败！');
                    //             return;
                    //         }
                    //         console.log('端口打开成功！');
                    //     });
                    // }
                }
            ]
        },
        {
            label: '上传',
            submenu: [{
                label: '上传程序',
                click() {
                    var executablePath = "cli.exe";
                    var parameters = ["COM3", "test.py"];
                    exec(executablePath, parameters, function(err, data) {
                        if (err) {
                            console.error(err);
                            console.log(data.toString());
                        } else {
                            console.log("uploads successly");
                        }
                    });
                }
            }, ]
        }
    ];

    const appMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(appMenu);
});