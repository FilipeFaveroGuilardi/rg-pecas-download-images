const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("helpers", {
    downloadImage: (url) => ipcRenderer.send("download:download-image", url),
    validateImageUrl: (url) => ipcRenderer.invoke("download:validate-image-url", url),
})

contextBridge.exposeInMainWorld("electronApi", {
    readClipboard: () => ipcRenderer.invoke("electron:read-clipboard"),
    writeInClipboard: (text) => ipcRenderer.send("electron:write-clipboard", text)
})