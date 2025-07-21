const { default: axios } = require("axios")
const FormData = require("form-data")
const path = require("path")
const fs = require("fs")

// /home/favero/Imagens/pai

const createFoldersAndJsonFilesWithPdfFiles = async (file, filename) => {
    const formData = new FormData()

    formData.append("pdf", file)

    axios.post("http://localhost:8887/extract", formData, {
        headers: {
            ...formData.getHeaders()
        }
    })
    .then((value) => {
        const dirname = filename.split(".")[0]
        const list = value.data
        const folderPath = path.join("/home/favero/Imagens/pai", dirname)


        fs.mkdir(folderPath, (err) => err !== null || console.error(err))
        
        
        createFolders(list, dirname)
        createJsonFile(list, dirname)
    })
    .catch((err) => console.error(err))
}

const createFolders = (list, dirname) => {
    list.forEach((value, index) => {
        let id = value.id
        const folderpath = path.join("/home/favero/Imagens/pai", dirname, id.toString())

    
        fs.mkdir(folderpath, (err) => {
            if (err) {
                console.error(err)
            }
        })
    
        
    })
}

const createJsonFile = (list, dirname) => {
    fs.writeFile(path.join("/home/favero/Imagens/pai", dirname, dirname+"_db.json"), JSON.stringify(list), (err) => {
        if (err) {
            console.error(err);
        }
    })
}

module.exports = {
    createFoldersAndJsonFilesWithPdfFiles
}