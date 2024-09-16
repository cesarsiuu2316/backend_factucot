const { get } = require('../rutas/user.routes');
const reporteService = require('../servicios/reporte.services');

const getStarUsers = async (req, res) => {
    try {
        const star_user = await reporteService.getTopStarUsers();
        res.json(star_user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getTotalVentas = async (req, res) => {
    try {
        const total_ventas = await reporteService.getTotalVentas();
        res.json(total_ventas);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getProductosVendidosPorFecha = async (req, res) => {
    const { fecha1, fecha2 } = req.params; 
    try {
        const productos = await reporteService.getProductosVendidosPorFechas(fecha1, fecha2); 
        if (productos && productos.length > 0) {
            res.json(productos); 
        } else {
            res.status(404).send('No se vendieron productos entre estas fechas'); 
        }
    } catch (err) {
        res.status(500).send(err.message); 
    }
};

const getFacturasPorFechas = async (req, res) => {
    const { fecha1, fecha2 } = req.params; 
    try {
        const facturas = await reporteService.getFacturasPorFecha(fecha1, fecha2); 
        if (facturas && facturas.length > 0) {
            res.json(facturas); 
        } else {
            res.status(404).send('No hay facturas entre estas fechas'); 
        }
    } catch (err) {
        res.status(500).send(err.message); 
    }
};

const getCotizacionesPorFechas = async (req, res) => {
    const { fecha1, fecha2 } = req.params; 
    try {
        const cotizaciones = await reporteService.getCotizacionesPorFecha(fecha1, fecha2); 
        if (cotizaciones && cotizaciones.length > 0) {
            res.json(cotizaciones); 
        } else {
            res.status(404).send('No hay cotizaciones entre estas fechas'); 
        }
    } catch (err) {
        res.status(500).send(err.message); 
    }
};

module.exports = {
    getStarUsers,
    getTotalVentas,
    getProductosVendidosPorFecha,
    getFacturasPorFechas,
    getCotizacionesPorFechas
};
