
const express=require('express')
const orderControllers=require('../controllers/orderControllers')
const authMiddleware =require('../middleware/authMiddelware')
const checkRole =require('../middleware/checkRoleMiddelware')

const router = new express.Router()

/*
 * только для администратора магазина
 */

// получить список всех заказов магазина
router.get('/admin/getall', authMiddleware, checkRole('ADMIN'), orderControllers.adminGetAll)
// получить список заказов пользователя
router.get('/admin/getall/user/:id([0-9]+)', authMiddleware, checkRole('ADMIN'), orderControllers.adminGetUser)
// получить заказ по id
router.get('/admin/getone/:id([0-9]+)',authMiddleware, checkRole('ADMIN'), orderControllers.adminGetOne)


// создать новый заказ
router.post('/admin/create', authMiddleware, checkRole('ADMIN'), orderControllers.adminCreate)

// удалить заказ по id
router.delete('/admin/delete/:id([0-9]+)', authMiddleware, checkRole('ADMIN'), orderControllers.adminDelete)

/*
 * для авторизованного пользователя
 */

// получить все заказы пользователя
router.get('/user/getall', authMiddleware, orderControllers.userGetAll)

// получить один заказ пользователя
router.get('/user/getone/:id([0-9]+)', authMiddleware, orderControllers.userGetOne)

// создать новый заказ
router.post('/user/create', authMiddleware, orderControllers.userCreate)


/*
 * для неавторизованного пользователя
 */

// создать новый заказ
router.post('/guest/create', orderControllers.guestCreate)

module.exports=router