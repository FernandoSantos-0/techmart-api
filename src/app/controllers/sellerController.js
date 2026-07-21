import SellerServices from "../services/sellerServices.js";

class SellerController {

    async listSales(req, res) {

        try {

            const result = await SellerServices.listSales();

            return res.status(200).json(result);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });

        };

    };

    async listSalesByProduct(req, res) {

        try {

            const { product_id } = req.params;

            const result = await SellerServices.listSalesByProduct(product_id);

            if (result.error) {
                return res.status(404).json(result);
            }

            return res.status(200).json(result);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });

        };

    };

};

export default new SellerController();
