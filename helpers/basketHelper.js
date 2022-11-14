
const {Product}= require('../models/models')
const {Basket}= require('../models/models')
const {BasketProduct}= require('../models/models')
const  ApiError=require('../error/ApiErrors')




const pretty = (basket) => {
    const data = {}
    data.id = basket.id
    data.products = []
    if (basket.products) {
        data.products = basket.products.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.basket_product.quantity
            }
        })
    }
    return data
}


class BasketHelper {

    async getOne(basketId) {

        let basket = await Basket.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: Product, attributes: ['id', 'name', 'price','rating','img']},
            ],
        })

        console.log('hor')
        console.log(basket)
        if (!basket) {
            basket = await Basket.create()
        }
        return pretty(basket)
    }

    async create() {
        const basket = await Basket.create()
        return pretty(basket)
    }

    async append(basketId, productId, quantity) {
        let basket = await Basket.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: Product, attributes: ['id', 'name', 'price']},
            ]
        })
        if (!basket) {
            basket = await Basket.create()
        }
// проверяем, есть ли уже этот товар в корзине
        const basket_product = await BasketProduct.findOne({
            where: {basketId, productId}
        })
        if (basket_product) { // есть в корзине
            await basket_product.increment('quantity', {by: quantity})
        } else { // нет в корзине
            await BasketProduct.create({basketId, productId, quantity})
        }

        await basket.reload()
        return pretty(basket)
    }

async increment(basketId, productId, quantity) {
    let basket = await Basket.findByPk(basketId, {
        include: [{model: Product, as: 'products'}]
    })
    if (!basket) {
        basket = await Basket.create()
    }
    // проверяем, есть ли этот товар в корзине
    const basket_product = await BasketProduct.findOne({
        where: {basketId, productId}
    })
    if (basket_product) {
        await basket_product.increment('quantity', {by: quantity})
        // обновим объект корзины, чтобы вернуть свежие данные
        await basket.reload()
    }
    return pretty(basket)
}

async decrement(basketId, productId, quantity) {
    let basket = await BasketMapping.findByPk(basketId, {
        include: [{model: ProductMapping, as: 'products'}]
    })
    if (!basket) {
        basket = await Basket.create()
    }
    // проверяем, есть ли этот товар в корзине
    const basket_product = await BasketProductMapping.findOne({
        where: {basketId, productId}
    })
    if (basket_product) {
        if (basket_product.quantity > quantity) {
            await basket_product.decrement('quantity', {by: quantity})
        } else {
            await basket_product.destroy()
        }
        // обновим объект корзины, чтобы вернуть свежие данные
        await basket.reload()
    }
    return pretty(basket)
}

async remove(basketId, productId) {
    let basket = await Basket.findByPk(basketId, {
        include: [{model: Product, as: 'products'}]
    })
    if (!basket) {
        basket = await Basket.create()
    }
    // проверяем, есть ли этот товар в корзине
    const basket_product = await BasketProduct.findOne({
        where: {basketId, productId}
    })
    if (basket_product) {
        await basket_product.destroy()
        // обновим объект корзины, чтобы вернуть свежие данные
        await basket.reload()
    }
    return pretty(basket)
}

async clear(basketId) {
    let basket = await Basket.findByPk(basketId, {
        include: [{model: Product, as: 'products'}]
    })
    if (basket) {
        await BasketProduct.destroy({where: {basketId}})
        // обновим объект корзины, чтобы вернуть свежие данные
        await basket.reload()
    } else {
        basket = await Basket.create()
    }
    return pretty(basket)
}

async delete(basketId) {
    const basket = await Basket.findByPk(basketId, {
        include: [{model: Product, as: 'products'}]
    })
    if (!basket) {
        throw new Error('Корзина не найдена в БД')
    }
    await basket.destroy()
    return pretty(basket)
}
}


module.exports=new BasketHelper()

