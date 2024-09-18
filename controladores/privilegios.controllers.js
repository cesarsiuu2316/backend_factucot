const PrivilegiosService = require('../servicios/privilegios.services');

const getPrivilegios = async (req, res) => {
    try {
        const privilegios = await PrivilegiosService.getAllPrivilegios();
        res.json(privilegios);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const createPrivilegios = async (req, res) => {
    const PrivilegiosData = req.body;
    try {
        const nuevaPrivilegios = await PrivilegiosService.AsignarPrivilegios(PrivilegiosData);
        res.status(201).json(nuevaPrivilegios);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getPrivilegiosByUser = async (req, res) => {
    const {id_user} = req.params;
    try {
        const PrivilegiosUser = await PrivilegiosService.getAllPrivilegiosOfUser(id_user);
        res.json(PrivilegiosUser);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deletePrivilegios = async (req, res) => {
    const {id_Privilegios, id_user} = req.params;
    try {
        await PrivilegiosService.QuitarPrivilegios(id_Privilegios, id_user);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deletePrivilegiosUser = async (req, res) => {
    const {id_user} = req.params;
    try {
        await PrivilegiosService.QuitarPrivilegiosDeUser( id_user);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};



module.exports = {
    getPrivilegios,
    createPrivilegios,
    getPrivilegiosByUser,
    deletePrivilegios,
    deletePrivilegiosUser
};