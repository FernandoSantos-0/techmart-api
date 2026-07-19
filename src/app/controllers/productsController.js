import ProductsServices from "../services/productsServices.js";

class ProductsControllers {

    async listAllProducts(req,res) {

        try {
            
            const rows = await ProductsServices.listAll();

            return res.status(200).json(rows);

        } catch (error) {
            return res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });
        };
    };

    async listByIdProducts(req,res){

        try {
            
            const id = req.params.id;

            const rows = await ProductsServices.listById(id);

            if (!rows) {
                return res.status(404).json({
                    error: true,
                    mensagem: "Produto não encontrado."
                });
            };

            return res.status(200).json(rows);
            
        } catch (error) { 
            return res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });
        };
    };
    
    async createProduct(req,res){

        try {
            
            const {name,description,price,stock,sold} = req.body;

            const rows = await ProductsServices.createProduct(name,description,price,stock,sold);

            return res.status(200).json({
                error: false, 
                dados: rows}
            );

        } catch (error) {
            return res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });
        };
    };

};

export default new ProductsControllers();
