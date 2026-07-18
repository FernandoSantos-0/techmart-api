
import authServices from "../services/authServices.js";

class AuthController {

    async register (req,res)  {

        try {
            
            const { name, email, password, role } = req.body;

            const result = await authServices.register(name,email,password,role);

            if (result.error) {
                res.status(400).json(result);
            } else {
                res.status(201).json(result);
            };

        } catch (error) {
            res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });
        };

    };

    async login (req,res)  {
        
        try {
            
            const { email, password } = req.body;

            const result = await authServices.login(email,password);

            if (result.error) {
                res.status(401).json(result);
            } else {
                res.status(200).json(result);
            };

        } catch (error) {
            res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });
        }

    };

};

export default new AuthController();
