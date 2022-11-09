
const  Router=require('express')
const router=new Router()
const basketControllers=require('../controllers/basketControllers')
const checkRole=require('../middleware/checkRoleMiddelware')

router.get('/getone', basketControllers.getOne)
router.put('/product/:productId([0-9]+)/append/:quantity([0-9]+)', basketControllers.append)
router.put('/product/:productId([0-9]+)/increment/:quantity([0-9]+)', basketControllers.increment)
router.put('/product/:productId([0-9]+)/decrement/:quantity([0-9]+)', basketControllers.decrement)
router.put('/product/:productId([0-9]+)/remove', basketControllers.remove)
router.put('/clear', basketControllers.clear)
module.exports=router