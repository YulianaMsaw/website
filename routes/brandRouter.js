const  Router=require('express')
const router=new Router()
const brandControllers=require('../controllers/brandControllers')
const checkRole=require('../middleware/checkRoleMiddelware')
router.post('/',checkRole('ADMIN'), brandControllers.create)
router.get('/', brandControllers.getAll)

module.exports=router