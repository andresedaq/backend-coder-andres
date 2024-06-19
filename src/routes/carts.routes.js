import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js"

const router = Router();

router.post("/", async (req, res) => {
    try {
        const cart = cartDao.create();

        res.status(201).json({ status: "success", payload: cart })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await cartDao.addProductToCart(cid, pid)
        if (cart.product == false) return res.status(404).json({ status: "Error", msg: "No se encontro" })
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: "No se encontro" })

        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
})

router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await cartDao.updateQuantityProductInCar(cid, pid, quantity)
        if (cart.product == false) return res.status(404).json({ status: "Error", msg: "No se encontro" })
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: "No se encontro" })

        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const cart = await cartDao.deleteProductInCart(cid, pid)
        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontro el producto con id ${pid}` })
        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontro el carrito con id ${cid}` })

        res.status(201).json({ status: "success", payload: cart })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: "No se encontro" })

        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
})

router.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const body = req.body;
        const cart = await cartDao.update(cid, body);
        if (!cart) return res.status(404).json({ status: "Error", msg: "No se encontro" })

        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
})

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.deleteAllProductsInCart(cid)
        if (!cart) return res.status(404).json({ status: "Error", msg: "No se encontro" })

        res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" })
    }
})


export default router;