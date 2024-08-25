const cotizacionService = require('../servicios/cotizacion.services');

const getCotizaciones = async (req, res) => {
    try {
        const cotizaciones = await cotizacionService.getAllCotizaciones();
        res.json(cotizaciones);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getCotizacionById = async (req, res) => {
    const {id} = req.params;
    try {
        const cotizacion = await cotizacionService.getCotizacionById(id);
        if (cotizacion) {
            res.json(cotizacion);
        } else {
            res.status(404).send('Cotización no encontrada');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createCotizacion = async (req, res) => {
    const cotizacionData = req.body;
    try {
        const nuevaCotizacion = await cotizacionService.createCotizacion(cotizacionData);
        res.status(201).json(nuevaCotizacion);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateCotizacion = async (req, res) => {
    const {id} = req.params;
    const cotizacionData = req.body;
    try {
        const cotizacionActualizada = await cotizacionService.updateCotizacion(id, cotizacionData);
        res.json(cotizacionActualizada);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteCotizacion = async (req, res) => {
    const {id} = req.params;
    try {
        await cotizacionService.deleteCotizacion(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getCotizaciones,
    getCotizacionById,
    createCotizacion,
    updateCotizacion,
    deleteCotizacion
};
