const db = require('../db');

const getAllCotizaciones = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM cotizacion', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getCotizacionById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM cotizacion WHERE id_cotizacion = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else if (results.length === 0) {
                resolve(null);
            } else {
                resolve(results[0]);
            }
        });
    });
};

const createCotizacion = (cotizacionData) => {
    const { id_lista, id_user, fecha_creacion, fecha_caducidad, total, totalNeto, descuento, impuesto, NombreCliente } = cotizacionData;
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO cotizacion (id_lista, id_user, fecha_creacion, fecha_caducidad, total, totalNeto, descuento, impuesto, NombreCliente)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id_lista, id_user, fecha_creacion, fecha_caducidad, total, totalNeto, descuento, impuesto, NombreCliente],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_cotizacion: results.insertId, ...cotizacionData });
                }
            }
        );
    });
};

const updateCotizacion = (id, cotizacionData) => {
    const { id_lista, id_user, fecha_creacion, fecha_caducidad, total, totalNeto, descuento, impuesto, NombreCliente } = cotizacionData;
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE cotizacion SET id_lista = ?, id_user = ?, fecha_creacion = ?, fecha_caducidad = ?, total = ?, totalNeto = ?, descuento = ?, impuesto = ?, NombreCliente = ?
             WHERE id_cotizacion = ?`,
            [id_lista, id_user, fecha_creacion, fecha_caducidad, total, totalNeto, descuento, impuesto, NombreCliente, id],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_cotizacion: id, ...cotizacionData });
                }
            }
        );
    });
};

const deleteCotizacion = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM cotizacion WHERE id_cotizacion = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllCotizaciones,
    getCotizacionById,
    createCotizacion,
    updateCotizacion,
    deleteCotizacion
};
