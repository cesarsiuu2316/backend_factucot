const db = require('../db');

const getTopStarUsers = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT u.id_user, u.nombre, COUNT(f.id_user) AS num_facturas
            FROM "user" u
            JOIN "factura" f ON u.id_user = f.id_user
            GROUP BY u.id_user, u.nombre
            ORDER BY num_facturas DESC`,
            (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.rows.length === 0) {
                    resolve(null);
                } else {
                    resolve(result.rows[0]);
                }
            }
        );
    });
};

const getTotalVentas = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT SUM(total) AS total_sum
            FROM "factura"`,
            (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.rows.length === 0) {
                    resolve(null);
                } else {
                    resolve(result.rows[0].total_sum);
                }
            }
        );
    });
};

module.exports = {
    getTopStarUsers,
    getTotalVentas
};