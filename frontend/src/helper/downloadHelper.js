const { default: axios } = require("axios")
const sharp = require("sharp")
const fs = require('fs');

const downloadImage = async (url, savePath) => {
    const buffer = await fetch(url)
        .then(async (res) => {
            return await res.arrayBuffer()
        })
        .catch((err) => console.error(err))



    sharp(buffer)
        .jpeg()
        .toBuffer()
        .then((value) => {
            fs.createWriteStream(savePath).write(value)
        })
        .catch((err) => console.error(err))
}

const validateUrl = async (url) => {
    try {
        const newUrl = new URL(url)

        const contentType = await fetch(newUrl, { mode: "no-cors", })
            .then((res) => {
                return res.headers.get("Content-Type")
            })
            .catch((err) => console.error(err))



        if (contentType.split("/")[0] != "image" || contentType == null) {
            throw new Error()
        }

        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    downloadImage,
    validateUrl,
}