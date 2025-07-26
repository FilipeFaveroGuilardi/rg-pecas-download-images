const { default: axios } = require("axios")
const { FormData, File } = require("formdata-node")
const path = require("path")
const fs = require("fs")

// /home/favero/Imagens/pai

const createFoldersAndJsonFilesWithPdfFiles = async (stream, filename) => {
    const formData = new FormData()
    const file = new File([stream], filename)

    formData.set("pdf", file)

    fetch("http://localhost:8887/extract", { method: "POST", body: formData })
        .then((res) => res.json())
        .then((value) => {

            const dirname = filename.split(".")[0]
            const folderPath = path.join("/home/filipe-f-guilardi/Pictures/pai", dirname)

            fs.mkdir(folderPath, (err) => {
                if (err) return
            })


            createFolders(value, dirname)
            createJsonFile(value, dirname)

            console.log(`${filename} created sucefully`)
        })
        .catch((err) => console.error(err))
}

const createFolders = (list, dirname) => {
    list.forEach((value, index) => {
        let id = value.id
        const folderpath = path.join("/home/filipe-f-guilardi/Pictures/pai", dirname, id.toString())

        fs.mkdir(folderpath, (err) => {
            if (err) return
        })
    })
}

const createJsonFile = (list, dirname) => {
    const filepath = path.join("/home/filipe-f-guilardi/Pictures/pai", dirname, dirname + "_db.json")

    fs.writeFile(filepath, JSON.stringify(list), (err) => {
        if (err) return
    })

}

module.exports = {
    createFoldersAndJsonFilesWithPdfFiles
}