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
            pathList = data === "" ? {} : JSON.parse(data)

            if (loadJson !== undefined) {
                const defaultPath = "/home/filipe-f-guilardi/Pictures/pai/ProdutoRelatorioUICatalogoProdutoSource/ProdutoRelatorioUICatalogoProdutoSource_db.json"
                const jsonPath = getPath("json") === undefined ? defaultPath : getPath("json")


                loadJson(jsonPath)
            }
        })


    })
}

function getPath(key) {
    if (pathList !== null) {
        return pathList[key]
    }
}

function addPath(key, value) {
    pathList[key] = value
}

function savePaths() {
    if (pathList === null) {
        return
    }

    fs.writeFile(path.join(__dirname, "../../path_db.json"), JSON.stringify(pathList), "utf-8", (err) => {
        if (err) console.error(err);
    })
}


module.exports = { loadPath, savePaths, getPath, addPath }