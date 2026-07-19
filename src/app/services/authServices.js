
import AuthRepositories from "../repositories/authRepositories.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

class AuthServices {

    async register(name, email, password, role) {

        const user = await AuthRepositories.findUserByEmail(email);

        if (user) {
            return {
                error: true,
                mensagem: "email já existe!"
            };
        }

        if (role !== "client" && role !== "seller") {
            return {
                error: true,
                mensagem: "Não foi possível definir o papel do usuário."
            };
        }

        const saltRounds = 10;

        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = {
            name,
            email,
            password: passwordHash,
            role
        };

        const result = await AuthRepositories.createUser(newUser);

        return {
            error: false,
            dados: {
                id: result.id,
                name: result.name,
                email: result.email,
                role: result.role,
            }
        };

    };

    async login(email, password) {

        const user = await AuthRepositories.findUserByEmail(email);

        if (!user) {
            return {
                error: true,
                mensagem: "email não existe!"
            };
        };

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            return {
                error: true,
                mensagem: "senha inválida!"
            };
        };

        const token = jwt.sign(
            {   
                id: user.id, 
                role: user.role 
            },
                process.env.JWT_KEY,
            { 
                expiresIn: '6h' 
            }
        );

        return {
            error: false,
            dados: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token
        };

    };

};

export default new AuthServices();
