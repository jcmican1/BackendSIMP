const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const conexion = require('../conexion'); // Importa tu conexión a la base de datos aquí
const { tokenSign } = require('./generateToken')

router.post('/', (req, res) => {
    if (!req.body.Correo) {
        res.json("Por favor escribe tu correo")
    }
    if (!req.body.Clave) {
        res.json("Por favor escribe tu clave")
    }
    let nuevoUsuario = {
        Correo: req.body.Correo,
        Clave: req.body.Clave
    };

    console.log('====================================');
    console.log("Antes de la consulta");
    console.log('====================================');


    console.log(nuevoUsuario);
    let hash = crypto.createHash('md5');
    hash.update(nuevoUsuario.Clave);
    let hashMD5 = hash.digest('hex');
    nuevoUsuario.Clave = hashMD5
    let query = `SELECT * FROM Usuario WHERE Correo = '${nuevoUsuario.Correo}' AND Clave = '${nuevoUsuario.Clave}';`

    console.log('====================================');
    console.log("con la consulta: ", query);
    console.log('====================================');


    conexion.query(query, async (error, resultado) => {
        try {
            console.log('====================================');
            console.log("Dentro de la consulta y el try" );
            console.log('====================================');

            let estadoidusuario = resultado[0]
            let estado = estadoidusuario.Estado_idEstado
            if (resultado.length > 0) {
                console.log('====================================');
                console.log("Dentro del if de verificacion de resultado y antes de la verificacion de estado", estado );
                console.log('====================================');
                if (estado == 1) {
                    console.log('====================================');
                    console.log("Dentro del if de verificacion de estado" );
                    console.log('====================================');
                    let tokenSession = await tokenSign(resultado[0]);
                    console.log('====================================');
                    console.log("despues de la generacion del token: ", tokenSession );
                    console.log('====================================');
                    console.log("Chido", resultado);
                    res.json(tokenSession)
                } else {
                    res.json("Usuario no activo, contacta con el administrador")
                }
            } else {
            }

        } catch (error) {
            console.log("Mensaje de error----", error.message, "----Mensaje de error");
            if (error.message == "Cannot read properties of undefined (reading 'Estado_idEstado')") {
                res.json("Contraseña incorrecta")
            } else {
                res.json("No existe el usuario")
            }
            if (error) return console.error("Este es el controlador de errores del login en el backend ", error.message);
        }
    });
});

// Endpoint para actualizar un usuario existente
router.put('/RecuperarClave', (req, res) => {
    console.log('====================================');
    console.log("yes en recuperar contraseña sr");
    console.log('====================================');

    let Correo = req.body.Correo, Clave = req.body.Clave, PalabraClave = req.body.PalabraClave;

    let hash = crypto.createHash('md5');
    hash.update(Clave);
    let hashMD5 = hash.digest('hex');
    Clavecomparacion = hashMD5

    let queryVerificacion = `SELECT Usuario.Clave FROM Usuario WHERE Correo='${Correo}' and PalabraClave='${PalabraClave}';`
    console.log('====================================');
    console.log(queryVerificacion);
    console.log('====================================');
    conexion.query(queryVerificacion, (error, resultado) => {
        if (error) return console.error(error.message)
        console.log('====================================');
        console.log("si pasaste de esa cosa anterior ");
        console.log('====================================');
        if (resultado.length > 0) {
            if (resultado[0].Clave == Clavecomparacion) {

                res.json(`No puede ser la misma contraseña`);

            } else {
                let hash = crypto.createHash('md5');
                hash.update(Clave);
                let hashMD5 = hash.digest('hex');
                Clave = hashMD5

                const query = `UPDATE Usuario SET Clave='${Clave}' WHERE Correo='${Correo}' and PalabraClave='${PalabraClave}';`;

                conexion.query(query, (error) => {
                    if (error) return console.error(error.message);

                    console.log("Correcta Recuperacion de clave");
                    res.json(`Se actualizó correctamente la contraseña`);
                });
            }
        } else {
            res.json('No se encontraron registros');
        }
    })
});

module.exports = router;