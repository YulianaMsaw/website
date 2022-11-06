const  Router=require('express')
const router=new Router()
const typeController=require('../controllers/typeControllers')
const checkRole=require('../middleware/checkRoleMiddelware')
router.post('/',checkRole('ADMIN'),typeController.create)
router.get('/',typeController.getAll)

module.exports=router