const  Router=require('express')
const router=new Router()



const userRouter=require('../routes/userRouter')
const brandRouter=require('../routes/brandRouter')
const typeRouter=require('../routes/typeRouter')
const productRouter=require('../routes/productRouter')


router.use('/user',userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
module.exports=router