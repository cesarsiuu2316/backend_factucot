const db = require('../db');

const getAllListas = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM lista', (err, results) => {
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
        db.query('SELECT * FROM lista WHERE id_lista = ? ', [id_lista], (err, results) => {
            if (err) {
                reject(err);
            } else if (results.length === 0) {
                resolve(null);
            } else {
                resolve(results);
            }
        });
    });
};

const createLista = (listaData) => {
    const { id_lista, id_producto, cantidad } = listaData;
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO lista (id_lista, id_producto, cantidad) VALUES (?, ?, ?)',
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
            'UPDATE lista SET cantidad = ? WHERE id_lista = ? AND id_producto = ?',
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
        db.query('DELETE FROM lista WHERE id_lista = ? AND id_producto = ?', [id_lista, id_producto], (err, results) => {
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
