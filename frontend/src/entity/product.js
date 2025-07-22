class Product {
    constructor(id, title, isCompleted) {
        this.id = id
        this.title = title
        this.isCompleted = isCompleted
    }

    checkIsCompleted() {
        this.isCompleted = true

        return this
    }
}

module.exports = Product