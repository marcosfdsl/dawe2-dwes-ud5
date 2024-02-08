const path = require('path');
const mod_fs = require('fs');
const db = require('./db/db.js')

function root(res, ruta) {
    res.sendFile(path.join(__dirname, 'html', ruta));
}

function salida(req, res, id) {
    for (let i = 0; i < db.length; i++) {
        if (db[i].id == id) {
            id = i;
        }
    }

    let salida_html = false;
    try {
        salida_html = mod_fs.readFileSync('./html/salida.html', { encoding: 'utf8', flag: 'r' });
        salida_html = salida_html.replace(`%idd%`, db[id].id);
        salida_html = salida_html.replace("%titulo%", db[id].titulo);
        salida_html = salida_html.replace("%fecha%", db[id].fecha);
        salida_html = salida_html.replace("%descripcion%", db[id].descripcion);
        salida_html = salida_html.replace("%invitados%", db[id].invitados);
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
    if (!req.body.idd) {
        root(res, '/404.html');
    } else {
        let compr = false;

        for (let i = 0; i < db.length; i++) {
            if (db[i].id == Number(req.body.idd)) {
                compr = true;
            }
        }
    
        if (compr == false) {
            root(res, '/404.html');
        } else {
            salida(req, res, Number(req.body.idd));
        }
    }
}

// POST DATA
function postdata(req, res) {
    if (!req.body.titulo || !req.body.descripcion) {
        root(res, '/404.html');
    } else {
        const id = db.length + 1;
        const data = { id, ...req.body };
        db.push(data);

        salida(req, res, id);
    }
}

// PUT DATA ID
function putdataid(req, res) {
    if (!req.body.idd || !req.body.titulo || !req.body.descripcion) {
        root(res, '/404.html');
    } else {
        let compr = -1;

        for (let i = 0; i < db.length; i++) {
            if (db[i].id == Number(req.body.idd)) {
                compr = i;
            }
        }

        if (compr == -1) {
            root(res, '/404.html');
        } else {
            db[compr].id = req.body.idd;
            db[compr].titulo = req.body.titulo;
            db[compr].fecha = req.body.fecha;
            db[compr].descripcion = req.body.descripcion;
            db[compr].invitados = req.body.invitados;

            salida(req, res, Number(req.body.idd));
        }
    }
}

// DELETE DATA ID
function deletedataid(req, res) {
    if (!req.body.idd || Number(req.body.idd) > db.length || Number(req.body.idd) < 1) {
        root(res, '/404.html');
    } else {
        db.splice(Number(req.body.idd) - 1, 1);

        root(res, '/index.html');
    }
}

exports.root = root;
exports.salida = salida;
exports.getdata = getdata;
exports.getdataid = getdataid;
exports.postdata = postdata;
exports.putdataid = putdataid;
exports.deletedataid = deletedataid;