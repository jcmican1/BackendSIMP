// plantillaProductoRouter.js

const express = require('express');
const router = express.Router();
const conexion = require('../conexion'); // Importa tu conexión a la base de datos aquí

// Endpoint para manipular la tabla Usuario_has_Notificaciones
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Usuario_has_Notificaciones';
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json([]);
        }
    });
});

router.post('/agregar', (req, res) => {
    const nuevaRelacion = {
        Usuario_idUsuario: req.body.Usuario_idUsuario,
        Notificaciones_idNotificaciones: req.body.Notificaciones_idNotificaciones
    };

    const query = 'INSERT INTO Usuario_has_Notificaciones SET ?';
    conexion.query(query, nuevaRelacion, (error) => {
        if (error) return console.error(error.message);

        res.json('Se insertó correctamente la nueva relación entre usuario y notificaciones');
    });
});

router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { Usuario_idUsuario, Notificaciones_idNotificaciones } = req.body;

    const query = `UPDATE Usuario_has_Notificaciones SET Usuario_idUsuario=${Usuario_idUsuario}, Notificaciones_idNotificaciones=${Notificaciones_idNotificaciones} WHERE idRelacion=${id};`;
    conexion.query(query, (error) => {
        if (error) return console.error(error.message);

        res.json(`Se actualizó correctamente la relación entre usuario y notificaciones`);
    });
});

router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Usuario_has_Notificaciones WHERE idRelacion=${id};`;
    conexion.query(query, (error) => {
        if (error) console.error(error.message);

        res.json(`Se eliminó correctamente la relación entre usuario y notificaciones`);
    });
});


module.exports = router;
