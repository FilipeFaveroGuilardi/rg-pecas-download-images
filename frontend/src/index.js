const { app, BrowserWindow, Menu, MenuItem, dialog, ipcMain, clipboard } = require("electron")
const path = require("path")
const fs = require("fs")
const { createFoldersAndJsonFilesWithPdfFiles } = require("./helper/pdfHelper")
const { downloadImage, validateUrl,  } = require("./helper/downloadHelper")

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
        // set json file submenu
        {
            label: "set json db"
        }
    ]
}))

//Menu.setApplicationMenu(menu)

// run app
app.whenReady()
    .then(() => {
        ipcMain.on("download:download-image", handleDownloadImage)
        ipcMain.handle("download:validate-image-url", handleValidateUrl)

        ipcMain.on("electron:write-clipboard", handleClipboardWrite)
        ipcMain.handle("electron:read-clipboard", handleClipboardRead)

        createWindow()
    })
    .catch((err) => console.error(err))

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

function handleDownloadImage (event, url) {
    downloadImage(url, "/home/favero/Documentos/Code/rg-pecas-download-images/frontend/img.jpg")
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