const path = require('path');
const mod_fs = require('fs');
const db = require('./db/db.js')

function root(res, ruta) {
    res.sendFile(path.join(__dirname, 'html', ruta));
}

function salida(req, res) {
    postdata(req, res);

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

// GET DATA
function getdata(req, res) {
    res.status(200).send({
        success: 'true',
        message: 'Datos recuperados con éxito!',
        data: db
    });
}

// GET DATA ID
function getdataid(req, res) {
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
}

// POST DATA
function postdata(req, res) {
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
}

// PUT DATA ID
function putdataid(req, res) {
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
}

// DELETE DATA ID
function deletedataid(req, res) {
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
}

exports.root = root;
exports.salida = salida;
exports.getdata = getdata;
exports.getdataid = getdataid;
exports.postdata = postdata;
exports.putdataid = putdataid;
exports.deletedataid = deletedataid;