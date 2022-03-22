const express = require('express');
const app = express();
const mysqlConnection  = require('./config/sql');
const cors = require ('cors');

//Routers
const animales = require('./app/routers/animales');
const adoptante = require('./app/routers/adoptante');
const loginRegistro = require('./app/routers/login_registro');
const protectora = require('./app/routers/protectora');
const noticias=require('./app/routers/noticia');
const finalesFelices=require('./app/routers/finales_felices');

// Settings
let port = process.env.PORT||3000;

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Rutas --
app.use(animales);
app.use(adoptante);
app.use(loginRegistro);
app.use(protectora);
app.use(noticias);
app.use(finalesFelices);

app.listen(port);