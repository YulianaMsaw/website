const uuid=require('uuid')
const path=require('path')
const  {Product}=require('../models/models')
const {ProductInfo}=require('../models/models')
const  ApiError=require('../error/ApiErrors')
class ProductControllers{

    async create(req,res){

        try {
            let {name,price,brandId,typeId,info}=req.body
            const  {img}=req.files
            let fileName=uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            console.log(req.body)
            const product= await Product.create({name, price, brandId, typeId, img:fileName})

            if(info){
                info=JSON.parse(info)
                info.forEach(i=>
                    ProductInfo.create({
                        title:i.title,
                        description:i.description,
                        productId: product.id
                    })
                )
            }

           return  res.json(product)
        }catch (err){
            return res.json(ApiError.badRequest('Не удалось добавить товар'))
        }


    }

    async get(req,res){

        const {id}=req.params
        const product=await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )

        console.log(product)
        return res.json(product)
    }

    async getAll(req,res){

        let {brandId, typeId,limit, page}=req.query
        let product
        page=page || 1
        limit=limit || 9
        let offset=page * limit-limit
        if(!brandId && !typeId){

            product=await Product.findAndCountAll({limit,offset})
        }
        if(!brandId && typeId)
        {
            product=await  Product.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && !typeId)
        {
            product=await  Product.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(brandId && typeId)
        {
            product=await  Product.findAndCountAll({where: {typeId,brandId}, limit, offset})
        }
      return res.json(product)
    }




}


module.exports=new ProductControllers()