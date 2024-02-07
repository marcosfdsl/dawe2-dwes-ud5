const path = require('path');

function root(res, ruta) {
    res.sendFile(path.join(__dirname, 'html', ruta));
}

function salida(req, res, ruta) {
    // FALTA
}

exports.root = root;
exports.salida = salida;