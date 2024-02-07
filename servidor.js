const express = require('express');
const enrutador = require('./enrutador.js');
const app = express();

function iniciar() {
    app.use(express.static('html'));
    app.use(enrutador);

    app.listen(3000, 'localhost', () => {
        console.log("Servidor iniciado en http://localhost:3000/");
    });
}

exports.iniciar = iniciar;