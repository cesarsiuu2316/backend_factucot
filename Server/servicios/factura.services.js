const db = require('../db');

const getAllFacturas = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM factura', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getFacturaById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM factura WHERE id_factura = ?', [id], (err, results) => {
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

const createFactura = (facturaData) => {
    const { fecha_creacion, id_user, id_lista, total, totalNeto, descuento, impuesto, RTN, NombreCliente } = facturaData;
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO factura (fecha_creacion, id_user, id_lista, total, totalNeto, descuento, impuesto, RTN, NombreCliente)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [fecha_creacion, id_user, id_lista, total, totalNeto, descuento, impuesto, RTN, NombreCliente],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_factura: results.insertId, ...facturaData });
                }
            }
        );
    });
};

const updateFactura = (id, facturaData) => {
    const { fecha_creacion, id_user, id_lista, total, totalNeto, descuento, impuesto, RTN, NombreCliente } = facturaData;
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE factura SET fecha_creacion = ?, id_user = ?, id_lista = ?, total = ?, totalNeto = ?, descuento = ?, impuesto = ?, RTN = ?, NombreCliente = ?
             WHERE id_factura = ?`,
            [fecha_creacion, id_user, id_lista, total, totalNeto, descuento, impuesto, RTN, NombreCliente, id],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_factura: id, ...facturaData });
                }
            }
        );
    });
};

const deleteFactura = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM factura WHERE id_factura = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllFacturas,
    getFacturaById,
    createFactura,
    updateFactura,
    deleteFactura
};
