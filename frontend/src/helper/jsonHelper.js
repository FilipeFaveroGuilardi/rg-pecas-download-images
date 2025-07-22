const Product = require("../entity/product")
const fs = require('fs');

const productList = []

function loadJson(filePath) {
    fs.readFile(filePath, "utf-8", (err, data) => {
        productList.splice(0, productList.length)

        console.log(data);
        

        const list = JSON.parse(data)
        console.table(list)

        const newList = []

        for (const product of list) {
            const newProduct = new Product(product?.id, product?.name, product?.isCompleted)

            newList.push(newProduct)
        }

        productList = newList
    })
}

function saveJson(filePath) {
    fs.writeFile(filePath, JSON.stringify(productList), "utf-8", (err) => {
        if (err) console.error(err)
    })
}

function getList() {
    return productList
}


function replaceProduct(product) {
    const index = productList.indexOf(productList.filter((p) => p.id == product.id))

    productList.splice(index, 1, product)
}

module.exports = { loadJson, getList, replaceProduct, saveJson }