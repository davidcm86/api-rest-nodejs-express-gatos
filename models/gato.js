var mongoose = require('mongoose'), // usamos mongo mediante mongose que entre otras cosas permite crear esquemas
    Schema   = mongoose.Schema; // creamos un esquema
// declaramos los fields que tendrá la tabla
var gatoSchema = new Schema({
  nombre:  { type: String, required: true }, //campo requerido
  raza:    { type: String, required: true },
  edad:    { type: Number, required: true },
  color:   { type: String, required: true }
});

module.exports = mongoose.model('Gato', gatoSchema); // con exports permitimos que se llame desde fuera de este archivo