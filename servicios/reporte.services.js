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

const getProductosVendidosPorFechas = (fechaInicio, fechaFin) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                p.id_producto,
                p.nombre,
                COALESCE(SUM(l.cantidad), 0) AS total_vendidos,
                COALESCE(SUM(l.cantidad * p.precio), 0) AS total_ganado
            FROM 
                producto p
            JOIN 
                lista l ON p.id_producto = l.id_producto
            LEFT JOIN 
                factura f ON l.id_lista = f.id_lista
            WHERE 
                (f.fecha_creacion BETWEEN $1 AND $2 OR f.id_lista IS NULL)
            GROUP BY 
                p.id_producto, p.nombre
            ORDER BY 
                total_vendidos DESC;
        `;        
        db.query(query, [fechaInicio, fechaFin], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows);
            }
        });
    });
};



module.exports = {
    getTopStarUsers,
    getTotalVentas,
    getProductosVendidosPorFechas
};