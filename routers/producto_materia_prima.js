const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

// Consultar todos los registros de Producto Materia Prima
router.get('/', (req, res) => {
    const query = `SELECT IdProductoMateriaPrima, NombreProducto, DescripcionProductoMateriaPrima,DescripcionCategoria,UnidadMedida 
    FROM Producto_Materia_Prima as table1 INNER JOIN categoria ON table1.IdCategoria = categoria.IdCategoria INNER JOIN unidad_medida 
    ON table1.IdUnidadMedida = unidad_medida.IDUnidadMedida`;
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros en la tabla Producto_Materia_Prima');
        }
    });
});

// Consultar por ID en la tabla Producto Materia Prima
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT IdProductoMateriaPrima, NombreProducto, DescripcionProductoMateriaPrima,DescripcionCategoria,UnidadMedida FROM Producto_Materia_Prima as table1
    INNER JOIN categoria ON table1.IdCategoria = categoria.IdCategoria INNER JOIN unidad_medida ON table1.IdUnidadMedida = unidad_medida.IDUnidadMedida WHERE IdProductoMateriaPrima=${id}`;
    
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(404).json('El ID no corresponde a ningún registro en la tabla Producto_Materia_Prima');
        }
    });
});

// Agregar un nuevo registro a la tabla Producto Materia Prima
router.post('/agregar', (req, res) => {
    const nuevoProducto = {
        NombreProducto: req.body.NombreProducto,
        DescripcionProductoMateriaPrima: req.body.DescripcionProductoMateriaPrima,
        IdCategoria: req.body.IdCategoria,
        IdUnidadMedida: req.body.IdUnidadMedida
    };

    const query = 'INSERT INTO Producto_Materia_Prima SET ?';
    conexion.query(query, nuevoProducto, (error) => {
        if (error) {
            console.error(error.message);
            res.status(500).json('Error al agregar el producto de materia prima');
        } else {
            res.json('Se insertó correctamente el producto de materia prima');
        }
    });
});

// Actualizar un registro en la tabla Producto Materia Prima por su ID
router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { NombreProducto, DescripcionProductoMateriaPrima, IdCategoria, IdUnidadMedida } = req.body;

    const query = `UPDATE Producto_Materia_Prima SET 
                   NombreProducto='${NombreProducto}', 
                   DescripcionProductoMateriaPrima='${DescripcionProductoMateriaPrima}', 
                   IdCategoria=${IdCategoria}, 
                   IdUnidadMedida=${IdUnidadMedida} 
                   WHERE IdProductoMateriaPrima=${id}`;
    
    conexion.query(query, (error) => {
        if (error) {
            console.error(error.message);
            res.status(500).json('Error al actualizar el producto de materia prima');
        } else {
            res.json('Se actualizó correctamente el producto de materia prima');
        }
    });
});

// Borrar un registro en la tabla Producto Materia Prima por su ID
router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Producto_Materia_Prima WHERE IdProductoMateriaPrima=${id}`;
    
    conexion.query(query, (error) => {
        if (error) {
            console.error(error.message);
            res.status(500).json('Error al eliminar el producto de materia prima');
        } else {
            res.json('Se eliminó correctamente el producto de materia prima');
        }
    });
});


module.exports = router;