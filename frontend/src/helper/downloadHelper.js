const { default: axios } = require("axios")
const sharp = require("sharp")
const fs = require('fs');

const downloadImage = async (url, savePath) => {
    const placeHolderImageUrl = "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"

    const buffer = await fetch(placeHolderImageUrl)
        .then(async (res) => {
            console.log(res.headers)

            return await res.arrayBuffer()
        })
    
    sharp(buffer)
        .jpeg()
        .toBuffer()
        .then((value) => {
            fs.createWriteStream(savePath).write(value)
        })
        .catch(console.error)
}

module.exports = {
    downloadImage
}