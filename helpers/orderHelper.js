//import { Order as OrderMapping } from './mapping.js'
const {Order,OrderItem}=require('../models/models')
const ApiError = require('../error/ApiErrors')

class OrderHelper {
    async getAll(userId = null) {
        let orders
        if (userId) {
            orders = await Order.findAll({where: {userId}})
        } else {
            orders = await Order.findAll()
        }
        return orders
    }

    async getOne(id, userId = null) {
        let order
        if (userId) {
            order = await order.findOne({
                where: {id, userId},
                include: [
                    {model: OrderItem, as: 'items', attributes: ['name', 'price', 'quantity']},
                ],
            })
        } else {
            order = await Order.findByPk(id, {
                include: [
                    {model: OrderItem, as: 'items', attributes: ['name', 'price', 'quantity']},
                ],
            })
        }
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        return order
    }

    async create(data) {
        // общая стоимость заказа
        const items = data.items
        const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        // данные для создания заказа
        const {name, email, phone, address, comment = null, userId = null} = data
        const order = await Order.create({
            name, email, phone, address, comment, amount, userId
        })
        // товары, входящие в заказ
        for (let item of items) {
            await OrderItem.create({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                orderId: order.id
            })
        }
        // возвращать будем заказ с составом
        const created = await Order.findByPk(order.id, {
            include: [
                {model: OrderItem, as: 'items', attributes: ['name', 'price', 'quantity']},
            ],
        })
        return created
    }

    async delete(id) {
        let order = await Order.findByPk(id, {
            include: [
                {model: OrderItem, attributes: ['name', 'price', 'quantity']},
            ],
        })
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        await order.destroy()
        return order
    }
}

module.exports=new OrderHelper()