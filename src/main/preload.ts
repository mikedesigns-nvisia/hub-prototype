import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // Launcher controls
  launchWidget: (widgetId: string) => ipcRenderer.send('LAUNCH_WIDGET', widgetId),
  closeLauncher: () => ipcRenderer.send('CLOSE_LAUNCHER'),
  
  // Loan Pipeline controls
  minimize: () => ipcRenderer.send('MINIMIZE_WINDOW'),
  close: () => ipcRenderer.send('CLOSE_WINDOW'),
  
  // News controls
  minimizeIntranetNews: () => ipcRenderer.send('MINIMIZE_INTRANET_NEWS'),
  closeIntranetNews: () => ipcRenderer.send('CLOSE_INTRANET_NEWS'),
});