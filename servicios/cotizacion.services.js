const db = require("../db");
const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString:
      "postgresql://root:F9kwTt3HvqfHkaxxSK3tQMbpq6GGQRdF@dpg-cr56lkdumphs73e1au6g-a.oregon-postgres.render.com/factucot_bd",
    ssl: {
      rejectUnauthorized: false, // Set this to true if you have a valid SSL certificate
    },
  },
  searchPath: ["knex", "public"],
});

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
    db.query(
      'SELECT * FROM "cotizacion" WHERE id_cotizacion = $1',
      [id],
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

const createCotizacion = async (cotizacionData) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const mysqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const { nombre_cliente, fecha_vencimiento, total, total_neto, impuesto } =
    cotizacionData;
  const result = await knex("lista").max("id_lista as max").first();
  const maxValue = result.max || 0;
  const nextValue = maxValue + 1;

  const data = {
    fecha_creacion: mysqlDateTime,
    id_user: "2",
    id_lista: nextValue,
    fecha_caducidad: fecha_vencimiento,
    NombreCliente: nombre_cliente,
    Total: total,
    Totalneto: total_neto,
    Impuesto: impuesto,
  };

  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO "cotizacion" (id_lista, id_user, fecha_creacion, fecha_caducidad, total, total_neto, impuesto, nombre_cliente)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_cotizacion`,
      [
        data.id_lista,
        data.id_user,
        data.fecha_creacion,
        data.fecha_caducidad,
        data.Total,
        data.Totalneto,
        data.Impuesto,
        data.NombreCliente,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            id_cotizacion: result.rows[0].id_cotizacion,
            ...cotizacionData,
          });
        }
      }
    );
  });
};

const updateCotizacion = async (id, cotizacionData) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const mysqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const {
    id_lista,
    id_user,
    fecha_caducidad,
    total,
    total_neto,
    impuesto,
    nombre_cliente,
  } = cotizacionData;
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE "cotizacion" SET id_lista = $1, id_user = $2, fecha_creacion = $3, fecha_caducidad = $4, total = $5, total_neto = $6, impuesto = $7, nombre_cliente = $8
             WHERE id_cotizacion = $9`,
      [
        id_lista,
        id_user,
        mysqlDateTime,
        fecha_caducidad,
        total,
        total_neto,
        impuesto,
        nombre_cliente,
        id,
      ],
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
    db.query(
      'DELETE FROM "cotizacion" WHERE id_cotizacion = $1',
      [id],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

module.exports = {
  getAllCotizaciones,
  getCotizacionById,
  createCotizacion,
  updateCotizacion,
  deleteCotizacion,
};
