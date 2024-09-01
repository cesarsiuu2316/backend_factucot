const db = require('../db');

const getAllListas = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM "lista"', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getListaById = (id_lista) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM "lista" WHERE id_lista = $1 ', [id_lista], (err, result) => {
            if (err) {
                reject(err);
            } else if (result.rows.length === 0) {
                resolve(null);
            } else {
                resolve(result.rows);
            }
        });
    });
};

const createLista = (listaData) => {
    const { id_lista, id_producto, cantidad } = listaData;
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO "lista" (id_lista, id_producto, cantidad) VALUES ($1, $2, $3)',
            [id_lista, id_producto, cantidad],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_lista, id_producto, cantidad });
                }
            }
        );
    });
};

const updateLista = (id_lista, id_producto, listaData) => {
    const { cantidad } = listaData;
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE "lista" SET cantidad = $1 WHERE id_lista = $2 AND id_producto = $3',
            [cantidad, id_lista, id_producto],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_lista, id_producto, cantidad });
                }
            }
        );
    });
};

const deleteLista = (id_lista, id_producto) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM "lista" WHERE id_lista = $1 AND id_producto = $2', [id_lista, id_producto], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllListas,
    getListaById,
    createLista,
    updateLista,
    deleteLista
};
