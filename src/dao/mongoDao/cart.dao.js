import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const getById = async (id) => {
    const carts = await cartsModel.findById(id);
    return carts;
}

const create = async (data) => {
    const carts = await cartsModel.create(data);
    return carts;
}

const addProductToCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };
    const cart = await cartModel.findById(cid);
    if (!cart) return { cart: false };

    const productInCart = await cartModel.findByIdAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } })
    if (!productInCart) {
        await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } })
    }

    const cartUpdate = await cartModel.findById(cid).populate("products.product");
    // const cartUpdate = await cartModel.findById(cid).populate("products.product");
    return cartUpdate;
}

const deleteProductInCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };
    const cart = await cartModel.findByIdAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } })
    if (!cart) return { cart: false };

    const cartUpdate = await cartModel.findById(cid).populate("products.product");
    return cartUpdate;
}

const update = async (cid, data) => {
    await cartModel.updateOne({ _id: cid }, { $set: { products: [] }})
    await cartModel.updateOne({ _id: cid }, { $set: { products: data }})
    const cart = await cartModel.findById(cid);
    return cart;
}

const updateQuantityProductInCar = async (cid, pid, quantity) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };

    const cart = await cartModel.findByIdAndUpdate({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } })
    if (!cart) return { cart: false };
    
    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
}

const deleteAllProductsInCart = async () => {
    const cart = await cartModel.findByIdAndUpdate(cid, {$set: {products: []}})

    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
} 

export default {
    getById,
    create,
    addProductToCart,
    deleteProductInCart,
    update,
    updateQuantityProductInCar,
    deleteAllProductsInCart
}

// 4:00