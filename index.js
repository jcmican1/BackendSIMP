const express = require('express')
const bodyParser = require('body-parser')
const conexion = require('./conexion');
const app = express()
const auth = require('./middleware/auth')
const roleAuth = require('./middleware/roleAuth')
const cors = require('cors')

// const listaBlanca = ['https://main--simpsena.netlify.app/','http://localhost:4200', 'http://10.0.2.2:3000', 'http://localhost:3000','https://main--simpsena.netlify.app'];

// app.use(cors({
//      origin: listaBlanca
//  }))

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.use(bodyParser.json())

const PUERTO = 3000

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO} bien`);
})


// Importa los enrutadores

const estadosRouter = require('./routers/estadosRouter');
const rolesRouter = require('./routers/rolesRouter');
const usuariosRouter = require('./routers/usuariosRouter');
const notificacionesRouter = require('./routers/notificacionesRouter');
const usuarioNotificacionesRouter = require('./routers/usuarioNotificacionesRouter');
const login = require('./routers/login');

const unidad_medidaRouter = require('./routers/unidad_medidaRouter');
const plantilla_producto_has_producto_materia_prima = require('./routers/plantilla_producto_has_producto_materia_prima');
const plantilla_producto = require("./routers/plantilla_producto")
const categoriaRouter = require('./routers/categoriaRouter');
const producto_materia_prima = require('./routers/producto_materia_prima');
const Reportes = require('./routers/reportesRouter');

const proveedorRouter = require('./routers/proveedorRouter');
const ubicacionAlmacenRouter = require('./routers/ubicacionAlmacenRouter');
const existenciasRouter = require('./routers/existenciasRouter');
const movimientoRouter = require('./routers/movimientoRouter');
const motivoRouter = require('./routers/motivoRouter');

// Usa los enrutadores
app.use('/estados', auth, roleAuth([1]), estadosRouter);
app.use('/roles', auth, roleAuth([1]), rolesRouter);
app.use('/usuarios', auth, roleAuth([1]), usuariosRouter);
app.use('/notificaciones', auth, notificacionesRouter);
app.use('/usuario-notificaciones', auth, usuarioNotificacionesRouter);
app.use('/login', login);

app.use('/unidad-medida', auth, unidad_medidaRouter);
app.use('/producto-materia', auth, plantilla_producto_has_producto_materia_prima);
app.use('/plantilla-producto', auth, plantilla_producto);
app.use('/categoria', auth, categoriaRouter);
app.use('/materia-prima', auth, producto_materia_prima);
app.use('/reportes', auth, Reportes);

app.use('/proveedor', auth, proveedorRouter);
app.use('/ubicacion-almacen/', auth, ubicacionAlmacenRouter);
app.use('/existencias', auth, existenciasRouter);
app.use('/movimiento', auth, movimientoRouter);
app.use('/motivo', auth, motivoRouter);

//comienzo de rutas

app.get('/', (req, res) => {
    res.send('API DE SIMP informacion de uso : /ruta normal ')
})