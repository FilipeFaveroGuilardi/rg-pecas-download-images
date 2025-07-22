const fs = require('fs');
const path = require('path');

let pathList = {}

async function loadPath(loadJson) {
    fs.access(path.join(__dirname, "../../path_db.json"), (err) => {
        if (err) {
            fs.writeFile(path.join(__dirname, "../../path_db.json"), "", "utf-8", (err) => {
                if (err) console.error(err)
            })
        }

        fs.readFile(path.join(__dirname, "../../path_db.json"), "utf-8", (err, data) => {
            console.log(data)
            pathList = data === undefined ? {} : JSON.parse(data)
        })

        const defaultPath = "/home/favero/Imagens/pai/ProdutoRelatorioUICatalogoProdutoSource/ProdutoRelatorioUICatalogoProdutoSource_db.json"
        const jsonPath = getPath("json") === undefined ? defaultPath : getPath("json")
    })
}

function getPath(key) {
    return pathList[key]
}

function addPath(key, value) {
    pathList[key] = value
}

function savePaths() {
    if (pathList === null) {
        return
    }

    fs.writeFile(path.join(__dirname, "../../path_db.json"), JSON.stringify(pathList), "utf-8", (err) => {
        if (err) console.error(err)
    })
}


module.exports = { loadPath, savePaths, getPath, addPath }