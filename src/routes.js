import { Router } from "express";
import auth from "./app/middlewares/auth.js";
import role from "./app/middlewares/role.js";
import AuthController from "./app/controllers/authController.js";
import ProductsController from "./app/controllers/productsController.js";

const router = Router();

/*Autenticação*/ 

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

/*Produtos*/

router.get('/products', auth, ProductsController.listAllProducts);
router.get('/products/:id', auth, ProductsController.listByIdProducts);

/*Compras*/

/*Vendedor*/

export { router };
