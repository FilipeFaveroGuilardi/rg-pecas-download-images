const downloadButton = document.getElementById("download")
const imagesDiv = document.getElementById("images")

const idLabel = document.getElementById("id")
const titleLabel = document.getElementById("title")

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

window.addEventListener("DOMContentLoaded", () => {
    renderProduct()
})

window.addEventListener("copy", async () => {
    const product = await getProduct()

    window.electronApi.writeInClipboard(product.title)
})

downloadButton.addEventListener("click", async () => {
    renderProduct()

    const product = await getProduct()

    if (urlList.length == 0) return

    for (let i = 0; i < urlList.length, i++;) {
        const url = urlList[i]

        window.helpers.validateImageUrl(url)
            .then((res) => {
                if (!res) {
                    return
                }

                window.helpers.downloadImage(url, product, i)
            })
            .catch((err) => console.error(err))
    }

    window.helpers.nextProduct(product)

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

async function renderProduct() {
    const product = await getProduct()

    idLabel.textContent = product.id
    titleLabel.textContent = product.title
}

async function getProduct() {
    return await window.helpers.getProduct()
}