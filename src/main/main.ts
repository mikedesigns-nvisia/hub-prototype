import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as path from 'path';
import Store from 'electron-store';

Store.initRenderer();

let launcherWindow: BrowserWindow | null = null;
let loanWindow: BrowserWindow | null = null;
let intranetNewsWindow: BrowserWindow | null = null;

function createLauncherWindow() {
  if (launcherWindow) {
    console.log('Launcher window already exists');
    return;
  }

  const display = screen.getPrimaryDisplay();
  const width = 300;
  const height = 400;

  launcherWindow = new BrowserWindow({
    width,
    height,
    x: Math.floor(display.workArea.width / 2 - width / 2),
    y: Math.floor(display.workArea.height / 2 - height / 2),
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.NODE_ENV === 'development') {
    launcherWindow.loadURL('http://localhost:3000/#/launcher');
  } else {
    launcherWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {
      hash: '/launcher'
    });
  }

  launcherWindow.on('closed', () => {
    launcherWindow = null;
  });
}

function createLoanWindow() {
  if (loanWindow) {
    console.log('Loan window already exists');
    return;
  }

  const display = screen.getPrimaryDisplay();
  const width = 800;
  const height = 600;

  loanWindow = new BrowserWindow({
    width,
    height,
    x: display.workArea.width - width - 20,
    y: 20,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.NODE_ENV === 'development') {
    loanWindow.loadURL('http://localhost:3000/#/loan-pipeline');
  } else {
    loanWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {
      hash: '/loan-pipeline'
    });
  }

  loanWindow.webContents.on('did-finish-load', () => {
    console.log('Loan window loaded');
  });

  loanWindow.on('closed', () => {
    loanWindow = null;
  });
}

function createIntranetNewsWindow() {
  if (intranetNewsWindow) return;

  const display = screen.getPrimaryDisplay();
  const width = 400;
  const height = 600;

  intranetNewsWindow = new BrowserWindow({
    width,
    height,
    x: 20,
    y: display.workArea.height - height - 20,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.NODE_ENV === 'development') {
    intranetNewsWindow.loadURL('http://localhost:3000/#/intranet-news');
  } else {
    intranetNewsWindow.loadFile(path.join(__dirname, '../renderer/index.html'), {
      hash: '/intranet-news'
    });
  }

  intranetNewsWindow.on('closed', () => {
    intranetNewsWindow = null;
  });
}

// IPC handlers
ipcMain.on('LAUNCH_WIDGET', (_, widgetId) => {
  console.log('Launching widget:', widgetId);
  switch (widgetId) {
    case 'loan-pipeline':
      createLoanWindow();
      break;
    case 'intranet-news':
      createIntranetNewsWindow();
      break;
  }
});

ipcMain.on('CLOSE_LAUNCHER', () => {
  if (launcherWindow) launcherWindow.close();
});

ipcMain.on('MINIMIZE_INTRANET_NEWS', () => {
  if (intranetNewsWindow) intranetNewsWindow.minimize();
});

ipcMain.on('CLOSE_INTRANET_NEWS', () => {
  if (intranetNewsWindow) intranetNewsWindow.close();
});

// Add loan pipeline controls
ipcMain.on('MINIMIZE_WINDOW', () => {
  if (loanWindow) {
    console.log('Minimizing loan window');
    loanWindow.minimize();
  }
});

ipcMain.on('CLOSE_WINDOW', () => {
  if (loanWindow) {
    console.log('Closing loan window');
    loanWindow.close();
  }
});

// App lifecycle handlers
app.whenReady().then(() => {
  console.log('App ready - creating launcher window only');
  createLauncherWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!launcherWindow) {
    createLauncherWindow();
  }
});