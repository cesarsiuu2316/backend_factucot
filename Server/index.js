const express= require("express")
const cors = require("cors");
const mysql = require("mysql2");
const connection= require("./db.js");
const userRoutes = require('./rutas/user.routes');
const cotizacionRoutes = require('./rutas/cotizacion.routes');
const facturaRoutes = require('./rutas/factura.routes');
const productoRoutes = require('./rutas/producto.routes');

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

app.listen(3000,()=>{
    console.log("server has started on port 3000")
})

module.exports = connection;

