const { app, BrowserWindow, Menu, MenuItem } = require("electron")

const createWindow = () => {
    const window = new BrowserWindow({
        height: 720,
        width: 1024,
        webPreferences: {
            preload: "./preload.js"
        }
    })

    window.loadFile("./views/main.html")
    
}


const menu = new Menu()
// config buttons
menu.append(new MenuItem({
    label: "config",
    submenu: [
        // create json files sub menu
        {
            label: "create json files"
        },
        // set json file sub menu
        {
            label: "set json db"
        }
    ]
}))

Menu.setApplicationMenu(menu)

app.whenReady()
    .then(() => {
        createWindow()
    })
    .catch((err) => console.error(err))