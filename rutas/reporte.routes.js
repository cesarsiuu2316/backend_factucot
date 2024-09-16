const express = require('express');
const reporteController = require('../controladores/reporte.controllers');

const router = express.Router();

router.get('/reporte/star_user', reporteController.getStarUsers);
router.get('/reporte/total_ventas', reporteController.getTotalVentas);
router.get('/reporte/:fecha1/:fecha2', reporteController.getProductosVendidosPorFecha);

module.exports = router;
