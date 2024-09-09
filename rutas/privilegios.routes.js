const express = require('express');
const privilegiosController = require('../controladores/privilegios.controllers');

const router = express.Router();
router.get('/privilegios', privilegiosController.getPrivilegios);
router.get('/privilegios/:id', privilegiosController.getPrivilegiosByUser);
router.post('/privilegios', privilegiosController.createPrivilegios);
router.delete('/privilegios/:id_privilegios/:id_producto', privilegiosController.deletePrivilegios);

module.exports = router;