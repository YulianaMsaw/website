const  Router=require('express')
const router=new Router()
const userControllers=require('../controllers/userControllers')
const {check}=require('express-validator')
const authMiddelware=require('../middleware/authMiddelware')

router.post('/registration',
    [check('email', 'укажите валидные значения почты').isEmail().notEmpty(),
        check('password', 'Пароль должен быть длинне 4 символов').isLength({min:4})],
    userControllers.registration)
router.post('/login', userControllers.login)
router.get('/auth',authMiddelware, userControllers.check)

module.exports=router
