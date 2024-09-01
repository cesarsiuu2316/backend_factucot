const db = require('../db');

const getAllFacturas = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM "factura"', (err, results) => {
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
        db.query('SELECT * FROM "factura" WHERE id_factura = $1', [id], (err, result) => {
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

const createFactura = (facturaData) => {
    const { fecha_creacion, id_user, id_lista, total, totalNeto, descuento, impuesto, RTN, NombreCliente } = facturaData;
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO "factura" (fecha_creacion, id_user, id_lista, total, totalNeto, descuento, impuesto, RTN, NombreCliente)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id_factura`,
            [fecha_creacion, id_user, id_lista, total, totalNeto, descuento, impuesto, RTN, NombreCliente],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_factura: result.rows[0].id_factura, ...facturaData });
                }
            }
        );
    });
};

const updateFactura = (id, facturaData) => {
    const { fecha_creacion, id_user, id_lista, total, totalNeto, descuento, impuesto, RTN, NombreCliente } = facturaData;
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE "factura" SET fecha_creacion = $1, id_user = $2, id_lista = $3, total = $4, totalNeto = $5, descuento = $6, impuesto = $7, RTN = $8, NombreCliente = $9
             WHERE id_factura = $10`,
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
        db.query('DELETE FROM "factura" WHERE id_factura = $1', [id], (err, results) => {
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
