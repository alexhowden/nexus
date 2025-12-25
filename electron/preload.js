const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFolder: (folderPath) => ipcRenderer.invoke('open-folder', folderPath),
  openExternal: (url) => ipcRenderer.invoke('open-external', url)
});
