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

    async createProduct(name,description,price,stock,sold){

        const rows = await ProductsRepositories.create(name,description,price,stock,sold);

        return rows;

    };

};

export default new ProductsServices();
