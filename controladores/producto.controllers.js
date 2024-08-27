const productoService = require('../servicios/productos.services');

const getProductos = async (req, res) => {
    try {
        const productos = await productoService.getAllProductos();
        res.json(productos);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await productoService.getProductoById(id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (err) {
        console.error('Error fetching producto:', err);
        res.status(500).send(err.message);
    }
};

const createProducto = async (req, res) => {
    const productoData = req.body;
    try {
        const nuevoProducto = await productoService.createProducto(productoData);
        res.status(201).json(nuevoProducto);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateProducto = async (req, res) => {
    const { id } = req.params;
    const productoData = req.body;
    try {
        const productoActualizado = await productoService.updateProducto(id, productoData);
        res.json(productoActualizado);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        await productoService.deleteProducto(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};
