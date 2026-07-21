import ClientRepositories from "../repositories/clientRepositories.js";
import ProductsRepositories from "../repositories/productsRepositories.js";

class ClientServices {

    async clientBuy(user_id, products) {

        let total = 0;

        for (const item of products) {

            const product = await ProductsRepositories.findById(item.product_id);

            if (!product) {
                return {
                    error: true,
                    mensagem: `Produto ${item.product_id} não encontrado.`
                };
            }

            if (product.stock < item.quantity) {
                return {
                    error: true,
                    mensagem: `Estoque insuficiente para ${product.name}.`
                };
            }

            total += product.price * item.quantity;

        }

        const order = await ClientRepositories.createOrders(user_id, total);

        for (const item of products) {

            const product = await ProductsRepositories.findById(item.product_id);

            await ClientRepositories.createOrdersItems(
                order.id,
                product.id,
                item.quantity,
                product.price
            );

            await ClientRepositories.updateProductAfterSale(
                product.id,
                item.quantity
            );

        }

        return {
            error: false,
            dados: {
                order_id: order.id,
                total,
                created_at: order.created_at
            }
        };

    }

}

export default new ClientServices();