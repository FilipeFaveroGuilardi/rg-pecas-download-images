const { app, BrowserWindow, Menu, MenuItem, dialog } = require("electron")
const path = require("path")
const fs = require("fs")
const { createFoldersAndJsonFilesWithPdfFiles } = require("./helper/pdfHelper")

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

Menu.setApplicationMenu(menu)

// run app
app.whenReady()
    .then(() => {
        createWindow()
    })
    .catch((err) => console.error(err))

// functions
const handleCreateJsonFiles = async () => {
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