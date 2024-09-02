const db = require('../db');

const getAllCotizaciones = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM "cotizacion"', (err, results) => {
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
        db.query('SELECT * FROM "cotizacion" WHERE id_cotizacion = $1', [id], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.rows.length === 0) {
                resolve(null);
            } else {
                resolve(result.rows[0]);
            }
        });
    });
};

const createCotizacion = (cotizacionData) => {
    const { id_lista, id_user, fecha_creacion, fecha_caducidad, total, total_neto, descuento, impuesto, nombre_cliente } = cotizacionData;
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO "cotizacion" (id_lista, id_user, fecha_creacion, fecha_caducidad, total, total_neto, descuento, impuesto, nombre_cliente)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_cotizacion`,
            [id_lista, id_user, fecha_creacion, fecha_caducidad, total, total_neto, descuento, impuesto, nombre_cliente],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_cotizacion: result.rows[0].id_cotizacion, ...cotizacionData });
                }
            }
        );
    });
};

const updateCotizacion = (id, cotizacionData) => {
    const { id_lista, id_user, fecha_creacion, fecha_caducidad, total, total_neto, descuento, impuesto, nombre_cliente } = cotizacionData;
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE "cotizacion" SET id_lista = $1, id_user = $2, fecha_creacion = $3, fecha_caducidad = $4, total = $5, total_neto = $6, descuento = $7, impuesto = $8, nombre_cliente = $9
             WHERE id_cotizacion = $10`,
            [id_lista, id_user, fecha_creacion, fecha_caducidad, total, total_neto, descuento, impuesto, nombre_cliente, id],
            (err, result) => {
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
        db.query('DELETE FROM "cotizacion" WHERE id_cotizacion = $1', [id], (err, results) => {
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
