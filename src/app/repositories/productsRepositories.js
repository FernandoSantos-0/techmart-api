import pool from "../database/db.js";

class ProductsRepositories {

    async findAll() {
        
        const text = 'SELECT * FROM products';

        const result = await pool.query(text);

        return result.rows;

    };

    async findById(id) {

        const text = 'SELECT * FROM products WHERE id = $1';
        const values = [id];

        const result = await pool.query(text, values);

        return result.rows[0];

    };

    async create(name,description,price,stock,sold) {

        const text = 'INSERT INTO products (name,description,price,stock,sold) VALUES ($1,$2,$3,$4,$5) RETURNING *';
        const values = [name,description,price,stock,sold];

        const result = await pool.query(text,values);

        return result.rows[0];

    };

};

export default new ProductsRepositories();
