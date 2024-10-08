const express = require('express');
const privilegiosController = require('../controladores/privilegios.controllers');

const router = express.Router();
router.get('/privilegios', privilegiosController.getPrivilegios);
router.get('/privilegios/:id_user', privilegiosController.getPrivilegiosByUser);
router.post('/privilegios', privilegiosController.createPrivilegios);
router.delete('/privilegios/:id_Privilegios/:id_user', privilegiosController.deletePrivilegios);
router.delete('/privilegios/:id_user', privilegiosController.deletePrivilegiosUser);

module.exports = router;