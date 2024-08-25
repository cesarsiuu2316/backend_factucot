const express = require('express');
const facturaController = require('../controladores/factura.controllers');

const router = express.Router();

router.get('/facturas', facturaController.getFacturas);
router.get('/facturas/:id', facturaController.getFacturaById);
router.post('/facturas', facturaController.createFactura);
router.put('/facturas/:id', facturaController.updateFactura);
router.delete('/facturas/:id', facturaController.deleteFactura);

module.exports = router;
