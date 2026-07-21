import SellerRepositories from "../repositories/sellerRepositories.js";

class SellerServices {

    async listSales() {

        const rows = await SellerRepositories.findAllSales();

        return {
            error: false,
            dados: rows
        };

    };

    async listSalesByProduct(product_id) {

        const rows = await SellerRepositories.findSalesByProduct(product_id);

        if (rows.length === 0) {

            return {
                error: true,
                mensagem: "Nenhuma venda encontrada."
            };

        };

        return {
            error: false,
            dados: rows
        };

    };

};

export default new SellerServices();
