const express = require('express');
const router = express.Router();
const conexion = require('../conexion');

// Endpoint para manipular la tabla Rol
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Rol';
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

    const { id } = req.params;
    const query = `SELECT * FROM Rol WHERE IdRol = ${id};`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros`);
        }
    });
});

// Endpoint para crear un nuevo rol
router.post('/agregar', (req, res) => {
    const nuevoRol = {
        DescripcionRol: req.body.DescripcionRol
    };

    const query = 'INSERT INTO Rol SET ?';
    conexion.query(query, nuevoRol, (error) => {
        if (error) return console.error(error.message);
        res.json('Se insertó correctamente el nuevo rol');
    });
});

router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { DescripcionRol } = req.body;
    const query = `UPDATE Rol SET DescripcionRol = '${DescripcionRol}' WHERE IdRol=${id};`;

    conexion.query(query, (error) => {
        if (error) return console.error(error.message);

        res.json(`Se actualizó correctamente el rol`);
    });
});

router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Rol WHERE IdRol=${id};`;
    conexion.query(query, (error) => {
        if (error) console.error(error.message);

        res.json(`Se eliminó correctamente el rol`);
    });
});

module.exports = router;
