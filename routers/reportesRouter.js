const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

router.get('/masvendido', (req, res) => {
    const query = `SELECT NombreProducto, SUM(CantidadProducto) AS TotalVendido
    FROM Movimiento
    JOIN Producto_Materia_Prima ON Movimiento.IdProductoMateriaPrima = Producto_Materia_Prima.IdProductoMateriaPrima
    WHERE TipoMovimiento = 'Salida'
    GROUP BY NombreProducto
    ORDER BY TotalVendido DESC;`;
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla de reportes`)
        }
    });
});

router.get('/menosvendido', (req, res) => {
    const queryr = `SELECT NombreProducto, SUM(CantidadProducto) AS TotalVendido
    FROM Movimiento
    JOIN Producto_Materia_Prima ON Movimiento.IdProductoMateriaPrima = Producto_Materia_Prima.IdProductoMateriaPrima
    WHERE TipoMovimiento = 'Salida'
    GROUP BY NombreProducto
    ORDER BY TotalVendido ASC;`;
    conexion.query(queryr, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla de reportes`)
        }
    });
});

module.exports = router; 