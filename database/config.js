const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect( process.env.MONGODB_CNN , {

             useNewUrlParser: true,
             useUnifiedTopology: true
            //useCreateIndex: true,
            // useFindAndModify: false

        });

        console.log('Base de datos en línea...')

    } catch (error) {

        throw new Error('Error al levantar la base de datos: ' + error);

    }

}

module.exports = {

    dbConnection
    
}