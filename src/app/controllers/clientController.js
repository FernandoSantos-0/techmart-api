import ClientServices from "../services/clientServices.js";

class ClientController {

    async clientBuy(req, res) {

        try {

            const user_id = req.user.id;
            const { products } = req.body;

            const rows = await ClientServices.clientBuy(user_id, products);

            return res.status(201).json(rows);

        } catch (error) {console.log(error)
            return res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });

        };

    };

    async listOrders(req, res) {

        try {

            const user_id = req.user.id;

            const result = await ClientServices.listOrders(user_id);

            if (result.error) {
                return res.status(404).json(result);
            }

            return res.status(200).json(result);

        } catch (error) {

            return res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });

        };
    };
};

export default new ClientController();
