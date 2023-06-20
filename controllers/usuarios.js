const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require( '../models/usuario' );
//const { Promise } = require('mongoose');


const usuariosGet = async( req = request, res = response ) => {

    //const params = req.query.params; //cuando no desestructuro desde express
    //const params = req.params; //cuando desestructuro desde express
    //const query = req.query; //recibo los parámetros del método GET
    //const { qry, nombre, apikey } = req.query; //desestructurar, recibo todos los parámetros enviados desde el métod GET
    
    //const { qry, nombre = 'Undefined name', apikey, page = 1, limit } = req.query; // cuando no recibo algún parámetro enviado en el método GET

     const { desde, limite } = req.query;
     const query = { estado: true};

    // const usuarios = await Usuario.find( query )
    // .skip( desde )
    // .limit(Number( limite ));

    // const total = await Usuario.countDocuments( query );
        //const total = await Usuario.countDocuments();

    const [ total, totalUsuarios, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query ).skip( desde ).limit(Number( limite )).countDocuments(),
        Usuario.find( query ).skip( desde ).limit(Number( limite ))
    ])

    res.json({
        // msg: 'get API - Controlador usuariosGet',
        // qry,
        // nombre,
        // apikey,
        // page,
        // limit

        // total,
        // 'totalUsuarios': usuarios.length,
        // usuarios
        //usuarios, totalUsuarios
        total, 
        totalUsuarios, 
        usuarios
    });
}

const usuariosPost = async ( req, res = response) => {

    //const errors = validationResult( req );
    // if( !errors.isEmpty() ){
    //     return res.status(400).json(errors);
    // }

    //const body = req.body;
    const { nombre, correo, password, rol } = req.body;
    //const usuario = new Usuario( body );
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //Verificar si el correo existe
    //const existeEmail = await Usuario.findOne({ correo: correo });
    //const existeEmail = await Usuario.findOne({ correo });
    // if( existeEmail ){
    //     return res.status(400).json({
    //         msg: 'El correo ya se encuentra registrado'
    //     });
    // }

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);


    //Guardar en DB
    await usuario.save();

    res.json( {
        //msg: 'post API - Controlador usuariosPost',
        //nombre, edad
        //body
        usuario
    });
 }

const usuariosPut =  async(req, res = response) => {
    //const id = req.params.id
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra DB

    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    // res.json( {
    //     msg: 'put API - Controlador usuariosPut',
    //     //id
    //     usuario
    // });

    res.json( usuario );
}

const usuarioaPatch = (req, res = response) => {
    res.json( {
        msg: 'patch API - Controlador usuarioaPatch' 
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    //Borrado físico
    //const usuario = await Usuario.findByIdAndDelete( id );

    //Borrado lógico
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false });

    res.json( {
        //msg: 'delete API - Controlador usuariosDelete' 
        //id
        usuario
    });
  }

  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuarioaPatch,
    usuariosDelete
  }