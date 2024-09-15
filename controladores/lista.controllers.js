const listaService = require("../servicios/lista.services");

const getListas = async (req, res) => {
  try {
    const listas = await listaService.getAllListas();
    res.json(listas);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

async function nextId(req, res) {
  try {
    const nextId = await listaService.nextId();
    res.status(201).json(nextId);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const getListaById = async (req, res) => {
  const { id } = req.params;
  try {
    const lista = await listaService.getListaById(id);
    if (lista) {
      res.json(lista);
    } else {
      res.status(404).send("Lista no encontrada");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createLista = async (req, res) => {
  const listaData = req.body;
  try {
    const nuevaLista = await listaService.createLista(listaData);
    res.status(201).json(nuevaLista);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateLista = async (req, res) => {
  const { id_lista, id_producto } = req.params;
  const listaData = req.body;
  try {
    const listaActualizada = await listaService.updateLista(
      id_lista,
      id_producto,
      listaData
    );
    res.json(listaActualizada);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteLista = async (req, res) => {
  const { id_lista, id_producto } = req.params;
  try {
    await listaService.deleteLista(id_lista, id_producto);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getListas,
  getListaById,
  createLista,
  updateLista,
  deleteLista,
  nextId,
};
