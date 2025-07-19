const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("download", {
    downloadImage: () => ipcRenderer.send("download-image")
})