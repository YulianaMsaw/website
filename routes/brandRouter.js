const  Router=require('express')
const router=new Router()
const brandControllers=require('../controllers/brandControllers')
router.post('/', brandControllers.create)
router.get('/', brandControllers.getAll)

module.exports=router