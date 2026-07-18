import productsRepositories from '../repositories/productsRepositories.js';

class productsControllers {

    async listAllProducts(req,res) {

        try {
            
            const rows = await productsRepositories.findAll();

            res.status(200).json(rows);
            
        } catch (error) {
            res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });
        };

    };

    async listProductById(req,res) {

        try {
            
            const id = req.params.id;

            const rows = await productsRepositories.findById(id);

            res.status(200).json(rows);
            
        } catch (error) {
            res.status(500).json({
                error: true,
                mensagem: "Erro interno do servidor."
            });
        };
    };

};

export default new productsControllers();
