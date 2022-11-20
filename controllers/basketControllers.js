const  {Product}=require('../models/models')

const  BasketControllersHelper=require('../helpers/basketHelper')

const ApiError=require('../error/ApiErrors')

const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true

class BasketControllers{

    async getOne(req,res,next)
    {

        try {
            let basket
            if(req.signedCookies.basketId)
            {

                basket=await BasketControllersHelper.getOne(parseInt(req.signedCookies.basketId))

            }else
            {
                basket=await BasketControllersHelper.create()

            }

            res.cookie('basketId',basket.id, {maxAge,signed})
            res.json(basket)
        }catch (err) {

            next(ApiError.badRequest(err.message))
        }


    }

    async append(req, res, next) {
        try {

            let basketId

            if(!req.signedCookies.basketId)
            {
                let created = await BasketControllersHelper.create()
                console.log('xxx')
                basketId = created.id
            }else
            {
                console.log('yyy')
                basketId = parseInt(req.signedCookies.basketId)
            }

            console.log(basketId)
            const {productId, quantity} = req.params

             const basket = await BasketControllersHelper.append(basketId, productId, quantity)
             res.cookie('basketId', basket.id, {maxAge, signed})
             res.json(basket)
        } catch(err) {

            next(ApiError.badRequest(err.message))

        }
    }

    async increment(req, res, next) {
        try {

            let basketId
            if(!req.signedCookies.basketId)
            {
                let created = await BasketControllersHelper.create()
                basketId = created.id
            }else
            {
                basketId = parseInt(req.signedCookies.basketId)
            }

            const {productId, quantity} = req.params

            const basket = await BasketControllersHelper.increment(basketId, productId, quantity)
            console.log(basket)
            res.cookie('basketId',basket.id, {maxAge,signed})
            res.json(basket)
        } catch(err) {

            next(ApiError.badRequest(err.message))

        }
    }

    async decrement(req, res, next) {
        try {

            let basketId
            if(!req.signedCookies.basketId)
            {
                let created = await BasketControllersHelper.create()
                basketId = created.id
            }else
            {
                basketId = parseInt(req.signedCookies.basketId)
            }

            const {productId, quantity} = req.params

            const basket = await BasketControllersHelper.decrement(basketId, productId, quantity)
            res.json(basket)

        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async remove(req, res, next) {
        try {
            let basketId
            if(!req.signedCookies.basketId)
            {
                let created = await BasketControllersHelper.create()
                basketId = created.id
            }else
            {
                basketId = parseInt(req.signedCookies.basketId)
            }

            const {productId} = req.params

            const basket = await BasketControllersHelper.remove(basketId, productId)
            res.json(basket)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async clear(req, res, next) {
        try {
            let basketId
            if(!req.signedCookies.basketId)
            {
                let created = await BasketControllersHelper.create()
                basketId = created.id
            }else
            {
                basketId = parseInt(req.signedCookies.basketId)
            }

            const basket = await BasketControllersHelper.clear(basketId)
            res.json(basket)
        } catch(err) {

            next(ApiError.badRequest(err.message))
        }
    }

}

module.exports=new BasketControllers()