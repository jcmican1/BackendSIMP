const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    database: 'railway',
    user: 'root',
    password: 'JrzHHaWCwOVslyfcAGDcPgRuzbeIBHXU',
    port: 45773
});

conexion.connect(error => {
    if (error) {
        console.error('Error en la conexión a la base de datos:', error.message);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = conexion;
