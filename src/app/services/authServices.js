
import authRepositories from "../repositories/authRepositories.js";
import bcrypt from "bcryptjs";

class AuthServices {

    async register(name, email, password, role) {

        const user = await authRepositories.findUserByEmail(email);

        if (user) {
            return "Email já existe!";
        };

        if (role !== "client" && role !== "seller") {
            return "Não foi possível definir o papel do usuário.";
        };

        const saltRounds = 10;

        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = {
            name,
            email,
            password: passwordHash,
            role
        };

        const result = await authRepositories.createUser(newUser);

        const { id, name, email, role, created_at } = result;

        return {
            id,
            name,
            email,
            role,
            created_at
        };

    };


};

export default new AuthServices();
