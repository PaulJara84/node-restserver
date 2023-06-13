const { Router } = require('express');
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

router.post('/', usuariosPost);

router.put('/:id', usuariosPut); 

router.patch('/', usuarioaPatch); 

router.delete('/', usuariosDelete); 

module.exports = router;