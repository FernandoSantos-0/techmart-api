
import authRepositories from "../repositories/authRepositories.js";
import bcrypt from "bcryptjs";

class AuthServices {

    async register(name, email, password, role) {

        const user = await authRepositories.findUserByEmail(email);

        if (user) {
            throw new Error("email já existe!");
        }

        if (role !== "client" && role !== "seller") {
            throw new Error("Não foi possível definir o papel do usuário.");
        }

        const saltRounds = 10;

        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = {
            name,
            email,
            password: passwordHash,
            role
        };

        const result = await authRepositories.createUser(newUser);

        const { id, name: userName, email: userEmail, role: userRole, created_at } = result;

        return {
            id,
            name: userName,
            email: userEmail,
            role: userRole,
            created_at
        };

    };

    async login(email, password) {

        const user = await authRepositories.findUserByEmail(email);

        if (!user) {
            throw new Error("email não existe!");
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            throw new Error("senha inválida!");
        }

        const { id, name, email: userEmail, role, created_at } = user;

        return {
            id,
            name,
            email: userEmail,
            role,
            created_at
        };

    };

};

export default new AuthServices();
