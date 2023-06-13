const { response, request } = require('express');

const usuariosGet = ( req = request, res = response ) => {

    //const params = req.query.params; //cuando no desestructuro desde express
    //const params = req.params; //cuando desestructuro desde express
    //const query = req.query; //recibo los parámetros del método GET
    //const { qry, nombre, apikey } = req.query; //desestructurar, recibo todos los parámetros enviados desde el métod GET
    const { qry, nombre = 'Undefined name', apikey } = req.query; // cuando no recibo algún parámetro enviado en el método GET

    res.json( {
        msg: 'get API - Controlador usuariosGet',
        qry,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {

    //const body = req.body;
    const { nombre, edad } = req.body;

    res.json( {
        msg: 'post API - Controlador usuariosPost',
        //body
        nombre, edad
    });
 }

const usuariosPut =  (req, res = response) => {
    //const id = req.params.id
    const { id } = req.params;
    res.json( {
        msg: 'put API - Controlador usuariosPut',
        id
    });
}

const usuarioaPatch = (req, res = response) => {
    res.json( {
        msg: 'patch API - Controlador usuarioaPatch' 
    });
}

const usuariosDelete = (req, res = response) => {
    res.json( {
        msg: 'delete API - Controlador usuariosDelete' 
    });
  }

  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuarioaPatch,
    usuariosDelete
  }