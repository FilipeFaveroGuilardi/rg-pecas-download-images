const path = require("path");
const Product = require("../entity/product")
const fs = require('fs');

let productList = []

function loadJson(filePath) {
    fs.readFile(filePath, "utf-8", async (err, data) => {
        productList.splice(0, productList.length)

        const list = JSON.parse(data)

        const newList = []

        for (const product of list) {
            const id = product?.id
            const title = product?.name.replace("Classe", "")
            let isCompleted = false

            const foldersPath = path.join(filePath, "../", id.toString())

            const files = await fs.promises.readdir(foldersPath)
            isCompleted = files.length > 0

            const newProduct = new Product(id, title, isCompleted)
            newList.push(newProduct)
        }
        productList = newList
    })
}

function saveJson(filePath) {
    fs.writeFile(filePath, JSON.stringify(productList), "utf-8", (err) => {
        if (err) return
    })
}

function getList() {
    return productList
}


function replaceProduct(product) {
    const newProduct = productList.filter((p) => product.id === p.id)[0]
    const index = productList.indexOf(newProduct)

    productList.splice(index, 1, product)
}

module.exports = { loadJson, getList, replaceProduct, saveJson }