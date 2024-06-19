import fs from "fs"

let carts = []
const pathFile = "../data/products.json"

const getCarts = async () => {
    const cartsJson = await fs.promises.readFile(pathFile)
    carts = JSON.parse(cartsJson) || []

    return carts
}

const createCarts = async () => {
    await getCarts();

    const newCart = {
        id: carts.length + 1,
        product: []
    }

    carts.push(newCart)

    await fs.promises.writeFile(pathFile, JSON.stringify(carts))

    return newCart;
}

const getCartById = async (cid) => {
    await getCarts()

    const cart = carts.find(c => c.id === cid)

    if (!cart) return `Could'nt find the cart with the id ${cid}`

    return cart.product
}
const addProductToCart = async (cid, pid) => {
    await getProducts();

    const index = carts.findIndex(c => c.id === cid);
    if (index === -1) return `Could not find cart with ID ${cid}`;

    const cart = carts[index];
    const existingProductIndex = cart.products.findIndex(p => p.product === pid);

    if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
    } else {
        cart.products.push({
            product: pid,
            quantity: 1,
        });
    }
    return carts[index]
}

export default {
    getCarts,
    createCarts,
    getCartById
}