const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuarioaPatch,
        usuariosDelete
      } = require( '../controllers/usuarios' );

const router = Router();

//router.get('/api', /*function*/ (req, res) => {
// router.get('/', /*function*/ (req, res) => {
//     res.json( {
//         msg: 'get API' 
//     } )
//   }); 

//router.get('/', usuariosGet());
router.get('/', usuariosGet);

router.post( '/', 
[
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('password', 'El campo password debe contener más de 6 letras').isLength( { min: 6} ),
    //check('correo', 'El campo correo no es válido').isEmail(),
    check('correo', 'El campo correo no es válido').isEmail().custom( emailExiste ),
    //check('rol', 'El campo rol, no es un rol válido').isIn(['ADMIN_ROL', 'USER_ROL']),
    //check('rol').custom( ( rol ) => esRolValido( rol ) ),
    check('rol').custom( esRolValido ),
    validarCampos
], 
usuariosPost );

router.put('/:id',
    [ 
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
    ],
usuariosPut); 

router.patch('/', usuarioaPatch); 

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete); 

module.exports = router;