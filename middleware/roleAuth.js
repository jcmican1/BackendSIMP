const { verifyToken } = require('../routers/generateToken')
const express = require('express');
const conexion = require('../conexion');

const roleAuth = (roles) => async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            res.status(401);
            return res.send({ error: 'Falta el encabezado de autorización' });
        }

        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)

        const userData = `SELECT * FROM usuario WHERE idUsuario=${tokenData.IdUsuario};`
        conexion.query(userData, (error, resultado) => {
            if (error) return console.error(error.message)

            if ([].concat(roles).includes(resultado[0].Rol_IdRol)) {
                next()
            } else {
                res.status(409)
                res.send({ error: 'No tienes permisos' })
            }
        })

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }

}

module.exports = roleAuth