const express = require('express');
const router = express.Router();
const manejador = require('./manejador.js');
const db = require('./db/db.js')

// GET INDEX
router.get('/', (req, res) => {
    manejador.root(res, '/index.html');
});
router.get('/index', (req, res) => {
    manejador.root(res, '/index.html');
});

// GET SALIDA
router.get('/salida', (req, res) => {
    manejador.root(res, '/salida.html');
});

router.get('/datosss', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'Datos recuperados con éxito!',
        data: db
    });
});

// POST SALIDA
router.post('/salida', (req, res) => {
    manejador.salida(req, res);
});

// GET DATA
router.post('/getdata', (req, res) => {
    manejador.getdata(req, res);
});

// GET DATA ID
router.post('/getdataid', (req, res) => {
    manejador.getdataid(req, res);
})

// POST DATA
router.post('/postdata', (req, res) => {
    manejador.postdata(req, res);
});

// PUT DATA ID
router.post('/putdataid', (req, res) => {
    manejador.putdataid(req, res);
});

// DELETE DATA ID
router.post('/deletedataid', (req, res) => {
    manejador.deletedataid(req, res);
});

// GET 404
router.get('*', (req, res) => {
    manejador.root(res, '/404.html');
});

module.exports = router;