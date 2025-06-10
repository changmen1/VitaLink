import { app, BrowserWindow, screen, Menu, MenuItemConstructorOptions, MenuItem } from 'electron'
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
    resizable: false,
    // TODO 窗口是否置顶
    // alwaysOnTop: true,
    // TODO 是否自动隐藏窗口菜单栏。 一旦设置，菜单栏将只在用户单击 Alt 键时显示
    // autoHideMenuBar: true,
    // TODO 是否全屏幕
    // fullscreen: false,
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
    // win.webContents.openDevTools()
  } else {
    console.log(">>>>>>>>>>>>>>>>>>执行了")
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
// TODO 清除菜单
// Menu.setApplicationMenu(null)

// TODO 应用启动还在赞助页面
app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  win.loadURL('https://github.com/changmen1') // 或 loadFile(...) 加载你的主界面
})