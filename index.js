require("dotenv").config();

//Configurações 
const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const path = require('path');
const api = require('./routes/api');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(helmet());

//Rotas 
app.use('/api', api)
//app.use('/site', site)

function startServer() 
{
    //Indicando servidor rodando 
    app.listen(process.env.PORT, () => {
        console.log(`Servidor iniciado em http://${process.env.DB_HOST}:${process.env.PORT}/`);
    });
}

startServer()