const downloadButton = document.getElementById("download")
const imagesDiv = document.getElementById("images")

const urlList = []

window.addEventListener("paste", async () => {


    const url = await window.electronApi.readClipboard()

    window.helpers.validateImageUrl(url)
        .then((res) => {
            if (!res) {
                alert("Url invalida")
                return
            }

            urlList.push(url)
            renderImages()
        })
        .catch((err) => console.error(err))
})

downloadButton.addEventListener("click", async () => {

    alert("asdasd")

    if (urlList.length == 0) return

    for (let url of urlList) {

        window.helpers.validateImageUrl(url)
            .then((res) => {
                if (!res) {
                    return
                }

                window.helpers.downloadImage(url)
            })
            .catch((err) => console.error(err))
    }

    urlList = []
    renderImages()
})

function renderImages() {
    imagesDiv.innerHTML = ""
    for (let url of urlList) {
        const node = document.createElement("img")
        node.setAttribute("src", url)

        imagesDiv.appendChild(node)
    }
}