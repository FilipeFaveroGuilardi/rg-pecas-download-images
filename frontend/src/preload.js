const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("helpers", {
    downloadImage: (url, product, index) => ipcRenderer.send("download:download-image", url, product, index),
    validateImageUrl: (url) => ipcRenderer.invoke("download:validate-image-url", url),
    getProduct: () => ipcRenderer.invoke("json:get-product"),
    nextProduct: (product) => ipcRenderer.send("json:next-product", product),
    getMaxProducts: () => ipcRenderer.invoke("products:max-products"),
    getRemainingProducts: () => ipcRenderer.invoke("products:remaining-products")
})

contextBridge.exposeInMainWorld("electronApi", {
    readClipboard: () => ipcRenderer.invoke("electron:read-clipboard"),
    writeInClipboard: (text) => ipcRenderer.send("electron:write-clipboard", text)
})

contextBridge.exposeInMainWorld("renderer", {
    updateUI: (cb) => ipcRenderer.on("UI:update", (ev) => cb())
})