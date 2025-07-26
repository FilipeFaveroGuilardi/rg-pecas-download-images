const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require("electron")
const path = require("path")
const { loadJson, saveJson } = require('./helper/jsonHelper');
const { loadPath, getPath, savePaths } = require('./helper/pathHelper');
const {
    handleClipboardRead,
    handleClipboardWrite,
    handleCreateJsonFiles,
    handleDownloadImage,
    handleGetProduct,
    handleNextProduct,
    handleSetPath,
    handleValidateUrl,
    handleGetMaxProducts,
    handleGetRemainingProducts
} = require("./handlerBus")

const createWindow = () => {
    const window = new BrowserWindow({
        height: 720,
        width: 1024,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    })
    window.loadFile("./views/main.html")

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
                click: () => {
                    handleSetPath("json")
                        .then(() => window.webContents.send("UI:update"))
                }
            }
        ]
    }))

    Menu.setApplicationMenu(menu)
}




// run app
app.whenReady()
    .then(() => {
        loadPath(loadJson)

        ipcMain.on("download:download-image", handleDownloadImage)
        ipcMain.handle("download:validate-image-url", handleValidateUrl)
        ipcMain.handle("json:get-product", handleGetProduct)
        ipcMain.on("json:next-product", handleNextProduct)
        ipcMain.handle("products:max-products", handleGetMaxProducts)
        ipcMain.handle("products:remaining-products", handleGetRemainingProducts)

        ipcMain.on("electron:write-clipboard", handleClipboardWrite)
        ipcMain.handle("electron:read-clipboard", handleClipboardRead)


        createWindow()
    })
    .catch((err) => console.error(err))
app.on("before-quit", (ev) => {
    savePaths()
    //saveJson(getJsonPath())
})

function getJsonPath() {
    const defaultPath = "/home/filipe-f-guilardi/Pictures/pai/ProdutoRelatorioUICatalogoProdutoSource/ProdutoRelatorioUICatalogoProdutoSource_db.json"
    const jsonPath = getPath("json") === undefined ? defaultPath : getPath("json")

    console.log(getPath("json"))

    return jsonPath
}