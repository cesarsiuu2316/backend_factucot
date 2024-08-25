const express = require('express');
const cotizacionController = require('../controladores/cotizacion.controllers');

const router = express.Router();

router.get('/cotizaciones', cotizacionController.getCotizaciones);
router.get('/cotizaciones/:id', cotizacionController.getCotizacionById);
router.post('/cotizaciones', cotizacionController.createCotizacion);
router.put('/cotizaciones/:id', cotizacionController.updateCotizacion);
router.delete('/cotizaciones/:id', cotizacionController.deleteCotizacion);

module.exports = router;
