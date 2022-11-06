const  Router=require('express')
const router=new Router()
const productControllers=require('../controllers/productControllers')
router.post('/',productControllers.create)
router.get('/',productControllers.getAll)
router.get('/:id', productControllers.get)
module.exports=router