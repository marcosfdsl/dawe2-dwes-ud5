const express = require('express');
const router = express.Router();
const manejador = require('./manejador.js');

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

// POST SALIDA
router.post('/salida', (req, res) => {
    manejador.salida(req, res);
});

// GET DATA
router.get('/api/v1/data', (req, res) => {
    manejador.getdata(req, res);
});

// GET DATA ID
router.get('/api/v1/data/:id', (req, res) => {
    manejador.getdataid(req, res);
})

// POST DATA
router.post('/api/v1/data', (req, res) => {
    manejador.postdata(req, res);
});

// PUT DATA ID
router.put("/api/v1/data/:id", (req, res) => {
    manejador.putdataid(req, res);
});

// DELETE DATA ID
router.delete('/api/v1/data/:id', (req, res) => {
    manejador.deletedataid(req, res);
})

// GET 404
router.get('*', (req, res) => {
    manejador.root(res, '/404.html');
});

module.exports = router;