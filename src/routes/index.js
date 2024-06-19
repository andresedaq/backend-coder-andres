import { Router } from "express";
import productRouters from "../routes/products.routes.js"
import cartsRouters from "../routes/carts.routes.js"
import { isLogin } from "../middlewares/isLogin.middleware.js";
import sessionRouter from "./session.routes.js"


// Configuracion de Endpoints
const router = Router();
router.use("/products", isLogin, productRouters);
router.use("/carts", cartsRouters);
router.use("/session", sessionRouter);


export default router;