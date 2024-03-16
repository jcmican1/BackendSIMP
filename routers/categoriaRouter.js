const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

//consultar todos los registros
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Categoria';
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla Categoria`)
        }
    });
}); 

//consultar por ID
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const query = `SELECT * FROM Categoria WHERE IdCategoria=${id};`;
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('El ID no corresponde a ningun registro');
        }
    });
});

//agregar un nuevo registro
router.post('/agregar', (req, res) => {
    const nuevaCategoria = {
        DescripcionCategoria: req.body.DescripcionCategoria
    };

    const query = 'INSERT INTO Categoria SET ?';
    conexion.query(query, nuevaCategoria, (error) => {
        if (error) return console.error(error.message);

        res.json('Se inserto correctamente la categoria');
    });
});

//actualizar registros
router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const {DescripcionCategoria} = req.body;

    const query = `UPDATE Categoria SET DescripcionCategoria='${DescripcionCategoria}' WHERE IdCategoria=${id}`;
    conexion.query(query, (error) => {
        if (error) return console.error(error.message);

        res.json('Se actualizo correctamente la categoria');
    });
});

//borrar registros
router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Categoria WHERE IdCategoria=${id};`;
    conexion.query(query, (error) => {
        if (error) console.error(error.message);

        res.json('Se elimino correctamente la categoria');
    });
});

            
module.exports = router;