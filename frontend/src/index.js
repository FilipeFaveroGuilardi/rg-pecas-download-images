const { app, BrowserWindow, Menu, MenuItem, dialog, ipcMain, clipboard } = require("electron")
const path = require("path")
const fs = require("fs")
const { createFoldersAndJsonFilesWithPdfFiles } = require("./helper/pdfHelper")
const { downloadImage, validateUrl } = require("./helper/downloadHelper")
const { getList, loadJson, replaceProduct, saveJson } = require('./helper/jsonHelper');
const { loadPath, getPath, savePaths, addPath } = require('./helper/pathHelper');
const Product = require("./entity/product")
const { randomInt } = require("crypto")

const createWindow = () => {
    const window = new BrowserWindow({
        height: 720,
        width: 1024,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    window.loadFile("./views/main.html")

}


const menu = new Menu()
// create config menu
menu.append(new MenuItem({
    label: "config",
    submenu: [
        // create json files submenu
        {
            label: "create json files",
            click: () => handleCreateJsonFiles()
        },
        // set json file path submenu
        {
            label: "set json db path",
            click: () => handleSetPath("json", ["openFile"])
        }
    ]
}))

Menu.setApplicationMenu(menu)

// run app
app.whenReady()
    .then(() => {
        loadPath(loadJson)

        ipcMain.on("download:download-image", handleDownloadImage)
        ipcMain.handle("download:validate-image-url", handleValidateUrl)
        ipcMain.handle("json:get-product", handleGetProduct)
        ipcMain.on("json:next-product", handleNextProduct)

        ipcMain.on("electron:write-clipboard", handleClipboardWrite)
        ipcMain.handle("electron:read-clipboard", handleClipboardRead)
        

        createWindow()
    })
    .catch((err) => console.error(err))
app.on("before-quit", (ev) => {
    savePaths()
    saveJson(path.join(__dirname, "..", "db.json"))
})
// functions
async function handleCreateJsonFiles() {
    const {canceled, filePaths} = await dialog.showOpenDialog({
        properties: ["multiSelections"]
    })

    if (canceled) {
        return;
    }

    for(let pdfFilePath of filePaths) {
        const stream = fs.createReadStream(pdfFilePath)

        createFoldersAndJsonFilesWithPdfFiles(stream, path.basename(pdfFilePath))
    }
}

function handleDownloadImage (event, url, product, index) {
    const folderPath = path.join(getPath("json"), "../")

    downloadImage(url, path.join(folderPath, product.id.toString(), product.title + index.toString() + ".jpg"))
}

function handleValidateUrl(event, url) {
    return validateUrl(url)
}

function handleClipboardRead(event) {
    return clipboard.readText("clipboard")
}

function handleClipboardWrite(event, text) {
    clipboard.write(text)
}

function handleGetProduct(event) {
    return getList().filter((p) => !p.isCompleted).pop()
}

function handleNextProduct(event, product) {
    const newProduct = new Product(product.id, product.title, product.isCompleted).checkIsCompleted()


    replaceProduct(newProduct)
}

async function handleSetPath(key, properties) {
    const { canceled, filePaths } = await dialog.showOpenDialog({properties})
    
    if (canceled) return

    addPath(key, filePaths[0])
}