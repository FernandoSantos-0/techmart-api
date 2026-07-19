import pool from "../database/db.js";
class AuthRepositories {

    async findUserByEmail(email) {

        const text = 'SELECT * FROM users WHERE email = $1';
        const values = [email];

        const result = await pool.query(text, values);

        return result.rows[0];

    };

    async createUser(user) {

        const text = 'INSERT INTO users (name,email,password,role) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [
            user.name,
            user.email,
            user.password,
            user.role
        ];

        const result = await pool.query(text, values);

        return result.rows[0];

    };

    async findUserById(id) {

        const text = 'SELECT * FROM users WHERE id = $1';
        const values = [id];

        const result = await pool.query(text, values);

        return result.rows[0];

    };


};

export default new AuthRepositories();
