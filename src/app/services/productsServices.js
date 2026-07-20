import ProductsRepositories from '../repositories/productsRepositories.js';

class ProductsServices {

    async listAll() {

        const rows = await ProductsRepositories.findAll();

        return rows;

    };

    async listById(id) {

        const rows = await ProductsRepositories.findById(id);
    
        if (!rows) {
            return {
                error: true,
                mensagem: "Produto não encontrado."
            };
        };

        return rows;

    };

    async createProduct(name,description,price,stock,sold){

        if (!name || !description) {
            return {
                error: true,
                mensagem: "Nome e descrição são obrigatórios."
            };
        };

        if (price < 0 || typeof sold !== "boolean" || stock < 0) {
            return {
                error: true,
                mensagem: "Valores inválidos."
            };
        };

        const rows = await ProductsRepositories.create(name,description,price,stock,sold);

        return rows;

    };

    async updateProduct(name,description,price,stock,id){

        if (!name || !description || price == null || stock == null || price < 0 || stock < 0) {
            return {
                error: true,
                mensagem: "Valores inválidos."
            };
        };

        const rows = await ProductsRepositories.update(name,description,price,stock,id);

        if (!rows) {
            return {
                error: true,
                mensagem: "Produto não encontrado."
            };
        };

        return rows;

    };

    async deleteProduct(id) {

        const rows = await ProductsRepositories.delete(id);

        if (!rows) {
            return {
                error: true,
                mensagem: "Produto não encontrado."
            };
        }

        return rows;

    };

};

export default new ProductsServices();
