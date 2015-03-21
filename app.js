var express = require("express"), // nos permite gesticionar todo lo relacionado con hhtp, se compenetra con nodejs
	app = express(), // en app tendremos express para utilizarlo
	bodyParser = require("body-parser"), // permite gestionar las peticiones que se reciben
	methodOverride = require("method-override"),
	mongoose = require('mongoose'); // permite gestionar la bbdd en mongo

// Conectamos con la BBDD
mongoose.connect('mongodb://localhost/gatos', function(err, res) {
	if(err) throw err;
	console.log('Conexion a al BBDD exitosa');
});

// Los Middlewares
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
//app.use(methodOverride()); // permite utilizar los verbos cuando el cliente no lo soporte

// Importamos modelos
var models = require('./models/gato')(app, mongoose);

// Importamos controladores
var GatosCtrl = require('./controllers/gatos');

// Ruta de Inicio
var router = express.Router();
router.get('/', function(req, res) {
	res.send("Bienvenidos a la Api Rest de Gatos");
});
app.use(router);

// Rutas de la API
var gatos = express.Router();
gatos.route('/gatos')
	.get(GatosCtrl.dameGatos)
	.post(GatosCtrl.metoGato);

gatos.route('/gatos/:id')
	.get(GatosCtrl.dameGato)
	.put(GatosCtrl.modificarGato)
	.delete(GatosCtrl.deleteGato);	
app.use('/', gatos);

// Start server
app.listen(3000, function() {
	console.log("Node server running on http://localhost:3000");
});