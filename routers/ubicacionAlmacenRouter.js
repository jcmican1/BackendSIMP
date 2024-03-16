const express = require('express');
const conexion = require('../conexion');
const router = express.Router();

// Obtener todas las ubicaciones de almacén
router.get('/', (req, res) => {
    const query = 'SELECT * FROM UbicacionAlmacen;';
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros');
        }
    });
});

// Obtener una ubicación de almacén por su ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM UbicacionAlmacen WHERE IdUbicacionAlmacen=${id};`;
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('ID no corresponde a ninguna ubicación de almacén');
        }
    });
});

// Agregar una nueva ubicación de almacén
router.post('/agregar', (req, res) => {
    const { NombreAlmacen } = req.body;
    const ubicacionAlmacen = {
        NombreAlmacen,
    };
    const query = 'INSERT INTO UbicacionAlmacen SET ?;';
    conexion.query(query, ubicacionAlmacen, (error, resultado) => {
        if (error) return console.error(error.message);

        res.json('Se insertó correctamente la ubicación de almacén');
    });
});

// Actualizar una ubicación de almacén por su ID
router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { NombreAlmacen } = req.body;
    const query = `UPDATE UbicacionAlmacen SET NombreAlmacen='${NombreAlmacen}' WHERE IdUbicacionAlmacen=${id};`;
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        res.json('Se actualizó correctamente la ubicación de almacén');
    });
});

// Eliminar una ubicación de almacén por su ID
router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM UbicacionAlmacen WHERE IdUbicacionAlmacen=${id};`;
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        res.json('Se eliminó correctamente la ubicación de almacén');
    });
});

module.exports=router;