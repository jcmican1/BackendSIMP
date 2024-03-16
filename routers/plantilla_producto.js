const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

// Consultar todos los registros de Plantilla Producto
router.get('/', (req, res) => {
    const query = 'SELECT * FROM PlantillaProducto';
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros en la tabla PlantillaProducto');
        }
    });
});

// Consultar por ID en la tabla Plantilla Producto
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM PlantillaProducto WHERE IdPlantillaProducto=${id}`;
    
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(404).json('El ID no corresponde a ningún registro en la tabla PlantillaProducto');
        }
    });
});

// Agregar un nuevo registro a la tabla Plantilla Producto
router.post('/agregar', (req, res) => {
    const nuevaPlantilla = {
        NombreProductoPlantilla: req.body.NombreProductoPlantilla,
        ValorVenta: req.body.ValorVenta
    };

    const query = 'INSERT INTO PlantillaProducto SET ?';
    conexion.query(query, nuevaPlantilla, (error) => {
        if (error) {
            console.error(error.message);
            res.status(500).json('Error al agregar la plantilla de producto');
        } else {
            res.json('Se insertó correctamente la plantilla de producto');
        }
    });
});

// Actualizar un registro en la tabla Plantilla Producto por su ID
router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { NombreProductoPlantilla, ValorVenta } = req.body;

    const query = `UPDATE PlantillaProducto SET 
                   NombreProductoPlantilla='${NombreProductoPlantilla}', 
                   ValorVenta='${ValorVenta}' 
                   WHERE IdPlantillaProducto=${id}`;
    
    conexion.query(query, (error) => {
        if (error) {
            console.error(error.message);
            res.status(500).json('Error al actualizar la plantilla de producto');
        } else {
            res.json('Se actualizó correctamente la plantilla de producto');
        }
    });
});

// Borrar un registro en la tabla Plantilla Producto por su ID
router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM PlantillaProducto WHERE IdPlantillaProducto=${id}`;
    
    conexion.query(query, (error) => {
        if (error) {
            console.error(error.message);
            res.status(500).json('Error al eliminar la plantilla de producto');
        } else {
            res.json('Se eliminó correctamente la plantilla de producto');
        }
    });
});


module.exports = router;