const path = require('path');
const mod_fs = require('fs');

function root(res, ruta) {
    res.sendFile(path.join(__dirname, 'html', ruta));
}

function salida(req, res, ruta) {
    let salida_html = false;
    try {
        salida_html = mod_fs.readFileSync('./html/salida.html', {encoding: 'utf8', flag: 'r'});
        salida_html = salida_html.replace("%titulo%", req.body.titulo);
        salida_html = salida_html.replace("%fecha%", req.body.fecha);
        salida_html = salida_html.replace("%descripcion%", req.body.descripcion);
        salida_html = salida_html.replace("%invitados%", req.body.invitados);
    } catch (error) {
        res.status(500).send("Error al leer el archivo de salida" + error);
    }

    return res.send(salida_html);
}

exports.root = root;
exports.salida = salida;