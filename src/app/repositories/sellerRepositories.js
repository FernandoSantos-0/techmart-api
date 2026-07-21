import pool from "../database/db.js";

class SellerRepositories {

    async findAllSales() {

        const text = `
            SELECT
                o.id,
                u.name AS client_name,
                o.total,
                o.created_at
            FROM orders o
            JOIN users u
                ON o.user_id = u.id
            ORDER BY o.created_at DESC;
        `;

        const result = await pool.query(text);

        return result.rows;

    };

    async findSalesByProduct(product_id) {

        const text = `
            SELECT
                o.id,
                u.name AS client_name,
                p.id AS product_id,
                p.name AS product_name,
                oi.quantity,
                oi.unit_price,
                o.total,
                o.created_at
            FROM orders o
            JOIN users u
                ON o.user_id = u.id
            JOIN order_items oi
                ON o.id = oi.order_id
            JOIN products p
                ON oi.product_id = p.id
            WHERE p.id = $1
            ORDER BY o.created_at DESC;
        `;

        const values = [product_id];

        const result = await pool.query(text, values);

        return result.rows;

    };

};

export default new SellerRepositories();
