const express = require('express');
const conexion = require('../conexion');
const router = express.Router();

router.get('/', (req, res) => {
    const query = 'SELECT * FROM proveedor;'
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay registros`)
        }
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    const query = `SELECT * FROM proveedor WHERE NITProveedor=${id};`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`ID no corresponde a ningun registro`)
        }
    })
})

router.post('/agregar', (req, res) => {
    const proveedors = {
        NombreProveedor: req.body.NombreProveedor,
        NumeroTelefonoProveedor: req.body.NumeroTelefonoProveedor,
        DireccionProveedor: req.body.DireccionProveedor
    }

    const query = `INSERT INTO proveedor SET ?;`
    conexion.query(query, proveedors, (error,resultado) => {
        if (error) return console.error(error.message)

        res.json(`Se insertó correctamente el Proveedor en Plantilla`)
    })
})

router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params
    const { NombreProveedor, NumeroTelefonoProveedor, DireccionProveedor } = req.body

    const query = `UPDATE proveedor SET NombreProveedor='${NombreProveedor}', NumeroTelefonoProveedor='${NumeroTelefonoProveedor}', DireccionProveedor='${DireccionProveedor}' WHERE NITProveedor='${id}';`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)

        res.json(`Se actualizó correctamente el Proveedor en Plantilla`)
    })
})

router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM proveedor WHERE NITProveedor=${id};`
    conexion.query(query, (error,resultado) => {
        if (error) console.error(error.message)

        res.json(`Se eliminó correctamente al Proveedor en Plantilla`)
    })
})

module.exports=router;
