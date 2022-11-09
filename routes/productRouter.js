const  Router=require('express')
const router=new Router()
const productControllers=require('../controllers/productControllers')
const checkRole=require('../middleware/checkRoleMiddelware')
router.post('/',checkRole('ADMIN'),productControllers.create)
router.get('/',productControllers.getAll)
router.get('/:id', productControllers.get)
module.exports=router