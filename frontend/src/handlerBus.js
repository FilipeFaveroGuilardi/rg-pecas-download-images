
const { dialog, clipboard } = require("electron")
const fs = require("fs")
const { createFoldersAndJsonFilesWithPdfFiles } = require("./helper/pdfHelper")
const { downloadImage, validateUrl } = require("./helper/downloadHelper")
const { getList, loadJson, replaceProduct, saveJson } = require('./helper/jsonHelper');
const { getPath, addPath } = require('./helper/pathHelper');
const Product = require("./entity/product")
const path = require("path")

// functions
async function handleCreateJsonFiles() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ["multiSelections"]
    })

    if (canceled) {
        return;
    }

    for (let pdfFilePath of filePaths) {
        fs.readFile(pdfFilePath, (err, data) => {
            if (err) console.error(err);

            createFoldersAndJsonFilesWithPdfFiles(data, path.basename(pdfFilePath))
        })
    }

    console.log(getList().filter((p) => !p.isCompleted).length)
}

function handleDownloadImage(event, url, product, index) {
    const folderPath = path.join(getJsonPath(), "../")
    downloadImage(url, path.join(folderPath, product.id.toString(), index.toString() + ".jpg"))
}

function handleValidateUrl(event, url) {
    return validateUrl(url)
}

function handleClipboardRead(event) {
    return clipboard.readText("clipboard")
}

function handleClipboardWrite(event, text) {
    clipboard.writeText(text, "clipboard")
}

function handleGetProduct(event) {
    const product = getList().filter((p) => !p.isCompleted).pop()

    return product
}

function handleNextProduct(event, product) {
    const newProduct = new Product(product.id, product.title, product.isCompleted).checkIsCompleted()

    replaceProduct(newProduct)
}

async function handleSetPath(key, properties) {
    const { canceled, filePaths } = await dialog.showOpenDialog()

    if (canceled) return

    console.log(filePaths[0])

    loadJson(filePaths[0])
    addPath(key, filePaths[0])
}

function handleGetMaxProducts() {
    return getList().length
}

function handleGetRemainingProducts() {
    return getList().filter((p) => !p.isCompleted).length
}

function getJsonPath() {
    const defaultPath = "/home/filipe-f-guilardi/Pictures/pai/ProdutoRelatorioUICatalogoProdutoSource/ProdutoRelatorioUICatalogoProdutoSource_db.json"
    const jsonPath = getPath("json") === undefined ? defaultPath : getPath("json")

    return jsonPath
}

module.exports = {
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
}