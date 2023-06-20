const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UsuarioSchema =  Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria'],
        unique: true
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: [true, 'El rol es obligatorio'],
        enum: ['ADMIN_ROL', 'USER_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model( 'usuarios', UsuarioSchema );