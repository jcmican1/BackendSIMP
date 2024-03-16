const express = require('express');
const router = express.Router();
const conexion = require('../conexion');
const auth = require('../middleware/auth')
const roleAuth = require('../middleware/roleAuth')

// Consultar todos los registros de Unidad_Medida
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Unidad_Medida';
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);
        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros en la tabla Unidad_Medida');
        }
    });
});
// Consultar por ID en la tabla Unidad_Medida
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Unidad_Medida WHERE IdUnidadMedida=${id}`;
    
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message);
        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.status(404).json('El ID no corresponde a ningún registro en la tabla Unidad_Medida');
        }
    });
});

// Agregar un nuevo registro a la tabla Unidad_Medida
router.post('/agregar',roleAuth([1]), (req, res) => {
    const nuevaUnidadMedida = {
        UnidadMedida: req.body.UnidadMedida 
    };
    const query = 'INSERT INTO Unidad_Medida SET ?';
    conexion.query(query, nuevaUnidadMedida, (error) => {
        if (error) {
            console.error(error.message);
            res.status(500).json('Error al agregar la unidad de medida');
        } else {
            res.json('Se insertó correctamente la unidad de medida');
        }
    });
});

// Actualizar un registro en la tabla Unidad_Medida por su ID
router.put('/actualizar/:id',roleAuth([1]), (req, res) => {
    const { id } = req.params;
    const { UnidadMedida } = req.body;

    const query = `UPDATE Unidad_Medida SET UnidadMedida='${UnidadMedida}' WHERE IdUnidadMedida=${id}`;
    
    conexion.query(query, (error) => {
        if (error) {
            console.error(error.message);
            res.status(500).json('Error al actualizar la unidad de medida');
        } else {
            res.json('Se actualizó correctamente la unidad de medida');
        }
    });
});

// Borrar un registro en la tabla Unidad_Medida por su ID
router.delete('/borrar/:id',roleAuth([1]), (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM Unidad_Medida WHERE IdUnidadMedida=${id}`;
    
    conexion.query(query, (error) => {
        if (error) {
            console.error(error.message);
            res.status(500).json('Error al eliminar la unidad de medida');
        } else {
            res.json('Se eliminó correctamente la unidad de medida');
        }
    });
});
module.exports = router;