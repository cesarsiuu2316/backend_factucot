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

async function nextId() {
  const result = await knex("lista").max("id_lista as max").first();
  const maxValue = result.max || 0;
  const nextValue = maxValue + 1;

  return new Promise((resolve, reject) => {
    resolve(nextValue);
  });
}

const getListaById = (id_lista) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM "lista" WHERE id_lista = $1 ',
      [id_lista],
      (err, result) => {
        if (err) {
          reject(err);
        } else if (result.rows.length === 0) {
          resolve(null);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

const createLista = (listaData) => {
  const { id_lista, id_producto, cantidad } = listaData;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO "lista" (id_lista, id_producto, cantidad) VALUES ($1, $2, $3) RETURNING id_lista',
      [id_lista, id_producto, cantidad],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id_lista: result.rows[0].id_lista, id_producto, cantidad });
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
    db.query(
      'DELETE FROM "lista" WHERE id_lista = $1 AND id_producto = $2',
      [id_lista, id_producto],
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
  getAllListas,
  getListaById,
  createLista,
  updateLista,
  deleteLista,
  nextId,
};
