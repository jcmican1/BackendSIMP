const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'simpUv',
    user: 'root',
    password: '',
});

conexion.connect(error => {
    if (error) {
        console.error('Error en la conexión a la base de datos:', error.message);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = conexion;
