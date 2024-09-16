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
                p.id_producto DESC;
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

const getFacturasPorFecha = (fechaInicio, fechaFin) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                f.fecha_creacion,
                f.id_factura,
                f.nombre_cliente,
                f.rtn,
                f.total
            FROM 
                factura f
            WHERE 
                (f.fecha_creacion BETWEEN $1 AND $2 OR f.id_factura IS NULL)
            GROUP BY 
                f.id_factura
            ORDER BY 
                f.id_factura DESC;
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

const getCotizacionesPorFecha = (fechaInicio, fechaFin) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                c.fecha_creacion,
                c.fecha_caducidad,
                c.id_cotizacion,
                c.total,
                c.nombre_cliente,
                CASE 
                    WHEN c.fecha_caducidad >= CURRENT_DATE THEN 'vigente'
                    ELSE 'caducada'
                END AS estado
            FROM 
                cotizacion c
            WHERE 
                (c.fecha_creacion BETWEEN $1 AND $2 OR c.id_cotizacion IS NULL)
            GROUP BY 
                c.id_cotizacion
            ORDER BY 
                c.id_cotizacion DESC;
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
    getProductosVendidosPorFechas,
    getFacturasPorFecha,
    getCotizacionesPorFecha
};