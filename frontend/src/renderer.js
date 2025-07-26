const downloadButton = document.getElementById("download")
const imagesDiv = document.getElementById("images")

const idLabel = document.getElementById("id")
const titleLabel = document.getElementById("title")
const remainingProductsLabel = document.getElementById("remaining-products")
const maxProductsLabel = document.getElementById("max-products")

const urlList = []

window.renderer.updateUI(() => {
    renderImages()
    renderProduct()
})

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
    window.electronApi.writeInClipboard(product.title.toString())
})

downloadButton.addEventListener("click", async () => {
    if (urlList.length == 0) {
        alert("No Links")
        return
    }

    const product = await getProduct()
    for (let i = 0; i < urlList.length; i++) {

        const url = urlList[i]


        window.helpers.downloadImage(url, product, i)
    }

    window.helpers.nextProduct(product)

    urlList.splice(0, urlList.length)
    window.electronApi.writeInClipboard(product.title.toString())
    renderImages()
    renderProduct()
})

function renderImages() {
    imagesDiv.innerHTML = null
    for (let url of urlList) {
        const node = document.createElement("img")
        node.setAttribute("src", url)

        imagesDiv.appendChild(node)
    }
}

async function renderProduct() {
    const product = await getProduct()
    const maxProducts = await window.helpers.getMaxProducts()
    const remainingProducts = await window.helpers.getRemainingProducts()

    idLabel.textContent = product.id
    titleLabel.textContent = product.title

    remainingProductsLabel.textContent = remainingProducts
    maxProductsLabel.textContent = maxProducts
}

async function getProduct() {
    return await window.helpers.getProduct()
}