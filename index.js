const express= require("express")
const cors = require("cors");
const connection= require("./db.js");
const userRoutes = require('./rutas/user.routes');
const cotizacionRoutes = require('./rutas/cotizacion.routes');
const facturaRoutes = require('./rutas/factura.routes');
const productoRoutes = require('./rutas/producto.routes');
const listaRoutes = require('./rutas/lista.routes.js');
const reporteRoutes = require('./rutas/reporte.routes.js');
const privilegiosRoutes = require('./rutas/privilegios.routes.js');

const app=express()
app.use(cors());
app.use(express.json()); 
//RUTAS APIS USUARIO
app.use(userRoutes);
//RUTAS APIS COTIZACIONES
app.use(cotizacionRoutes);
//RUTAS APIS FACTURAS
app.use(facturaRoutes);
//RUTAS APIS PRODUCTO
app.use(productoRoutes);
//RUTAS APIS LISTA
app.use(listaRoutes);
//RUTAS APIS REPORTES
app.use(reporteRoutes);
//RUTAS APIS PRIVILEGIOS
app.use(privilegiosRoutes);

app.listen(3000,()=>{
    console.log("server has started on port 3000")
})

module.exports = connection;

