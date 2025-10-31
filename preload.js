const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('todoAPI', {
  loadTasks: () => ipcRenderer.invoke('loadTasks'),
  saveTasks: (tasks) => ipcRenderer.invoke('saveTasks', tasks),
});