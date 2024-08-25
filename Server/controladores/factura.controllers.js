const facturaService = require('../servicios/factura.services');

const getFacturas = async (req, res) => {
    try {
        const facturas = await facturaService.getAllFacturas();
        res.json(facturas);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getFacturaById = async (req, res) => {
    const {id} = req.params;
    try {
        const factura = await facturaService.getFacturaById(id);
        if (factura) {
            res.json(factura);
        } else {
            res.status(404).send('Factura no encontrada');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createFactura = async (req, res) => {
    const facturaData = req.body;
    try {
        const nuevaFactura = await facturaService.createFactura(facturaData);
        res.status(201).json(nuevaFactura);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateFactura = async (req, res) => {
    const {id} = req.params;
    const facturaData = req.body;
    try {
        const facturaActualizada = await facturaService.updateFactura(id, facturaData);
        res.json(facturaActualizada);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteFactura = async (req, res) => {
    const {id} = req.params;
    try {
        await facturaService.deleteFactura(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getFacturas,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura
};
