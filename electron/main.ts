import { app, BrowserWindow, screen, Menu, MenuItemConstructorOptions, MenuItem, ipcMain, dialog, Notification } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'


const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

/** 主窗口 */
let win: BrowserWindow | null
/** 关于窗口  */
let aboutWindow: BrowserWindow | null = null

function createWindow() {
  win = new BrowserWindow({
    width: 414,
    height: 736,
    // backgroundColor: 'pink',
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    // TODO 定位屏幕右上角
    x: screen.getPrimaryDisplay().workAreaSize.width - 414,
    y: 0,
    // TODO 是否显示边框
    // frame: false,
    // TODO 窗口是否透明
    // transparent: true,
    // TODO 是否允许缩窗口
    // resizable: false,
    // TODO 窗口是否置顶
    // alwaysOnTop: true,
    // TODO 是否自动隐藏窗口菜单栏。 一旦设置，菜单栏将只在用户单击 Alt 键时显示
    // autoHideMenuBar: true,
    // TODO 是否全屏幕
    // fullscreen: false,
    // TODO 隐藏图标 钓鱼软件哈哈哈
    // skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    // win.loadURL('https://github.com/changmen1')
    win.loadURL(VITE_DEV_SERVER_URL)
    // TODO 打开开发者工具
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

// TODO -----------------------------------------------监听右键菜单请求--------------------------------------------------------
ipcMain.on('show-context-menu', (event) => {
  // TODO 赞助通知
  const handleMessage = async () => {
    const res = await dialog.showMessageBox({
      type: 'warning',
      title: '你要退出吗？',
      message: '请确认是否退出应用',
      detail: '有问题可以联系作者',
      buttons: ['取消', '赞助', '退出'],
      //取消按钮的索引，使用esc根据索引调用取消按钮，默认为0，所以建议在buttons中将取消设置为第一个
      cancelId: 0,
      checkboxLabel: '接收协议',
      checkboxChecked: false,
    })

    if (res.response == 0) return dialog.showErrorBox('通知', '我恨死你了马云')
    if (res.response == 1) { console.log("66666666666666>>>>>>>>>>>>>>>>>赞助") }
    if (res.response == 2) app.quit()
  }

  const popupMenuTemplate = [
    { label: '退出', click: () => app.quit() },
    { label: '赞助☕️', click: handleMessage }
  ]

  const menu = Menu.buildFromTemplate(popupMenuTemplate)

  // 通过 event.sender 获取触发菜单的窗口实例
  menu.popup({
    window: BrowserWindow.fromWebContents(event.sender) as any
  })
})

// TODO -----------------------------------------------自定义菜单--------------------------------------------------------
const template: Array<(MenuItemConstructorOptions) | (MenuItem)> = [
  {
    label: '红烧罗非鱼',
    submenu: [
      {
        label: 'GitHub',
        click: () => {
          const win = new BrowserWindow({
            width: 700,
            height: 500,
          })
          win.loadURL('https://github.com/changmen1')
        },
      },
      // TODO 分隔符
      {
        type: 'separator',
      },
      {
        label: '退出',
        click: async () => app.quit(),
        //定义快捷键
        accelerator: 'CommandOrControl+q',
      },
      //渲染进程触发主进程通信
      {
        click: () => win?.webContents.send('update-counter', 1),
        label: 'Increment',
      },
    ],
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '关于',
        click: () => {
          if (aboutWindow) {
            aboutWindow.focus()
            return
          }
          aboutWindow = new BrowserWindow({
            width: 400,
            height: 300,
            resizable: false,
            title: '关于作者',
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false,
            },
          })

          aboutWindow.loadFile(path.join(__dirname, 'about.html'))
          aboutWindow.on('closed', () => {
            aboutWindow = null
          })
        },
      },
    ],
  },
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// TODO -----------------------------------------------清除菜单--------------------------------------------------------
// Menu.setApplicationMenu(null)

// TODO -----------------------------------------------应用启动--------------------------------------------------------
app.whenReady().then(() => {
  // TODO 启动通知
  const notification = new Notification({
    title: '红烧罗非鱼通知',
    body: '更多开源请访问 https://github.com/changmen1',
  });

  notification.show();

  // TODO 启动赞助页面
  //   const win = new BrowserWindow({
  //     width: 800,
  //     height: 600,
  //     webPreferences: {
  //       nodeIntegration: true,
  //       contextIsolation: false,
  //     },
  //   })
  //   win.loadURL('https://github.com/changmen1') // 或 loadFile(...) 加载你的主界面
});