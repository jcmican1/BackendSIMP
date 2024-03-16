const express = require('express');
const conexion = require('../conexion');
const router = express.Router();

router.get('/', (req, res) => {
    const query = `
        SELECT Movimiento.IdMovimiento, DATE_FORMAT(Movimiento.FechaMovimiento, '%Y-%m-%d') AS FechaMovimientoFormateada, Movimiento.CantidadProducto, Movimiento.TipoMovimiento, Motivo.DescripcionMovimiento, Producto_Materia_Prima.NombreProducto, Usuario.NombreUsuario
        FROM Movimiento
        INNER JOIN Motivo ON Movimiento.IdMotivo = Motivo.IdMotivo
        INNER JOIN Producto_Materia_Prima ON Movimiento.IdProductoMateriaPrima = Producto_Materia_Prima.IdProductoMateriaPrima
        INNER JOIN Usuario ON Movimiento.IdUsuario = Usuario.IdUsuario;
    `;

    conexion.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al realizar la consulta' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json({ mensaje: 'No hay registros de movimientos' });
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT Movimiento.IdMovimiento, Movimiento.FechaMovimiento, Movimiento.CantidadProducto, Movimiento.TipoMovimiento, Motivo.DescripcionMovimiento, Producto_Materia_Prima.NombreProducto, Usuario.NombreUsuario
        FROM Movimiento
        INNER JOIN Motivo ON Movimiento.IdMotivo = Motivo.IdMotivo
        INNER JOIN Producto_Materia_Prima ON Movimiento.IdProductoMateriaPrima = Producto_Materia_Prima.IdProductoMateriaPrima
        INNER JOIN Usuario ON Movimiento.IdUsuario = Usuario.IdUsuario
        WHERE Movimiento.IdMovimiento = ${id};
    `;

    conexion.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al realizar la consulta' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json({ mensaje: 'ID de movimiento no corresponde a ningún registro' });
        }
    });
});

router.post('/agregar', (req, res) => {
    console.log("En la ruta de Agregar Movimiento");
    const movimiento = {
        FechaMovimiento: req.body.FechaMovimiento || '',
        CantidadProducto: req.body.CantidadProducto || '',
        IdMotivo: req.body.IdMotivo || '',
        IdProductoMateriaPrima: req.body.IdProductoMateriaPrima || '',
        IdUsuario: req.body.IdUsuario || '',
        TipoMovimiento: req.body.TipoMovimiento || ''
    };

    const query = `INSERT INTO Movimiento SET ?`;

    conexion.query(query, movimiento, (error, resultado) => {
        console.log(query);
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar el movimiento' });
        }

        res.json({ mensaje: 'Se insertó correctamente el registro de movimiento' });
    });
});

router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const movimiento = req.body;

    const query = `
        UPDATE Movimiento SET
        FechaMovimiento='${movimiento.FechaMovimiento || ''}',
        CantidadProducto=${movimiento.CantidadProducto || ''},
        IdMotivo=${movimiento.IdMotivo || ''},
        IdProductoMateriaPrima=${movimiento.IdProductoMateriaPrima || ''},
        IdUsuario=${movimiento.IdUsuario || ''},
        TipoMovimiento='${movimiento.TipoMovimiento || ''}'
        WHERE IdMovimiento=${id};
    `;

    conexion.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar el movimiento' });
        }

        res.json({ mensaje: 'Se actualizó correctamente el registro de movimiento' });
    });
});

module.exports = router;
