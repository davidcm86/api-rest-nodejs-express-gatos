var mongoose = require('mongoose');
var Gato  = mongoose.model('Gato'); // cargamos el modelo

// GET - Devolvemos todos los gatos
exports.dameGatos = function(req, res) { // el método se llama dameGatos
    Gato.find(function(err, gatos) { // buscamos todo lo que exista en la tabla Gato, y lo guardamos en gatos
        if(err) res.status(500).send(err.message); // si hay error devolvemos un 500 y el mensaje que nos devuelve
        	console.log('GET dameGatos');
            if (!gatos.length) { // comprobamos si devuelve vacio o no
            	res.status(200).send('No tenemos gatos :(');
        	} else {
        		res.status(200).jsonp(gatos); // devolvemos correcto(200) y los datos de gatos mediante jsonp
        	}
    });
};

// GET - Devolvemos un gato en concreto
exports.dameGato = function(req, res) {
    console.log('GET dameGato');
    Gato.findById(req.params.id, function(err, gato) {
        if(err) return res.status(500).send(err.message);
        if (gato == null) {
            res.status(200).send('No se ha encontrado ningún gato con el id: ' + req.params.id);
        } else {
            res.status(200).jsonp(gato);
        }
    });
};

// POST - Insertamos un MIAU MIAU!
exports.metoGato = function(req, res) {
	// nos llegan los siguientes datos
    console.log('POST metoGato');
    console.log(req.body);
    var datosGato = new Gato({ // guardamos los datos con el modelo Gato
        nombre:   req.body.nombre,
        raza:     req.body.raza,
        edad:     req.body.edad,
        color:    req.body.color
    });

    datosGato.save(function(err, datosGato) { // salvamos
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(datosGato); // respondemos con los datos guardados
    });
};

// PUT - Modificar un gato existente
exports.modificarGato = function(req, res) {
    console.log('PUT modificarGato');
    console.log(req.body);
    console.log(req.params.id);
    Gato.findById(req.params.id, function(err, gato) {
        if (req.body.nombre && req.body.nombre.length) { // comprobamos si existe el campo y si llega vacio
            gato.nombre = req.body.nombre;
        }
        if (req.body.raza && req.body.raza.length) {
            gato.raza = req.body.raza;
        }
        if (req.body.edad && req.body.edad.length) {
            gato.edad = req.body.edad;
        }
        if (req.body.color && req.body.nombre.length) {
            gato.color = req.body.color;
        }
        gato.save(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(gato);
        });
    });
};


// DELETE - Eliminamos un gato
exports.deleteGato = function(req, res) {
    console.log('DELETE deleteGato');
    console.log(req.params.id);
    Gato.findById(req.params.id, function(err, gato) { // buscamos el gato
        if (gato == null) {
            res.status(200).jsonp('No existe un gato con el id: ' + req.params.id);
        } else {
            gato.remove(function(err) { // borramos el gato
                if(err) return res.status(500).send(err.message);
                res.status(200).jsonp('Gato borrado correctamente');
            })
        }
    });
};