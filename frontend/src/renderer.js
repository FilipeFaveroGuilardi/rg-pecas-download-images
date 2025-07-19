const downloadButton = document.getElementById("download")

const urlList = []

downloadButton.addEventListener("click", () => {
    window.download.downloadImage()
})