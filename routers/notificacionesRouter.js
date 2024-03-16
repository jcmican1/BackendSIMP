// plantillaProductoRouter.js

const express = require('express');
const router = express.Router();
const conexion = require('../conexion'); // Importa tu conexión a la base de datos aquí

// Endpoint para manipular la tabla Notificaciones
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Notificaciones';
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros`);
        }
    });
});

// Endpoint para crear una nueva notificación
router.post('/agregar', (req, res) => {
    const nuevaNotificacion = {
        Notificacionescol: req.body.Notificacionescol
    };

    const query = 'INSERT INTO Notificaciones SET ?';
    conexion.query(query, nuevaNotificacion, (error) => {
        if (error) return console.error(error.message);

        res.json('Se insertó correctamente la nueva notificación');
    });
});

router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { Notificacionescol } = req.body;

    const query = `UPDATE Notificaciones SET Notificacionescol='${Notificacionescol}' WHERE idNotificaciones=${id};`;
    conexion.query(query, (error) => {
        if (error) return console.error(error.message);

        res.json(`Se actualizó correctamente la notificación`);
    });
});

router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Notificaciones WHERE idNotificaciones=${id};`;
    conexion.query(query, (error) => {
        if (error) console.error(error.message);

        res.json(`Se eliminó correctamente la notificación`);
    });
});

module.exports = router;