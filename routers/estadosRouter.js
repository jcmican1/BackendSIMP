// plantillaProductoRouter.js

const express = require('express');
const router = express.Router();
const conexion = require('../conexion'); // Importa tu conexión a la base de datos aquí

router.get('/', (req, res) => {
    const query = 'SELECT * FROM Estado';
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
    const query = `SELECT * FROM Estado WHERE IdEstado=${id};`;
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros`);
        }
    });
});

// Endpoint para crear un nuevo estado
router.post('/agregar', (req, res) => {
    const nuevoEstado = {
        DescripcionEstado: req.body.DescripcionEstado
    };

    const query = 'INSERT INTO Estado SET ?';
    conexion.query(query, nuevoEstado, (error) => {
        if (error) return console.error(error.message);

        res.json('Se insertó correctamente el nuevo estado');
    });
});

router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { DescripcionEstado } = req.body;
    const query = `UPDATE Estado SET DescripcionEstado='${DescripcionEstado}' WHERE IdEstado=${id};`;

    conexion.query(query, (error) => {
        if (error) return console.error(error.message);

        res.json(`Se actualizó correctamente el estado`);
    });
});

router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Estado WHERE IdEstado=${id}`;
    
    conexion.query(query, (error) => {
        if (error) return console.error(error.message);

        res.json(`Se eliminó correctamente el estado`);
    });
});

module.exports = router;
