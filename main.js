const { app, BrowserWindow, ipcMain, Tray, Menu, Notification, nativeImage, screen } = require('electron');
const path = require('path');
const fs = require('fs');

const TASKS_FILE = path.join(app.getPath('userData'), 'tasks.json');
// 圖示：若資料夾有 icon.png，則優先使用；否則使用 1x1 透明佔位。
const ICON_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/2YBz7wAAAAASUVORK5CYII=';
const ICON_PATH = path.join(__dirname, 'icon.png');
let tray = null;
let win = null;
let notifyHistory = new Map(); // key: taskId@YYYY-MM-DD

function ensureTasksFile() {
  try {
    if (!fs.existsSync(TASKS_FILE)) {
      fs.writeFileSync(TASKS_FILE, JSON.stringify([]), 'utf-8');
    }
  } catch (err) {
    console.error('Error ensuring tasks file:', err);
  }
}

function daysLeft(iso) {
  if (!iso) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(iso);
  due.setHours(0, 0, 0, 0);
  const diff = (due - today) / (1000 * 60 * 60 * 24);
  return Math.round(diff);
}

function purgeExpiredTasks() {
  try {
    const raw = fs.readFileSync(TASKS_FILE, 'utf-8');
    const tasks = JSON.parse(raw);
    if (!Array.isArray(tasks)) return [];
    const kept = tasks.filter((t) => {
      if (!t || !t.dueDate) return true;
      const dl = daysLeft(t.dueDate);
      // 僅刪除逾期且未完成的項目
      if (dl < 0 && !t.completed) return false;
      return true;
    });
    if (kept.length !== tasks.length) {
      fs.writeFileSync(TASKS_FILE, JSON.stringify(kept, null, 2), 'utf-8');
    }
    return kept;
  } catch (err) {
    console.error('purgeExpiredTasks error:', err);
    return null;
  }
}

function createWindow() {
  // 設定預設尺寸與位置（右上角貼邊）
  const display = screen.getPrimaryDisplay();
  const wa = display.workArea;
  const width = 420;
  const height = 600;
  const margin = 16;
  const x = wa.x + wa.width - width - margin;
  const y = wa.y + margin;

  const winOptions = {
    width,
    height,
    x,
    y,
    minWidth: 360,
    minHeight: 480,
    backgroundColor: '#ffffff',
    autoHideMenuBar: true,
    alwaysOnTop: false,
    skipTaskbar: false,
    frame: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  };

  // Windows 建議使用 .ico，但也接受 .png；若存在 icon.png 就設定。
  try {
    if (fs.existsSync(ICON_PATH)) {
      winOptions.icon = ICON_PATH;
    }
  } catch (e) { /* ignore */ }

  win = new BrowserWindow(winOptions);

  win.loadFile('index.html');
}

function createTray() {
  try {
    let trayIcon;
    if (fs.existsSync(ICON_PATH)) {
      trayIcon = nativeImage.createFromPath(ICON_PATH);
    } else {
      trayIcon = nativeImage.createFromDataURL(ICON_DATA_URL);
    }
    tray = new Tray(trayIcon);
    tray.setToolTip('桌面待辦清單');
    const context = Menu.buildFromTemplate([
      { label: '顯示視窗', click: () => { if (win) { win.show(); win.focus(); } } },
      { label: '最小化', click: () => { if (win) { win.minimize(); } } },
      { label: '隱藏視窗', click: () => { if (win) { win.hide(); } } },
      { type: 'separator' },
      { label: '退出', click: () => { app.quit(); } },
    ]);
    tray.setContextMenu(context);
    tray.on('click', () => {
      if (!win) return;
      if (win.isVisible()) win.hide(); else { win.show(); win.focus(); }
    });
  } catch (err) {
    console.error('createTray error:', err);
  }
}

app.whenReady().then(() => {
  // Windows 通知需要 AppUserModelID
  try { app.setAppUserModelId('桌面todolist'); } catch (e) {}
  ensureTasksFile();
  // 啟動時先清理逾期未完成項目
  try { purgeExpiredTasks(); } catch (e) {}
  createWindow();
  createTray();
  // 設定開機自動啟動
  try {
    app.setLoginItemSettings({ openAtLogin: true, openAsHidden: false });
  } catch (e) {
    console.warn('setLoginItemSettings failed:', e);
  }
  // 啟動提醒排程
  startNotifyScheduler();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('loadTasks', async () => {
  try {
    ensureTasksFile();
    const raw = fs.readFileSync(TASKS_FILE, 'utf-8');
    const data = JSON.parse(raw);
    const arr = Array.isArray(data) ? data : [];
    // 讀取時自動清理逾期未完成項目
    const kept = arr.filter((t) => {
      if (!t || !t.dueDate) return true;
      const dl = daysLeft(t.dueDate);
      return !(dl < 0 && !t.completed);
    });
    if (kept.length !== arr.length) {
      try { fs.writeFileSync(TASKS_FILE, JSON.stringify(kept, null, 2), 'utf-8'); } catch (e) {}
    }
    return kept;
  } catch (err) {
    console.error('loadTasks error:', err);
    return [];
  }
});

ipcMain.handle('saveTasks', async (_event, tasks) => {
  try {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
    return { ok: true };
  } catch (err) {
    console.error('saveTasks error:', err);
    return { ok: false, error: String(err) };
  }
});

function notify(title, body) {
  try {
    const n = new Notification({ title, body });
    n.show();
  } catch (err) {
    console.error('Notification error:', err);
  }
}

function startNotifyScheduler() {
  const check = () => {
    try {
      const raw = fs.readFileSync(TASKS_FILE, 'utf-8');
      const tasks = JSON.parse(raw);
      if (!Array.isArray(tasks)) return;
      const todayStr = new Date().toISOString().slice(0, 10);
      tasks.forEach(t => {
        const dl = daysLeft(t.dueDate);
        if (dl === null) return;
        const key = `${t.id}@${todayStr}`;
        if (notifyHistory.has(key)) return;
        if (dl < 0) {
          notify('待辦逾期', `${t.title} 已逾期 ${Math.abs(dl)} 天`);
          notifyHistory.set(key, true);
        } else if (dl === 0) {
          notify('今天到期', `${t.title} 今天到期`);
          notifyHistory.set(key, true);
        } else if (dl <= 3) {
          notify('待辦提醒', `${t.title} 剩 ${dl} 天到期`);
          notifyHistory.set(key, true);
        }
      });
    } catch (err) {
      console.error('notify scheduler error:', err);
    }
  };
  // 立即檢查一次，之後每 1 分鐘檢查
  check();
  setInterval(check, 60 * 1000);
}