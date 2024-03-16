const express = require('express');
const conexion = require('../conexion');
const router = express.Router();

// Obtener todas las existencias
router.get('/', (req, res) => {
    const query = `SELECT 
    Existencias.IdExistencias, 
    Producto_Materia_Prima.NombreProducto,
    Existencias.CantidadExistencias, 
    Existencias.PuntoCompraProducto, 
    DATE_FORMAT(Existencias.FechaUltimaModificacion, '%Y-%m-%d') AS FechaUltimaModificacionFormateada
FROM Existencias
INNER JOIN Producto_Materia_Prima ON Existencias.IdProductoMateriaPrima = Producto_Materia_Prima.IdProductoMateriaPrima;`;
;
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros de existencias');
        }
    });
});

// Obtener una existencia por su ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Existencias WHERE IdExistencias=${id};`;
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('ID no corresponde a ninguna existencia');
        }
    });
});

// Agregar una nueva existencia
router.post('/agregar', (req, res) => {
    const existencia = {
        CantidadExistencias: req.body.CantidadExistencias,
        CantidadConsumida: req.body.CantidadConsumida,
        PuntoCompraProducto: req.body.PuntoCompraProducto,
        PuntoMaximoProducto: req.body.PuntoMaximoProducto,
        FechaUltimaModificacion: req.body.FechaUltimaModificacion.slice(0, 10),
        IdProductoMateriaPrima: req.body.IdProductoMateriaPrima
    };

    const query = 'INSERT INTO Existencias SET ?;';
    conexion.query(query, existencia, (error, resultado) => {
        if (error) return console.error(error.message);

        res.json('Se insertó correctamente la existencia');
    });
});

// Actualizar una existencia por su ID
router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const {
        CantidadExistencias,
        CantidadConsumida,
        PuntoCompraProducto,
        PuntoMaximoProducto,
        FechaUltimaModificacion,
        IdProductoMateriaPrima
    } = req.body;

    const query = `UPDATE Existencias SET 
        CantidadExistencias=${CantidadExistencias},
        CantidadConsumida=${CantidadConsumida},
        PuntoCompraProducto=${PuntoCompraProducto},
        PuntoMaximoProducto=${PuntoMaximoProducto},
        FechaUltimaModificacion='${FechaUltimaModificacion.slice(0, 10)}',
        IdProductoMateriaPrima=${IdProductoMateriaPrima}
        WHERE IdExistencias=${id};`;

    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        res.json('Se actualizó correctamente la existencia');
    });
});

// Eliminar una existencia por su ID
router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Existencias WHERE IdExistencias=${id};`;
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        res.json('Se eliminó correctamente la existencia');
    });
});

module.exports=router;