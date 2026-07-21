import pool from "../database/db.js";

class ClientRepositories {

    async createOrders(user_id, total) {

        const text = 'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *';
        const values = [user_id, total];

        const result = await pool.query(text, values);

        return result.rows[0];

    };

    async createOrdersItems(order_id, product_id, quantity, unit_price) {

        const text = 'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [order_id,product_id,quantity,unit_price];

        const result = await pool.query(text, values);

        return result.rows[0];

    };

    async updateProductAfterSale(id, quantity) {

        const text = 'UPDATE products SET stock = stock - $1, sold = true WHERE id = $2 RETURNING *';

        const values = [quantity, id];

        const result = await pool.query(text, values);

        return result.rows[0] || null;

    };

};

export default new ClientRepositories();
