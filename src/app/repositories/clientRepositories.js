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

    async findOrdersByUserId(user_id) {

        const text = `
            SELECT
                o.id,
                o.total,
                o.created_at,
                oi.product_id,
                p.name AS product_name,
                oi.quantity,
                oi.unit_price
            FROM orders o
            JOIN order_items oi
                ON o.id = oi.order_id
            JOIN products p
                ON p.id = oi.product_id
            WHERE o.user_id = $1
            ORDER BY o.created_at DESC`;

        const values = [user_id];

        const result = await pool.query(text, values);

        return result.rows;

    };

};

export default new ClientRepositories();
