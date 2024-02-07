const express = require('express');
const router = express.Router();
const manejador = require('./manejador.js');
const db = require('./db/db.js')

router.get('/', (req, res) => {
    manejador.root(res, '/index.html');
});

router.get('/index', (req, res) => {
    manejador.root(res, '/index.html');
});

router.get('/salida', (req, res) => {
    manejador.root(res, '/salida.html');
});

router.post('/salida', (req, res) => {
    manejador.salida(req, res);
});


// --------------------------------------------------

router.get('/api/v1/data', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'Datos recuperados con éxito!',
        data: db
    });
});

router.get('/api/v1/data/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = db.find(d => d.id === id);

    if (data) {
        res.status(200).send({
            success: 'true',
            message: 'Dato recuperado con éxito!',
            db: data
        })
    } else {
        res.status(404).send({
            success: 'false',
            message: 'El dato no existe!',
        })
    }
})

router.post('/api/v1/data', (req, res) => {
    if (!req.body.titulo || !req.body.descripcion) {
        res.status(400).send({
            success: 'false',
            message: 'Datos: Título y descripción requeridos!'
        });
        return;
    }

    const id = db.length + 1;
    const data = { id, ...req.body };
    db.push(data);
    res.writeHead(201, { 'Cpntent-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
});

router.put("/api/v1/data/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = db.find(d => d.id === id);
    if (data) {
        data.titulo = req.body.titulo ? req.body.titulo : data.titulo;
        data.fecha = req.body.fecha ? req.body.fecha : data.fecha;
        data.descripcion = req.body.descripcion ? req.body.descripcion : data.descripcion;
        data.invitados = req.body.invitados ? req.body.invitados : data.invitados;
        return res.status(200).send({
            success: "true",
            message: "Dato actializado con éxito!",
            db: data
        });
    } else {
        return res.status(404).send({
            success: "false",
            message: "El dato no existe!"
        });
    }
});

router.delete('/api/v1/data/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = db.find(d => d.id === id);
    if (data) {
        db.splice(db.indexOf(data), 1);
        return res.status(200).send({
            success: "true",
            message: "Dato eliminado con éxito!",
            db: data
        });
    } else {
        return res.status(404).send({
            success: "false",
            message: "El dato no existe!"
        });
    }
})

router.get('*', (req, res) => {
    manejador.root(res, '/404.html');
});

module.exports = router;