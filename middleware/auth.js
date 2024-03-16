const { verifyToken } = require('../routers/generateToken')

const auth = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            res.status(401);
            return res.send({ error: 'Falta el encabezado de autorización' });
        }

        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log("Toketon", tokenData);
        if (tokenData.IdUsuario) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Tu no tienes acceso a esta ruta' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'No es posible el acceso a esta ruta' })
    }

}

module.exports = auth