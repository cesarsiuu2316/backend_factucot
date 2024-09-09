const db = require("../db");
const knex = require("knex")({
  client: "pg",
  connection:
    "postgresql://root:F9kwTt3HvqfHkaxxSK3tQMbpq6GGQRdF@dpg-cr56lkdumphs73e1au6g-a.oregon-postgres.render.com/factucot_bd",
  searchPath: ["knex", "public"],
});

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
    db.query(
      'SELECT * FROM "factura" WHERE id_factura = $1',
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

const createFactura = async (facturaData) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const mysqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const { rtn, nombre_cliente } = facturaData;
  const result = await knex("lista").max("id_lista as max").first();
  const maxValue = result.max || 0;
  const nextValue = maxValue + 1;

  const data = {
    fecha_creacion: mysqlDateTime,
    id_user: "0501",
    id_lista: nextValue,
    RTN: rtn,
    NombreCliente: nombre_cliente,
  };

  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO "factura" (fecha_creacion, id_user, id_lista, rtn, nombre_cliente)
             VALUES ($1, $2, $3, $4, $5) RETURNING id_factura`,
      [
        data.fecha_creacion,
        data.id_user,
        data.id_lista,
        data.RTN,
        data.NombreCliente,
      ],
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
  const {
    fecha_creacion,
    id_user,
    id_lista,
    total,
    total_neto,
    descuento,
    impuesto,
    rtn,
    nombre_cliente,
  } = facturaData;
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE "factura" SET fecha_creacion = $1, id_user = $2, id_lista = $3, total = $4, total_neto = $5, descuento = $6, impuesto = $7, rtn = $8, nombre_cliente = $9
             WHERE id_factura = $10`,
      [
        fecha_creacion,
        id_user,
        id_lista,
        total,
        total_neto,
        descuento,
        impuesto,
        rtn,
        nombre_cliente,
        id,
      ],
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
    db.query(
      'DELETE FROM "factura" WHERE id_factura = $1',
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
  getAllFacturas,
  getFacturaById,
  createFactura,
  updateFactura,
  deleteFactura,
};
