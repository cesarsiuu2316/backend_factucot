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

module.exports = {
    getStarUsers,
    getTotalVentas
};
