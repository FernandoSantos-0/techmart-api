import { Router } from "express";
import { authMiddleware } from "./app/middlewares/auth.js";
import  roleMiddleware  from "./app/middlewares/role.js";
import authController from "./app/controllers/authController.js";
import productsController from "./app/controllers/productsController.js";

const router = Router();

/*Autenticação*/ 

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

/*Produtos*/

router.get('/products', authMiddleware, productsController.listAllProducts);
router.get('/products/:id', authMiddleware,productsController.listProductById);

/*Compras*/

/*Vendedor*/

export { router };
