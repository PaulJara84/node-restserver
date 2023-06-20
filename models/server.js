const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuarioaPath = '/api/usuarios'

        //Conectar a DB
        this.conectarDB();

        //Middlewers
        this.middlewares();

        //Rutas de mi app        
        this.routes();
    }

    async conectarDB() {

        await dbConnection()

    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        // Lectura y Parseo del body
        this.app.use( express.json() );

        //Directorio público
        this.app.use( express.static('public') );
    }
    
    routes() {

        this.app.use( this.usuarioaPath, require('../routes/usuarios'));
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor está escuchando en el puerto: ', this.port );
        });
    }
}

module.exports = Server;