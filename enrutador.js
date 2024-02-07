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

router.post('/salida', (req, res) => {
    manejador.salida(req, res, '/salida.html');
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
    if (!req.body.nombre || !req.body.correo) {
        res.status(400).send({
            success: 'false',
            message: 'Datos: Nombre y correo requeridos!'

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
        data.nombre = req.body.nombre ? req.body.nombre : profesores.nombre;
        data.correo = req.body.correo ? req.body.correo : profesores.correo;
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