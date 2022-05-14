const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const log = require('electron-log')
const path = require('path')
var package = require("./package.json");
const reloader = require('electron-reloader')

log.transports.file.resolvePath = () => "./HSlog.log"
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

app.on('open-file', (event, path) => {
    event.preventDefault()
    mainWindow.webContents.send("open-file_path", process)
});

ipcMain.on('close_win', (event, arg) => {
    BrowserWindow.getFocusedWindow().destroy()
})

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 800,
        title: `${package.name} ${package.version}`,
        icon: path.join(__dirname, './icon/KmEducationDesktop.ico'),

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false
    })

    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/src/html/index.html')

    // 打开开发工具
    mainWindow.openDevTools();

    mainWindow.on('close', function (e) {
        e.preventDefault()
        BrowserWindow.getFocusedWindow().webContents.send('main_child', "close")
        mainWindow.webContents.send("open-file_path", "process")
    })

    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function () {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    })

    mainWindow.on('resize', function () {
        mainWindow.webContents.send('update-lines', 'active')
    })

    mainWindow.on('ready-to-show', function () {
        mainWindow.webContents.send('main_child', __dirname)
        mainWindow.show()
    })

    ipcMain.on('child_main', (event, arg) => {
        var filters = [{ name: 'Program File', extensions: ['ke'] }]
        if (arg == 0) {
            var newWindow = null
            newWindow = new BrowserWindow({
                width: 1300,
                height: 800,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false
                }
            })
            newWindow.loadURL('file://' + __dirname + '/src/html/index.html')
            newWindow.on('close', function (e) {
                e.preventDefault()
                BrowserWindow.getFocusedWindow().webContents.send('main_child', 'close')
            })
            newWindow.on('closed', function () {
                newWindow = null
            })
            newWindow.on('resize', function () {
                newWindow.webContents.send('update-lines', 'active')
            })
        }
        else if (arg == 1) {
            dialog.showOpenDialog({
                title: '请选择作品',
                properties: ['openFile'],
                filters: filters,
                buttonLabel: '打开作品'
            }).then(result => {
                event.reply('open_file', result)
            }).catch(err => {
                console.log(err)
            })
        }
        else if (arg == 2) {
            dialog.showSaveDialog({
                title: '保存作品',
                filters: filters,
            }).then(result => {
                event.reply('save_file', result)
            }).catch(err => {
                console.log(err)
            })
        }
    });
    Menu.setApplicationMenu(null)
})