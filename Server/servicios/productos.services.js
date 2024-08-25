const db = require('../db');

const getAllProductos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM producto', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getProductoById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM producto WHERE id_producto = ?', [id], (err, results) => {
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

const createProducto = (productoData) => {
    const { url, nombre, precio, descripcion } = productoData;
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO producto (url, nombre, precio, descripcion) VALUES (?, ?, ?, ?)',
            [url, nombre, precio, descripcion],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_producto: results.insertId, ...productoData });
                }
            }
        );
    });
};

const updateProducto = (id, productoData) => {
    const { url, nombre, precio, descripcion } = productoData;
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE producto SET url = ?, nombre = ?, precio = ?, descripcion = ? WHERE id_producto = ?',
            [url, nombre, precio, descripcion, id],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_producto: id, ...productoData });
                }
            }
        );
    });
};

const deleteProducto = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM producto WHERE id_producto = ?', [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};
