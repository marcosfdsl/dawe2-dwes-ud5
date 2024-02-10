const path = require('path');
const mod_fs = require('fs');
const db = require('./db/db.js')

function root(res, ruta) {
    res.sendFile(path.join(__dirname, 'html', ruta));
}

function salida(req, res, id) {
    let salida_html = mod_fs.readFileSync(path.join(__dirname, 'html', 'salida.html'), { encoding: 'utf8' });
    res.write(salida_html);
    res.write(`<section class="contenedor">`);
    res.write(`<label for="idd">Id</label> <input type="text" name="idd" value="${db[id].id}" disabled><br>`);
    res.write(`<label for="titulo">Titulo</label> <input type="text" name="titulo" value="${db[id].titulo}" disabled><br>`);
    res.write(`<label for="fecha">Fecha:</label> <input type="datetime-local" name="fecha" value="${db[id].fecha}" disabled><br>`);
    res.write(`<label for="descripcion">Descripción:</label> <textarea name="descripcion" disabled>${db[id].descripcion}</textarea><br>`);
    res.write(`<label for="invitados">Invitados:</label> <textarea name="invitados" disabled>${db[id].invitados}</textarea><br><br>`);
    res.write(`</section>`);
    res.write(`<a href="/">VOLVER</a>`);
    res.end();
}

// GET DATA
function getdata(req, res) {
    try {
        let salida_html = mod_fs.readFileSync(path.join(__dirname, 'html', 'salida.html'), { encoding: 'utf8' });
        res.write(salida_html);

        let contador = 0;

        db.forEach((item, index) => {
            if (contador % 5 === 0) {
                if (contador !== 0) {
                    res.write(`</div>`);
                }
                res.write(`<div class="contenedorSalida">`);
            }

            res.write(`<section class="contenedor">`);
            res.write(`<label for="idd">Id</label> <input type="text" name="idd" value="${item.id}" disabled><br>`);
            res.write(`<label for="titulo">Titulo</label> <input type="text" name="titulo" value="${item.titulo}" disabled><br>`);
            res.write(`<label for="fecha">Fecha:</label> <input type="datetime-local" name="fecha" value="${item.fecha}" disabled><br>`);
            res.write(`<label for="descripcion">Descripción:</label> <textarea name="descripcion" disabled>${item.descripcion}</textarea><br>`);
            res.write(`<label for="invitados">Invitados:</label> <textarea name="invitados" disabled>${item.invitados}</textarea><br><br>`);
            res.write(`</section>`);

            contador++;

            if (contador === db.length || contador % 5 === 0) {
                res.write(`</div>`);
            }
        });
        res.write(`<a href="/">VOLVER</a>`);
        res.end();
    } catch (error) {
        res.status(500).send("Error al leer el archivo de salida" + error);
    }
}

// GET DATA ID
function getdataid(req, res) {
    if (comprobarId(Number(req.query.idd)) == -1) {
        root(res, '/404.html');
    } else {
        salida(req, res, comprobarId(Number(req.query.idd)));
    }
}

// POST DATA
function postdata(req, res) {
    const id = parseInt(db[db.length - 1].id) + 1;
    const data = { id, ...req.body };
    db.push(data);

    if (comprobarId(id) == -1) {
        salida(req, res, id);
    }
    else {
        salida(req, res, comprobarId(id));
    }
}

// PUT DATA ID
function putdataid(req, res) {
    if (comprobarId(Number(req.body.idd)) == -1) {
        root(res, '/404.html');
    } else {
        db[comprobarId(Number(req.body.idd))].id = req.body.idd;
        db[comprobarId(Number(req.body.idd))].titulo = req.body.titulo;
        db[comprobarId(Number(req.body.idd))].fecha = req.body.fecha;
        db[comprobarId(Number(req.body.idd))].descripcion = req.body.descripcion;
        db[comprobarId(Number(req.body.idd))].invitados = req.body.invitados;

        salida(req, res, comprobarId(Number(req.body.idd)));
    }
}

// DELETE DATA ID
function deletedataid(req, res) {
    if (comprobarId(Number(req.body.idd)) == -1) {
        root(res, '/404.html');
    } else {
        db.splice(comprobarId(Number(req.body.idd)), 1);
        getdata(req, res);
    }
}

// DEVUELVE LA POSICIÓN EN EL ARRAY DB QUE COINCIDE CON EL ID INTRODUCIDO
function comprobarId(idd) {
    let id = -1;
    for (let i = 0; i < db.length; i++) {
        if (db[i].id == idd) {
            id = i;
        }
    }
    return id;
}

exports.root = root;
exports.salida = salida;
exports.getdata = getdata;
exports.getdataid = getdataid;
exports.postdata = postdata;
exports.putdataid = putdataid;
exports.deletedataid = deletedataid;