import ProductsRepositories from '../repositories/productsRepositories.js';

class ProductsServices {

    async listAll() {

        const rows = await ProductsRepositories.findAll();

        return rows;

    };

    async listById(id) {

        const rows = await ProductsRepositories.findById(id);
    
        return rows;

    };

};

export default new ProductsServices();
