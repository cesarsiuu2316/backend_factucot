const express = require('express');
const reporteController = require('../controladores/reporte.controllers');

const router = express.Router();

router.get('/reporte/star_user', reporteController.getStarUsers);
router.get('/reporte/total_ventas', reporteController.getTotalVentas);
router.get('/reporte/productos/:fecha1/:fecha2', reporteController.getProductosVendidosPorFecha);
router.get('/reporte/facturas/:fecha1/:fecha2', reporteController.getFacturasPorFechas);
router.get('/reporte/cotizaciones/:fecha1/:fecha2', reporteController.getCotizacionesPorFechas);

module.exports = router;
