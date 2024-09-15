const express = require("express");
const listaController = require("../controladores/lista.controllers");

const router = express.Router();
router.get("/listas", listaController.getListas);
router.get("/listas/:id", listaController.getListaById);
router.get("/listaId", listaController.nextId);
router.post("/listas", listaController.createLista);
router.put("/listas/:id_lista/:id_producto", listaController.updateLista);
router.delete("/listas/:id_lista/:id_producto", listaController.deleteLista);

module.exports = router;
