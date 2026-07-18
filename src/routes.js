import { Router } from "express";
import authController from "./app/controllers/authController.js";

const router = Router();

/*Autenticação*/ 

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

/*Produtos*/



/*Compras*/

/*Vendedor*/

export { router };
