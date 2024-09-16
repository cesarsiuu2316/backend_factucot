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
    const { fecha1, fecha2 } = req.params; // Destructure the dates from params
    try {
        const productos = await reporteService.getProductosVendidosPorFechas(fecha1, fecha2); // Fetch the report
        if (productos && productos.length > 0) {
            res.json(productos); // Return the products sold within the dates
        } else {
            res.status(404).send('No se vendieron productos entre estas fechas'); // Handle case with no data
        }
    } catch (err) {
        res.status(500).send(err.message); // Send error if something fails
    }
};

module.exports = {
    getStarUsers,
    getTotalVentas,
    getProductosVendidosPorFecha
};
