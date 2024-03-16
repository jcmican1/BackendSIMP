const jwt = require('jsonwebtoken')

const tokenSign = async (user) => { 
    console.log(typeof user);
    console.log(user);
    return jwt.sign(
        {
            IdUsuario: user.IdUsuario, 
            Rol_IdRol: user.Rol_IdRol
        }, 
        "123456",  
        {
            expiresIn: "2h", 
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, "123456")
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => {
    return jwt.decode(token, null)
}



module.exports = { tokenSign, decodeSign, verifyToken }