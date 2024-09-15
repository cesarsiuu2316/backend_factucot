const db = require("../db");

const getAllProductos = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM producto", (err, results) => {
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
    console.log("Hola, si funciona");
    db.query(
      "SELECT * FROM producto WHERE id_producto = $1",
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

const createProducto = (productoData) => {
  const { url, nombre, precio, descripcion, categoria, subcategoria, marca } =
    productoData;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO producto (url, nombre, precio, descripcion, categoria, subcategoria, marca) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_producto",
      [url, nombre, precio, descripcion, categoria, subcategoria, marca],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id_producto: result.rows[0].id_producto, ...productoData });
        }
      }
    );
  });
};

const updateProducto = (id, productoData) => {
  const { url, nombre, precio, descripcion, categoria, subcategoria, marca } =
    productoData;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE producto SET url = $1, nombre = $2, precio = $3, descripcion = $4, categoria = $5, subcategoria = $6, marca = $7 WHERE id_producto = $8",
      [url, nombre, precio, descripcion, categoria, subcategoria, marca, id],
      (err, result) => {
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
    db.query(
      "DELETE FROM producto WHERE id_producto = $1",
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rowCount);
        }
      }
    );
  });
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};
