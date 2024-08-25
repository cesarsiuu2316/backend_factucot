const express = require('express');
const productoController = require('../controladores/producto.controllers');

const router = express.Router();

router.get('/productos', productoController.getProductos);
router.get('/productos/:id', productoController.getProductoById);
router.post('/productos', productoController.createProducto);
router.put('/productos/:id', productoController.updateProducto);
router.delete('/productos/:id', productoController.deleteProducto);

module.exports = router;
