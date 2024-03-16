const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const conexion = require('../conexion'); // Importa tu conexión a la base de datos aquí
const { tokenSign } = require('./generateToken')

// Endpoint para manipular la tabla Usuario
router.get('/', (req, res) => {
    console.log("Consulta de todos los usuarios");
    const query = 'SELECT Usuario.idUsuario, Usuario.NombreUsuario, Usuario.Apellido, Usuario.Correo, Usuario.Clave, Usuario.PalabraClave, Rol.DescripcionRol, Estado.DescripcionEstado FROM Usuario INNER JOIN Rol ON Usuario.Rol_IdRol = Rol.IdRol INNER JOIN Estado ON Usuario.Estado_idEstado = Estado.idEstado';
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros`);
        }
    });
});

router.get('/:id', (req, res) => {

    const { id } = req.params
    const query = `SELECT Usuario.idUsuario, Usuario.NombreUsuario, Usuario.Apellido, Usuario.Correo, Usuario.Clave, Usuario.PalabraClave, Rol.DescripcionRol, Estado.DescripcionEstado FROM Usuario INNER JOIN Rol ON Usuario.Rol_IdRol = Rol.IdRol INNER JOIN Estado ON Usuario.Estado_idEstado = Estado.idEstado WHERE idUsuario=${id};`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay registros`)
        }
    })
})

router.get('/Correo/:id', (req, res) => {
    const { id } = req.params;

    // Utilizamos placeholders para la consulta y un array de valores
    const query = `
        SELECT Usuario.idUsuario, Usuario.NombreUsuario, Usuario.Apellido, Usuario.Correo, Usuario.Clave, Usuario.PalabraClave, Rol.DescripcionRol, Estado.DescripcionEstado
        FROM Usuario
        INNER JOIN Rol ON Usuario.Rol_IdRol = Rol.IdRol
        INNER JOIN Estado ON Usuario.Estado_idEstado = Estado.idEstado
        WHERE Correo = ?;
    `;

    // Verificamos el formato del correo electrónico
    const correo = `${id}`;

    conexion.query(query, [correo], (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        console.log('====================================');
        console.log(resultado);
        console.log('====================================');

        if (resultado.length > 0 || !resultado == null) {
            res.json(resultado);
        } else {
            res.json(`No hay registros`);
        }
    });
});


// Endpoint para crear un nuevo usuario
router.post('/agregar', (req, res) => {
    const nuevoUsuario = {
        NombreUsuario: req.body.NombreUsuario,
        Apellido: req.body.Apellido,
        Correo: req.body.Correo,
        Clave: req.body.Clave,
        PalabraClave: req.body.PalabraClave,
        Rol_IdRol: req.body.DescripcionRol,
        Estado_idEstado: req.body.DescripcionEstado
    };

    let hash = crypto.createHash('md5');
    hash.update(nuevoUsuario.Clave);
    let hashMD5 = hash.digest('hex');
    nuevoUsuario.Clave = hashMD5

    const query = 'INSERT INTO Usuario SET ?';
    conexion.query(query, nuevoUsuario, (error) => {
        if (error) return console.error(error.message);
        res.json('Se insertó correctamente el nuevo usuario');
    });
});


// Endpoint para actualizar un usuario existente
router.put('/actualizar/:id', (req, res) => {
    console.log("Actualizacion de usuarios siiii", req, "1111||||2222", res);
    const { id } = req.params;
    console.log(id, "Mijo este es el ID");
    let NombreUsuario = req.body.NombreUsuario, Apellido = req.body.Apellido, Correo = req.body.Correo, Clave = req.body.Clave, PalabraClave=req.body.PalabraClave, Rol_IdRol = req.body.DescripcionRol, Estado_idEstado = req.body.DescripcionEstado;

    const queryVerificacion = `SELECT Usuario.idUsuario, Usuario.NombreUsuario, Usuario.Apellido, Usuario.Correo, Usuario.Clave , Usuario.PalabraClave, Rol.DescripcionRol, Estado.DescripcionEstado FROM Usuario INNER JOIN Rol ON Usuario.Rol_IdRol = Rol.IdRol INNER JOIN Estado ON Usuario.Estado_idEstado = Estado.idEstado WHERE idUsuario=${id};`
    conexion.query(queryVerificacion, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            console.log(resultado[0].Clave);

            if (resultado[0].Clave == Clave) {

                const query = `UPDATE Usuario SET NombreUsuario='${NombreUsuario}', Apellido='${Apellido}', Correo='${Correo}', PalabraClave='${PalabraClave}', Rol_IdRol=${Rol_IdRol}, Estado_idEstado=${Estado_idEstado} WHERE idUsuario=${id};`;

                console.log('==================querySinClave==================');
                console.log(query);
                console.log('===================querySinClave=================');

                conexion.query(query, (error) => {
                    if (error) return console.error(error.message);
                    console.log("Actualizado");
                    res.json(`Se actualizó correctamente el usuario`);
                });

            } else {
                let hash = crypto.createHash('md5');
                hash.update(Clave);
                let hashMD5 = hash.digest('hex');
                Clave = hashMD5

                const query = `UPDATE Usuario SET NombreUsuario='${NombreUsuario}', Apellido='${Apellido}', Correo='${Correo}', Clave='${Clave}',PalabraClave='${PalabraClave}', Rol_IdRol=${Rol_IdRol}, Estado_idEstado=${Estado_idEstado} WHERE idUsuario=${id};`;

                console.log('==================query==================');
                console.log(query);
                console.log('===================query=================');

                conexion.query(query, (error) => {
                    if (error) return console.error(error.message);
                    console.log("Correcta actualizacion");
                    res.json(`Se actualizó correctamente el usuario`);
                });
            }
        } else {
            console.log('No se encontraron registros');
        }
    })
});

// Endpoint para eliminar un usuario
router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Usuario WHERE idUsuario=${id};`;
    conexion.query(query, (error) => {
        if (error) console.error(error.message);

        res.json(`Se eliminó correctamente el usuario`);
    });
});

module.exports = router;
